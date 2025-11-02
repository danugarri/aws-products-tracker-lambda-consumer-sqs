#!/bin/bash
set -a
source ../.env
set +a

 aws lambda update-function-configuration \
  --function-name products-tracker-consumer \
  --environment "Variables={NODE_ENV=${NODE_ENV},REGION=${REGION},SNS_TOPIC_ARN=${SNS_TOPIC_ARN},API_SCRAPER_KEY=${API_SCRAPER_KEY}}"