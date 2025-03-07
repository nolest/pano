FROM node:23-alpine
WORKDIR /app
WORKDIR /app/server
COPY /server/package*.json /app/server
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["node", "dist/main.js"]