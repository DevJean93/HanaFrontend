# build stage
FROM node:lts-alpine as build-stage

# Set /app as working directory
WORKDIR /app
# Copy package.json and package-lock.json files to /app
COPY package*.json /app/
# Install dependencies
RUN npm install
# Copy app source code to /app
RUN chmod +x ./run.sh
COPY . /app/
# Expose port 8000
EXPOSE 8000
# Run app.js as entrypoint
CMD ["node", "app.js"]
