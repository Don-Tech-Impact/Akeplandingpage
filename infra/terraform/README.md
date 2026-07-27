# Terraform Infrastructure

This directory contains the AWS foundation for the ScholarFlow / AKEP API production stack.

## What this builds

- VPC with public and private subnets
- Internet Gateway and NAT Gateway
- Security groups for ALB and ECS tasks
- ECR repository for the backend container image
- ECS cluster, task definition, and Fargate service
- Application Load Balancer with `/health` health checks
- CloudWatch log group
- Secrets Manager secret for `SENDGRID_API_KEY`

## Recommended first deployment path

1. `terraform init`
2. `terraform plan`
3. `terraform apply`
4. Build and push the backend container image to ECR
5. Update the ECS service with the new image tag

## Local variables

You can set values through `terraform.tfvars` or `-var` arguments.

Example:

```hcl
aws_region      = "us-east-1"
project_name    = "akep-email-api"
environment     = "prod"
image_tag       = "latest"
allowed_origins = "https://akepapp.com,https://www.akepapp.com"
from_email      = "no-reply@akepapp.com"
notify_to       = "info@akepapp.com"
```

## Notes

- The ECS task expects `SENDGRID_API_KEY` to come from Secrets Manager.
- The backend container already exposes port `8787` and has a `/health` endpoint.
- The load balancer currently uses HTTP only. Add ACM + HTTPS once the basics are stable.
