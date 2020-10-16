FROM node:12-alpine
COPY . /testes_api_banco_central
WORKDIR /testes_api_banco_central

RUN yarn install
