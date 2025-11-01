#!/bin/bash
set -a
source ../.env
set +a

 aws lambda update-function-configuration \
  --function-name products-tracker-consumer \
  --environment "Variables={NODE_ENV=${NODE_ENV},REGION=${REGION},ACCESS_KEY_ID=${ACCESS_KEY_ID},SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY},SNS_TOPIC_ARN=${SNS_TOPIC_ARN},API_SCRAPER_KEY=${API_SCRAPER_KEY}}"