FROM node:8

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install yarn -g --force
RUN yarn
RUN yarn build

EXPOSE 8000

CMD node server
