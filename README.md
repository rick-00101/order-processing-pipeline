# Order Processing Pipeline - Phase 1

## Overview
This project implements a deconstructed CI/CD pipeline for an order processing system using AWS services. Phase 1 focuses on setting up the ingress infrastructure with API Gateway and SQS FIFO queue integration.

## Architecture
- **API Gateway**: Accepts HTTP POST requests at `/checkout` endpoint
- **SQS FIFO Queue**: Durably queues orders with built-in deduplication
- **Direct Integration**: API Gateway sends messages directly to SQS, bypassing compute overhead

## Project Structure
```
order-processing-pipeline/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── src/
│   └── handlers/
│       └── sqs_consumer.js     # Placeholder for Phase 2 consumer
├── template.yaml               # AWS SAM CloudFormation template
└── README.md
```

## Prerequisites
- AWS Account with appropriate IAM permissions
- GitHub repository
- AWS CLI and SAM CLI installed locally
- Node.js 20+ (for local development)

## Deployment Instructions

### Step 1: Configure GitHub Secrets
1. Navigate to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

### Step 2: Deploy via GitHub Actions
1. Commit and push your code to the `main` branch
2. Navigate to the Actions tab in your GitHub repository
3. Monitor the CI/CD pipeline execution
4. Upon successful completion, your infrastructure will be deployed to AWS

### Step 3: Test the Endpoint
Once deployed, use the CheckoutApiUrl output to test the endpoint:

```bash
curl -X POST https://<your-api-gateway-url>/checkout \
  -H "Content-Type: application/json" \
  -d '{"orderId": "123", "customerName": "John Doe", "total": 99.99}'
```

## AWS Outputs
After deployment, check the CloudFormation stack outputs for:
- **CheckoutApiUrl**: The endpoint to submit orders
- **QueueUrl**: The SQS FIFO queue URL
- **QueueArn**: The ARN of the queue for reference

## Next Steps (Phase 2)
- Implement the SQS consumer Lambda in `src/handlers/sqs_consumer.js`
- Add order processing business logic
- Integrate with payment processor or fulfillment service
- Add monitoring and error handling

## Cost Considerations
- API Gateway: Pay per request
- SQS FIFO: Pay per message (with free tier included)
- Direct integration: No compute overhead until Phase 2

## Security Notes
- Never commit AWS credentials to version control
- Use IAM roles with least-privilege permissions
- Rotate AWS access keys regularly
- Consider using AWS OIDC for GitHub Actions authentication
