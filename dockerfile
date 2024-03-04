FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# docker run -p 3000:3000 
# docker-compose up
