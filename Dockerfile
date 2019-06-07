FROM node:10-alpine

ARG REACT_APP_API_HOST

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json

RUN REACT_APP_API_HOST=${REACT_APP_API_HOST} \
    npm run build

RUN npm install -g serve

EXPOSE 5000

CMD serve -s build
