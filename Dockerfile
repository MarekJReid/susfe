# Use an official node runtime as the parent image
FROM node:18.17.1

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable for creating the production build
ENV NODE_ENV production

# Run npm start when the container launches
CMD ["npm", "run", "dev"]
