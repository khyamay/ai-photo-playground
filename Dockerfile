# Use an official Node runtime as the base image
FROM node:18.20.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200 3333

# Command to run the application
CMD ["npm", "start", "restore-photo"]