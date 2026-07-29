variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "af-south-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "akep-email-api"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "prod"
}

variable "vpc_cidr" {
  description = "CIDR range for the VPC"
  type        = string
  default     = "10.20.0.0/16"
}

variable "public_subnet_azs" {
  description = "Availability zones for the public subnets"
  type        = list(string)
  default     = ["af-south-1a", "af-south-1b"]
}

variable "private_subnet_azs" {
  description = "Availability zones for the private subnets"
  type        = list(string)
  default     = ["af-south-1a", "af-south-1b"]
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDRs"
  type        = list(string)
  default     = ["10.20.0.0/24", "10.20.1.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDRs"
  type        = list(string)
  default     = ["10.20.10.0/24", "10.20.11.0/24"]
}

variable "container_port" {
  description = "Container port exposed by the API"
  type        = number
  default     = 8787
}

variable "desired_count" {
  description = "Number of running ECS tasks"
  type        = number
  default     = 2
}

variable "min_task_count" {
  description = "Minimum number of ECS tasks for autoscaling"
  type        = number
  default     = 1
}

variable "max_task_count" {
  description = "Maximum number of ECS tasks for autoscaling"
  type        = number
  default     = 4
}

variable "cpu_target_utilization" {
  description = "Target average CPU utilization percentage for ECS autoscaling"
  type        = number
  default     = 60
}

variable "memory_target_utilization" {
  description = "Target average memory utilization percentage for ECS autoscaling"
  type        = number
  default     = 70
}

variable "cpu" {
  description = "Task CPU units"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Task memory in MiB"
  type        = number
  default     = 512
}

variable "image_tag" {
  description = "Container image tag to deploy"
  type        = string
  default     = "latest"
}

variable "allowed_origins" {
  description = "Comma-separated list of allowed CORS origins"
  type        = string
  default     = "https://akepapp.com,https://www.akepapp.com,http://localhost:5173"
}

variable "sendgrid_api_key" {
  description = "SendGrid API key"
  type        = string
  sensitive   = true

  validation {
    condition     = length(trimspace(var.sendgrid_api_key)) > 0
    error_message = "sendgrid_api_key must be provided (use terraform.tfvars or TF_VAR_sendgrid_api_key)."
  }
}

variable "from_email" {
  description = "Verified sender email address"
  type        = string
  default     = "no-reply@akepapp.com"
}

variable "notify_to" {
  description = "Admin notification email address"
  type        = string
  default     = "info@akepapp.com"
}

variable "api_domain_name" {
  description = "Public API DNS name for future HTTPS listener setup (e.g. api.akepapp.com)"
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for future ALB HTTPS listener"
  type        = string
  default     = ""
}

variable "redirect_http_to_https" {
  description = "Redirect HTTP requests to HTTPS when an ACM certificate is configured"
  type        = bool
  default     = true
}


#S3 Bucket varibale 
variable "bucket_name" {
  description = <<-EOT
    Fully-qualified S3 bucket name. S3 names are globally unique across all
    AWS accounts, so this MUST be set to something free such as
    "akep-uploads-<env>-<short-random>". Do not rely on the default.
  EOT
  type        = string
}