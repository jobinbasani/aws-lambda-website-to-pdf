const chromium = require('chrome-aws-lambda');

exports.handler = async (event) => {
  const url = event.queryStringParameters.url;

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const buffer = await page.pdf({
    scale: 1,
    displayHeaderFooter: false,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/pdf',
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true,
  };
};
