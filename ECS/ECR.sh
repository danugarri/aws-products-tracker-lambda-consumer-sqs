#!/bin/bash
set -a
source ../.env
set +a


REPO_NAME="scraper"

# Check if the ECR repository exists
if aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$REGION" 2>&1 | grep -q 'RepositoryNotFoundException'; then
    echo "Repository does not exist, creating..."
    aws ecr create-repository --repository-name "$REPO_NAME" --region "$REGION"
else
    echo "Repository already exists, skipping creation."
fi

# Build, tag, and push the Docker image to ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
docker build -t scraper -f ../Dockerfile ../

docker tag scraper:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/scraper:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/scraper:latest
echo "Docker image pushed to ECR successfully."