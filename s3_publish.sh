#!/bin/bash

# Create bucket if not exist 
if !aws s3 ls "s3://dg-lambdas-bucket" 2>&1 | grep -q 'NoSuchBucket'; then
    echo "Bucket already exists, skipping creation."
else
    aws s3 mb s3://dg-lambdas-bucket --region us-east-1
fi


# Upload zip to S3
aws s3 cp ./zip/lambda-sqs-consumer.zip s3://dg-lambdas-bucket/lambda-sqs-consumer.zip

# Update Lambda and publish a new version
aws lambda update-function-code \
    --function-name lambda-sqs-consumer \
    --s3-bucket dg-lambdas-bucket \
    --s3-key lambda-sqs-consumer.zip \
    --publish


    