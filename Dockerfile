FROM node:16-alpine

# This service uses port 3000 by default

ADD . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "/bin/sh", "-c", "npm run start" ]
