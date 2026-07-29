# Terraform workflow shortcuts for this stack
# Usage examples:
#   make init-staging
#   make plan
#   make apply
#   make init-prod

TF ?= terraform
TFVARS ?= terraform.tfvars
BACKEND_STAGING ?= backend.staging.s3.hcl
BACKEND_PROD ?= backend.prod.s3.hcl

.PHONY: help init-staging init-prod migrate-staging migrate-prod fmt validate plan apply destroy

help:
	@echo "Terraform shortcuts"
	@echo "  make init-staging      # Initialize backend with staging state key"
	@echo "  make init-prod         # Initialize backend with prod state key"
	@echo "  make migrate-staging   # Migrate local state to staging backend"
	@echo "  make migrate-prod      # Migrate local state to prod backend"
	@echo "  make fmt               # Format terraform files"
	@echo "  make validate          # Validate terraform configuration"
	@echo "  make plan              # Run terraform plan using $(TFVARS)"
	@echo "  make apply             # Apply with explicit vars file"
	@echo "  make destroy           # Destroy with explicit vars file"
	@echo ""
	@echo "Optional overrides:"
	@echo "  make plan TFVARS=terraform.prod.tfvars"

init-staging:
	$(TF) init -reconfigure -backend-config=$(BACKEND_STAGING)

init-prod:
	$(TF) init -reconfigure -backend-config=$(BACKEND_PROD)

migrate-staging:
	$(TF) init -migrate-state -backend-config=$(BACKEND_STAGING)

migrate-prod:
	$(TF) init -migrate-state -backend-config=$(BACKEND_PROD)

fmt:
	$(TF) fmt -recursive

validate:
	$(TF) validate

plan:
	$(TF) plan -var-file=$(TFVARS)

apply:
	$(TF) apply -var-file=$(TFVARS)

destroy:
	$(TF) destroy -var-file=$(TFVARS)
