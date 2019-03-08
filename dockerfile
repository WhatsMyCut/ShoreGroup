FROM alpine:latest
WORKDIR /src
COPY ./ /src/
RUN apt-get install -y nodejs
RUN npm install --production
CMD npm start:prod