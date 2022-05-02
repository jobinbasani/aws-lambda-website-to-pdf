FROM public.ecr.aws/lambda/nodejs:14

COPY website-to-pdf-function.js package.json package-lock.json ${LAMBDA_TASK_ROOT}

RUN npm install

CMD [ "website-to-pdf-function.handler" ]
