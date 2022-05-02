const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const path = require('path');

class WebsiteToPDFStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteToPDFFunction = new lambda.DockerImageFunction(this, 'websiteToPDFFunction', {
      functionName: 'websiteToPDFFunction',
      timeout: cdk.Duration.minutes(4),
      memorySize: 512,
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../functions')),
    });

    const websiteToPDFFunctionURL = websiteToPDFFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'websiteToPDFFunctionURL', {
      value: websiteToPDFFunctionURL.url,
      description: 'Website to PDF Function URL',
    });
  }
}

module.exports = { WebsiteToPDFStack };
