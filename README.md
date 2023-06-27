# Project Name

Fullstack Test

# Demo
API :: [https://api-eekpk6c73q-as.a.run.app](https://api-eekpk6c73q-as.a.run.app)
WEBSITE :: [https://web-eekpk6c73q-as.a.run.app](https://web-eekpk6c73q-as.a.run.app)


## Description

This is a full-stack test project that consists of an API and a web application. The API provides various endpoints for interacting with the system, and the web application serves as the front-end interface.

## Installation

To get started with the project, follow these steps:

1. Clone the project repository:

```
git clone https://github.com/nuza555xx/fullstack-test
```
2. Navigate to the project's directory:

```
cd fullstack-test
```

3. Start the Docker containers using Docker Compose:

```
docker-compose up -d
```
# API
## Installation and Setup
To set up the API, follow these steps:

## Navigate to the API directory:

```
cd api
```
## Install the dependencies:

```
npm install
```
Set up the environment variables by creating a .env file based on the provided .env.example file.

The API will be hosted at http://localhost:3000.

## Endpoints
The API provides the following endpoints:

`GET /place`: Retrieve information about a place. Example usage:

```
curl -H "api-key: YOUR_API_KEY" http://localhost:3000/api/place
```
`POST /login-with-provider`: Perform login using a third-party provider. Example usage:

```
curl -H "api-key: YOUR_API_KEY" -X POST http://localhost:3000/api/login-with-provider
```
`GET /game24`: Get a solution to the Game 24 problem. Example usage:

```
curl -H "api-key: YOUR_API_KEY" http://localhost:3000/api/game24
```
## Definitions
1. Controllers: 
In the context of this project, controllers handle the logic and behavior of API endpoints. They receive requests, process them, and return the appropriate responses.
2. Middleware: 
Middleware functions are functions that have access to the request and response objects in the API's request-response cycle. They can perform additional operations on the request or response, modify data, or terminate the request-response cycle.
3. Routes: 
Routes define the paths and HTTP methods associated with the API endpoints. They map incoming requests to their corresponding controllers.
4. Interface: 
Interfaces in this project refer to TypeScript interfaces. They define the shape of data objects, including their properties, types, and optional/required attributes.
5. Schema (Mongoose): 
In the context of Mongoose, a schema is a way to define the structure of a MongoDB collection. It defines the fields, data types, validation rules, and more for the documents in that collection.
6. Service: 
Services encapsulate business logic and provide a way to interact with the underlying data layer (such as a database) or external services. They are responsible for handling data manipulation and implementing complex operations.

# Web
## Installation and Setup
To set up the web application, follow these steps:

## Navigate to the web directory:
```
cd www
```
## Install the dependencies:
```
npm install
```
The web application will be served at http://localhost:3000.