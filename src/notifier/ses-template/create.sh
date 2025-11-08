REGION="us-east-1"

aws sesv2 create-email-template \
  --region $REGION \
  --cli-input-json file://ses.template.json
