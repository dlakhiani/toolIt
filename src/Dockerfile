# each line is a layer and once run, docker caches it
# however, if docker detects a change in 
# any layer, all subsequent layers will be re-ran 
# *do not* rearrange -- currently caches the installation

FROM node:20-alpine
WORKDIR /app
COPY package*.json /app
RUN npm i

COPY . .