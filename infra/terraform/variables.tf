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
  default     = ""
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
