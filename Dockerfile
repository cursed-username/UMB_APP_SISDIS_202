FROM node:latest
ENV NODE_ENV=production

WORKDIR /MicroServicio

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "server.js" ]