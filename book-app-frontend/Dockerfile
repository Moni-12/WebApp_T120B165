# Use the Node.js base image with a specified version
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Copy the rest of the application files to the container
COPY . .

# Build the TypeScript code with production configuration
RUN npm run build --production

# Expose the port that the application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
