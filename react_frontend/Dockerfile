FROM node:20
RUN mkdir code
WORKDIR /code
COPY package*.json .
RUN ls
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]