# Terraform Infrastructure

This directory contains the AWS foundation for the ScholarFlow / AKEP API production stack.

## What this builds

- VPC with public and private subnets
- Internet Gateway and NAT Gateway
- Security groups for ALB and ECS tasks
- ECR repository for the backend container image
- ECS cluster, task definition, and Fargate service
- ECS Service Auto Scaling (CPU + memory target tracking)
- Application Load Balancer with `/health` health checks
- CloudWatch log group
- Secrets Manager secret for `SENDGRID_API_KEY`

## Recommended first deployment path

1. Copy `backend.s3.example.hcl` to `backend.s3.hcl`
2. Set a unique `key` in `backend.s3.hcl` (do not reuse API key)
3. Copy `terraform.tfvars.example` to `terraform.tfvars`
4. Set a real `sendgrid_api_key` value in `terraform.tfvars`
5. `terraform init -reconfigure -backend-config=backend.s3.hcl`
6. `terraform plan`
7. `terraform apply`
4. Build and push the backend container image to ECR
5. Update the ECS service with the new image tag

## Reusing existing API backend bucket

Yes, you can reuse the same S3 backend bucket used by your API Terraform.

Rules to avoid conflicts:

1. Reuse bucket: yes
2. Reuse key path: no
3. Reuse locking method (`use_lockfile = true`): yes

Example separation:

- API key: `staging/terraform.tfstate`
- Landing key: `staging/landing-page/terraform.tfstate`

If local state already exists and you need migration:

1. Configure `backend.s3.hcl`
2. Run `terraform init -migrate-state -backend-config=backend.s3.hcl`

## Ready backend configs in this repo

This folder includes deterministic backend config files using your shared state bucket:

1. `backend.staging.s3.hcl` -> `staging/landing/web/terraform.tfstate`
2. `backend.prod.s3.hcl` -> `prod/landing/web/terraform.tfstate`

Initialize with staging backend:

```bash
terraform init -reconfigure -backend-config=backend.staging.s3.hcl
```

Initialize with production backend:

```bash
terraform init -reconfigure -backend-config=backend.prod.s3.hcl
```

If you already created local state and want to migrate it to S3:

```bash
terraform init -migrate-state -backend-config=backend.staging.s3.hcl
```

## Makefile shortcuts

From this folder, you can use the provided `Makefile` for a consistent workflow.

```bash
make init-staging
make plan
make apply
```

Available targets:

1. `make init-staging`
2. `make init-prod`
3. `make migrate-staging`
4. `make migrate-prod`
5. `make fmt`
6. `make validate`
7. `make plan`
8. `make apply`
9. `make destroy`

Use a different vars file when needed:

```bash
make plan TFVARS=terraform.prod.tfvars
```

## Future backend naming policy (deterministic scheme)

Use one shared S3 state bucket across projects, but isolate every stack by key path.

Key format:

`<environment>/<system>/<stack>/terraform.tfstate`

Examples:

1. `staging/api/core/terraform.tfstate`
2. `staging/landing/web/terraform.tfstate`
3. `prod/api/core/terraform.tfstate`
4. `prod/landing/web/terraform.tfstate`

Rules:

1. Never reuse a key between two Terraform roots
2. One environment + stack = one state key
3. Keep locking and encryption enabled
4. Keep naming stable to avoid accidental state drift

## HTTPS + Cloudflare

This module supports optional ALB HTTPS.

- Set `acm_certificate_arn` to enable the HTTPS listener on `443`
- Keep `redirect_http_to_https = true` to send HTTP traffic to HTTPS automatically
- If `acm_certificate_arn` is empty, listener `80` forwards traffic directly (HTTP-only mode)

For Cloudflare:

- Point your DNS record (for example `api.akepapp.com`) to the ALB DNS output
- In Cloudflare SSL/TLS mode, use `Full (strict)` once ACM is active
- Keep origin TLS cert validation strict for production

## Avoiding Terraform conflicts with your existing stack

If you already have another Terraform project for API infrastructure, avoid conflicts by isolating state and names.

1. Use a separate state backend/key for this module (recommended)
2. Keep resource names unique via `project_name` and/or `environment`
3. Do not run `apply` from one Terraform project against another project's state
4. If both Terraform projects must share resources, import or reference them explicitly instead of recreating them

Best practice:

- One environment = one state file
- One stack responsibility per state (network, app, database can be separate)

## Local variables

You can set values through `terraform.tfvars`, `-var` arguments, or `TF_VAR_*` environment variables.

Example:

```hcl
aws_region      = "us-east-1"
project_name    = "akep-email-api"
environment     = "prod"
image_tag       = "latest"
allowed_origins = "https://akepapp.com,https://www.akepapp.com"
from_email      = "no-reply@akepapp.com"
notify_to       = "info@akepapp.com"
sendgrid_api_key = "REPLACE_WITH_REAL_SENDGRID_KEY"
desired_count     = 2
min_task_count    = 1
max_task_count    = 4
acm_certificate_arn   = "arn:aws:acm:REGION:ACCOUNT:certificate/xxxx"
redirect_http_to_https = true
```

## Notes

- The ECS task expects `SENDGRID_API_KEY` from Secrets Manager; Terraform now writes the secret value from `var.sendgrid_api_key`.
- The backend container already exposes port `8787` and has a `/health` endpoint.
- The load balancer currently uses HTTP only. Add ACM + HTTPS once the basics are stable.
