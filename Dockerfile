FROM node:8

WORKDIR /app
ADD . /app

RUN yarn
RUN yarn run build

EXPOSE 3000

CMD yarn start
