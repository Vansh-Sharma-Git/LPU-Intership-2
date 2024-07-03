# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies using the npm binary.
COPY package*.json ./
RUN npm install

# Copy application code.
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

