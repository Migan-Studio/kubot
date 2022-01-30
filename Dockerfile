FROM node:16.13.2
RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn
RUN npx tsc

ENV SHELL=/bin/bash

CMD ["yarn", "start"]