# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend/

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Clear npm cache (to avoid potential cache issues)
RUN npm cache clean --force

# Install project dependencies
RUN npm install

# Copy the rest of your application files to the container
COPY . .

# Start your application
CMD [ "node", "Server.js" ]
