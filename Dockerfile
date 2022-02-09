FROM node:16.13.1
WORKDIR /home/gallery-using-s3
COPY ./package.json .
RUN npm install .
COPY . .
CMD npm run start