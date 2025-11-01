# How to add env variables

If you push the image to ECR and run it on ECS, you can inject env vars in the task definition:

```json
"containerDefinitions": [
 {
   "name": "sqs-consumer",
   "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/sqs-consumer:latest",
   "environment": [
     { "name": "REGION", "value": "us-east-1" },
     { "name": "SNS_TOPIC_ARN", "value": "" },
     { "name": "ACCOUNT_ID", "value": "" }
   ],
   "secrets": [
     { "name": "ACCESS_KEY_ID", "valueFrom": "" },
     { "name": "SECRET_ACCESS_KEY", "valueFrom": "" },
     { "name": "API_SCRAPER_KEY", "valueFrom": "" }
   ]
 }
]
```
