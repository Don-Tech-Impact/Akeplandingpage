output "ecr_repository_url" {
  value       = aws_ecr_repository.api.repository_url
  description = "ECR repository URL for the API image"
}

output "alb_dns_name" {
  value       = aws_lb.api.dns_name
  description = "Public DNS name of the Application Load Balancer"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "ECS cluster name"
}

output "ecs_service_name" {
  value       = aws_ecs_service.api.name
  description = "ECS service name"
}

output "sendgrid_secret_name" {
  value       = aws_secretsmanager_secret.sendgrid.name
  description = "Secrets Manager secret name for SendGrid API key"
}
