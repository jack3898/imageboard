# If this monorepo was massive, I could run extra processes to create separate smaller images
# and prune unwanted files but for now, I will create one and run everything through it

FROM node:20.13.1

WORKDIR /usr/src/app

COPY . .

RUN npm i -g npm@10.7.0

RUN npm ci

WORKDIR /usr/src/app

ENV NODE_ENV production
