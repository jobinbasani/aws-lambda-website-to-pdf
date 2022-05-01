const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const nodejslambda = require('aws-cdk-lib/aws-lambda-nodejs');
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

    const screenshotLambda = new nodejslambda.NodejsFunction(this, id, {
      entry:`${path.resolve(__dirname)}/../functions/url-screenshot-function.js`,
      timeout: cdk.Duration.seconds(40),
      projectRoot: `${path.resolve(__dirname)}/../functions`,
      depsLockFilePath: `${path.resolve(__dirname)}/../functions/package-lock.json`,
    })

    const screenshotLambdaUrl = screenshotLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'ScreenshotLambdaURL', {
      value: screenshotLambdaUrl.url,
      description: 'Screenshot Lambda Function URL',
    });

  }
}

module.exports = { LambdaScreenshotStack }
