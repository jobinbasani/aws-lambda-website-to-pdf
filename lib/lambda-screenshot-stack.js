const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const path = require('path');

class LambdaScreenshotStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const screenshotFunction = new lambda.DockerImageFunction(this, 'screenshotFunction', {
      functionName: 'screenshotFunction',
      timeout: cdk.Duration.minutes(4),
      memorySize: 512,
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../functions')),
    });

    const screenshotLambdaUrl = screenshotFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'ScreenshotLambdaURL', {
      value: screenshotLambdaUrl.url,
      description: 'Screenshot Lambda Function URL',
    });

  }
}

module.exports = { LambdaScreenshotStack }
