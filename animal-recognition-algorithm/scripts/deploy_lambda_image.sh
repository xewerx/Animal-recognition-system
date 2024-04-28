#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Build docker image
docker build -t animal-recognizer-lambda-image .

# Create ecr repository if does not exist
aws ecr create-repository --repository-name animal-recognizer-lambda-image --image-scanning-configuration scanOnPush=true --region $REGION

# Tag docker image
docker tag animal-recognizer-lambda-image:latest $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/animal-recognizer-lambda-image:latest

# Login to ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Push image to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/animal-recognizer-lambda-image:latest