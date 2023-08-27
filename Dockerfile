# Use the official Node.js image as base
FROM node:14

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (the port your NestJS app runs on)
EXPOSE 3000

# Start the NestJS application
CMD [ "npm", "run", "start" ]
