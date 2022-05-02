# Website to PDF using AWS Lambda

This is a project that converts a website to PDF using AWS Lambda. The infrastructure is defined using AWS CDK.
This uses the [Function URL](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/) feature of Lambda functions.

## Useful commands

* `cdk deploy`           deploy this stack to your default AWS account/region
* `cdk diff`             compare deployed stack with current state
* `cdk synth`            emits the synthesized CloudFormation template

## Execution

Check the CDK deployment output to find the value of `WebsiteToPDFStack.websiteToPDFFunctionURL`.
Use the `url` query parameter to provide the URL of the website to be converted to PDF.

For example: `https://zi6tmtduvolpw7go7wuydsk3de0avanr.lambda-url.ca-central-1.on.aws/?url=https://jobinbasani.com/`
