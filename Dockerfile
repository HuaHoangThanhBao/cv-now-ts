FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:alpine as main

COPY --from=build /app /

CMD ["npm", "start"]