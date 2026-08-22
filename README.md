# ✈️ FlightBeacon-JS

FlightBeacon-JS is a full-stack flight information and tracking application built with JavaScript.

The project is the web-based evolution of the original FlightBeacon project, moving from a command-line C# application to a modern web application with a React frontend, REST APIs, database-backed services, and containerised development using Docker.

> **Status:** 🚧 In Development

## Overview

FlightBeacon-JS is designed to provide a web interface for working with flight and aviation data.

The application is built using a service-oriented backend architecture, separating user management, flight data, and OpenSky Network integration into independent API services.

The frontend is built with React and Vite and communicates with these backend services through HTTP APIs.

The project is currently under active development, with the architecture and functionality expected to evolve as additional flight-related functionality is implemented.

## Features

The current project provides the foundations for:

* ✈️ Flight information management
* 🌍 OpenSky Network integration
* 👤 User management
* 🗄️ Database-backed APIs
* 🌐 React web interface
* 🔌 REST API services
* 🐳 Docker-based development and deployment
* ⚡ Vite-powered frontend development
* 🧭 Client-side routing
* 🎨 Tailwind CSS styling
* 📦 Prisma database access

## Architecture

FlightBeacon-JS uses a separated frontend/backend architecture:

```text
                           ┌─────────────────────┐
                           │     React Frontend  │
                           │      flight-ui      │
                           └──────────┬──────────┘
                                      │
                       ┌──────────────┼──────────────┐
                       │              │              │
                       ▼              ▼              ▼
                ┌────────────┐ ┌────────────┐ ┌────────────┐
                │  User API  │ │ Flights API│ │ OpenSky API│
                └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
                      │              │              │
                      ▼              ▼              ▼
                 ┌─────────┐   ┌───────────┐   OpenSky
                 │  MySQL  │   │ PostgreSQL│   Network
                 └─────────┘   └───────────┘
```

The repository currently contains three backend services and a React frontend.

## Technology Stack

### Frontend

* **React 19**
* **Vite 7**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **ESLint**

The frontend is configured as a Vite React application and currently provides development, build, lint, and preview scripts.

### Backend

The backend is split into three Node.js services:

* **Express 5**
* **Prisma 6**
* **CORS**
* **dotenv**

The `user-api` and `flights-api` services each use Express and Prisma, with their own database configuration.

### Databases

The current Docker configuration provides:

* **MySQL** for the User API
* **PostgreSQL** for the Flights API

This allows the services to maintain separate data stores appropriate to their individual responsibilities.

### Infrastructure

* **Docker**
* **Docker Compose**
* **Nginx** for the production frontend container
* **Vite development server**

The repository includes separate production and development frontend containers, with the development configuration supporting live reloading through a bind mount.

## Project Structure

```text
FlightBeacon-JS/
│
├── backend/
│   │
│   ├── flights-api/
│   │   ├── prisma/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── prisma.config.ts
│   │   └── server.js
│   │
│   ├── opensky-api/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── server.js
│   │
│   └── user-api/
│       ├── prisma/
│       ├── Dockerfile
│       ├── package.json
│       ├── prisma.config.ts
│       └── server.js
│
├── frontend/
│   └── flight-ui/
│       ├── public/
│       ├── src/
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── package.json
│       ├── vite.config.mjs
│       └── tailwind.config.mjs
│
├── docker-compose.yml
└── .gitignore
```

The repository currently follows this frontend/backend separation, with the backend further divided into independent services.

## Backend Services

### User API

The User API is responsible for user-related functionality.

It is implemented using:

* Node.js
* Express
* Prisma
* MySQL

The service is exposed on port `3000` when running through the supplied Docker Compose configuration.

### Flights API

The Flights API is responsible for flight-related application data.

It is implemented using:

* Node.js
* Express
* Prisma
* PostgreSQL

The service is exposed through port `3001` in the Docker Compose configuration.

### OpenSky API

The OpenSky API service provides a dedicated backend boundary for communicating with the OpenSky Network.

Rather than having the React frontend communicate directly with the external aviation API, the project provides a dedicated backend service for this integration.

This creates a separation between the application's frontend and external API integrations.

## Frontend

The frontend is contained within:

```text
frontend/flight-ui
```

It is built with React and Vite and currently uses:

* React
* React DOM
* React Router
* Axios
* Tailwind CSS
* ESLint

The application is configured as an ES module and provides Vite development and production build commands.

### Development

The frontend can be run directly using:

```bash
cd frontend/flight-ui
npm install
npm run dev
```

The Vite development server is configured to listen on all interfaces, which also allows it to run inside the Docker development container.

## Docker

FlightBeacon-JS includes a Docker Compose configuration for running the application's services together.

The current configuration contains:

```text
frontend
frontend-dev
user-api
flights-api
opensky-api
user-db
flights-db
```

All services are connected through the `flight-network` Docker bridge network.

### Production Frontend

The production frontend is built using:

```text
frontend/flight-ui/Dockerfile
```

and is served through Nginx.

The production container exposes:

```text
5173 → 80
```

on the host/container boundary.

### Development Frontend

A separate development container is provided using:

```text
frontend/flight-ui/Dockerfile.dev
```

The development Vite server is exposed on:

```text
5174 → 5173
```

The source directory is bind-mounted into the container, allowing changes made locally to be reflected inside the development environment.

## Getting Started

### Prerequisites

For the recommended Docker-based setup, you will need:

* Git
* Docker
* Docker Compose

For running the frontend independently, you will also need:

* Node.js
* npm

### Clone the Repository

```bash
git clone https://github.com/Jake-M-77/FlightBeacon-JS.git
cd FlightBeacon-JS
```

### Start the Application with Docker

Build and start the application using:

```bash
docker compose up --build
```

Once the containers have started, the frontend and backend services will be available through their configured ports.

### Run in the Background

To start the application without attaching to the container logs:

```bash
docker compose up --build -d
```

### Stop the Application

```bash
docker compose down
```

## Development

The project can be developed either through Docker Compose or by running individual services locally.

### Frontend

```bash
cd frontend/flight-ui
npm install
npm run dev
```

### Backend Services

Each backend service contains its own `package.json`, meaning dependencies are managed independently.

For example:

```bash
cd backend/user-api
npm install
```

The same approach can be used for:

```text
backend/flights-api
backend/opensky-api
```

## Database Architecture

FlightBeacon-JS currently separates its persistent data by service.

```text
User API
   │
   ▼
MySQL
userDB
```

and:

```text
Flights API
   │
   ▼
PostgreSQL
flightDB
```

This allows the user and flight domains to maintain independent database schemas and persistence layers.

The database connections are configured through environment variables supplied to the Docker containers.

## OpenSky Network

The OpenSky Network provides the external aviation data used by FlightBeacon-JS.

The OpenSky integration has its own API service within the backend:

```text
React Frontend
      ↓
OpenSky API Service
      ↓
OpenSky Network
```

This approach keeps external API communication behind the application's own backend boundary.

## Application Flow

The overall architecture can be represented as:

```text
User
 │
 ▼
React Application
 │
 ├───────────────► User API ─────────► MySQL
 │
 ├───────────────► Flights API ──────► PostgreSQL
 │
 └───────────────► OpenSky API ──────► OpenSky Network
```

This separation allows each backend service to have a focused responsibility while the React frontend acts as the main user interface.

## Development Status

FlightBeacon-JS is currently an **in-development project**.

The repository already establishes the core full-stack architecture, including:

* React frontend
* Multiple Express APIs
* Database-backed services
* Prisma integration
* OpenSky integration boundary
* Docker Compose orchestration
* Development and production frontend containers

However, the application is not yet considered a finished flight tracking platform.

The architecture and individual services are expected to continue evolving as functionality is added.

## Goals

The long-term goal of FlightBeacon-JS is to develop a complete web-based flight information application.

Areas of development include:

* Flight tracking
* Flight search
* Airport information
* Aircraft information
* User accounts
* Saved flight information
* Flight history
* OpenSky data integration
* Persistent flight data
* Improved frontend UX
* Service-to-service communication
* Automated testing
* Production deployment

## Technical Focus

FlightBeacon-JS provides practical experience across the full-stack development lifecycle, including:

* JavaScript
* React
* Node.js
* Express
* REST APIs
* React Router
* Axios
* Prisma
* MySQL
* PostgreSQL
* Docker
* Docker Compose
* Microservice-style architecture
* API integration
* Environment configuration
* Frontend/backend separation
* Database-backed applications

## Relationship to FlightBeacon

FlightBeacon-JS is the web-based successor to the original FlightBeacon project.

The original project was developed as a C#/.NET console application focused on interacting with the OpenSky Network.

FlightBeacon-JS takes the same general aviation-data concept and expands it into a full-stack application:

```text
FlightBeacon
C# / .NET
Console Application
        │
        ▼
FlightBeacon-JS
JavaScript
React + Express
Full-Stack Web Application
```

This makes FlightBeacon-JS a continuation of the original project's ideas while providing an opportunity to explore a considerably broader application architecture.

## License

No license has currently been specified for this repository.

---

**FlightBeacon-JS** — Bringing flight information from the OpenSky Network to a modern full-stack web application.
