# Listify - A Task Manager App

Welcome to **Listify**, a simple and efficient task manager app built using Vite, React.js, SCSS, and CORS. This README will guide you through the steps to set up and run the project, along with an overview of the technologies used.

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Backend API](#backend-api)

## Introduction
Listify is a modern task manager application designed to help you manage your tasks efficiently. Built with Vite and React.js, Listify offers a fast and responsive user experience. The app uses a backend API to connect to a database for storing your tasks.

## Technologies Used
- **Vite**: A fast build tool and development server for modern web projects.
- **React.js**: A JavaScript library for building user interfaces.
- **SCSS**: For enhanced and modular styling.
- **Tailwind CSS**: For utility-first CSS styling.
- **CORS**: Cross-Origin Resource Sharing to handle API requests across different domains.
- **Backend API**: For connecting to the database and managing tasks.

## Installation

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js](https://nodejs.org/).

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/listify.git
    ```
2. Navigate to the project directory:
    ```bash
    cd listify
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Development Mode
To start the application in development mode, run:
```bash
npm run dev
```
This will start the Vite development server and you can view the app at `http://localhost:3000`.

### Production Build
To create a production build, run:
```bash
npm run build
```
This will generate the production-ready files in the `dist` directory.

### Preview Production Build
To preview the production build locally, run:
```bash
npm run serve
```
This will start a local server to preview the build.

## Project Structure
Here is an overview of the project structure:

```
listify/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   │   └── main.scss
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Backend API
The backend API is responsible for connecting to the database and managing tasks. Make sure your backend server is running and accessible. You can configure the API endpoint in the application settings.

### API Endpoints
- **GET /tasks/myTask**: Retrieve all tasks
- **POST /tasks/create**: Create a new task
- **PUT /tasks/:id**: Update an existing task
- **DELETE /tasks/:id**: Delete a task

Thank you for using Listify! If you have any questions or feedback, feel free to reach out.

---

**Happy Tasking!**
