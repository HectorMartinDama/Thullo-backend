
FROM node:20-slim

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 4000
CMD ["npm", "run" ,"start:mooc:backend"]