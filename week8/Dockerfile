#sets the base image
FROM node:18.17.1 

#sets the base directory for our image, so that everything else is relative to this path
WORKDIR /usr/src/app
#copy any file that starts with packge and ends with json (packge.json,
#package-lock.json) into our image
COPY package*.json ./
#install the npm dependencies excluding the dev dependencies
RUN npm ci --omit=dev
#copy the folder content  and its content into the work directory
COPY . .
#expose the port variable defined in env
EXPOSE $PORT
#start the microservice using npm start command
CMD npm start