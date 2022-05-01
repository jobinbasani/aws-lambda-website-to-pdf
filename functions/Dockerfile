FROM public.ecr.aws/lambda/nodejs:14

COPY url-screenshot-function.js package.json package-lock.json ${LAMBDA_TASK_ROOT}

RUN npm install

CMD [ "url-screenshot-function.handler" ]
