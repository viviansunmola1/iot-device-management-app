# IoT Device Management App

## Overview

The IoT Device Management App is a web application designed to help users manage IoT devices and industries. It provides a user-friendly interface for viewing, creating, updating, and deleting IoT devices and industries. This README will guide you through setting up and using the application.

![Device Page](./Device%20Page.png)
![Industry Page](./Industry%20Page.png)


## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

To install the required dependencies, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/viviansunmola1/iot-device-management-app.git
```

2. Navigate to project Directory    
```
   cd iot-device-management-app
```
3. Install node packages 
```
npm install
```

4. Before running the backend of this application, make sure you have the following dependencies installed:

- [cors](https://www.npmjs.com/package/cors) - CORS middleware for Express.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a .env file.
- [express](https://www.npmjs.com/package/express) - Web framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool.

You can install these dependencies using npm:

```
npm install cors dotenv express mongoose
```

### Frontend Dependencies

Before running the frontend of this application, make sure you have the following dependencies installed:

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [ReactDOM](https://reactjs.org/docs/react-dom.html) - React package for working with the DOM.
- [Axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client for making requests to your backend API.

You can install these dependencies using npm:

```
npm install react react-dom axios
```

### Usage
#### Running application 

#### Running the Frontend

To run the frontend of the application locally, navigate to the `frontend` directory and use the following command:

```
npm start
```

#### Running the Backend

To run the frontend of the application locally, navigate to the `backend` directory and use the following command:

```
npm start
```

#### Accessing Application 
http://localhost:3000

## Features

- View a list of IoT industries.
- Create new IoT industries.
- Update existing IoT industries.
- Delete IoT industries.
- View a list of IoT devices.
- Create new IoT devices.
- Update existing IoT devices.
- Delete IoT devices.


### Docker Setup

This project can be containerized using Docker for easy deployment and distribution. Follow the steps below to set up the project with Docker:

#### Prerequisites

Before proceeding, make sure you have Docker installed on your machine. You can download and install Docker from the official website: [Docker](https://www.docker.com/get-started).

#### Building and Running the Docker Containers

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/viviansunmola1/iot-device-management-app.git
   cd iot-device-management-app
    ```
Navigate to the project directory that contains the Dockerfile(s).

2. Build the Docker image for the frontend

```
docker build -t iot-device-management-app -f frontend/Dockerfile .
```

3. Build the Docker image for the backend 
 ```
docker build -t iot-device-management-app -f backend/Dockerfile .
 ```
4. Once the images are built, you can run the Docker containers for both frontend and backend using Docker Compose:

 ```
docker-compose up
 ```
This command will start the containers, and you can access the application by opening your web browser and navigating to http://localhost:3000 for the frontend and http://localhost:5000 for the backend API.

#### Stopping the Containers
To stop the running Docker containers, you can press Ctrl + C in the terminal where they are running, or you can run the following command in a separate terminal window:
 ```
docker-compose down
 ```