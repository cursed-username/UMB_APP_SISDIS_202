FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

#RUN bin/kafka-topics.sh --create --topic shipping --bootstrap-server localhost:9092
#RUN bin/kafka-topics.sh --create --topic shipping-create --bootstrap-server localhost:9092
#RUN bin/kafka-topics.sh --create --topic shipping-calculo --bootstrap-server localhost:9092
#RUN bin/kafka-topics.sh --create --topic shipping-velocidad --bootstrap-server localhost:9092
#RUN bin/kafka-topics.sh --create --topic shipping-destino --bootstrap-server localhost:9092

COPY . .

CMD [ "npm", "start" ]

