
# Vite Front-End Project

Welcome to the Vite front-end project of the "SUS" application. This project serves as the user interface for the application, allowing users to interact with various features. It is built using Vite, React, React Query, and Tailwind CSS.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Using React Query](#using-react-query)
- [Styling with Tailwind CSS](#styling-with-tailwind-css)
- [Contributing](#contributing)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project folder: `cd <project-folder>`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:3002`

## Features

The Vite front-end project provides the following features:

- User authentication and authorization
- User profile management
- Data visualization and interaction

## Authentication

The authentication process is handled by the [auth-service](link-to-auth-service), which is a separate component responsible for managing user authentication and authorization. This front-end project interacts with the auth-service to authenticate users and obtain access tokens for protected resources.

## API Endpoints

This project interacts with the following API endpoints provided by the [auth-service](link-to-auth-service):

- `/auth/signin`: Initiates the sign-in process and redirects to the authorization server.
- `/auth/acquireToken`: Retrieves an access token after successful authentication.
- `/auth/redirect`: Handles the redirect after the authentication process is completed.
- `/auth/signout`: Signs the user out and redirects to the sign-in page.

## Using React Query

This project utilizes React Query to manage data fetching and caching. React Query simplifies the process of fetching data from API endpoints and provides automatic caching, pagination, and real-time updates. Refer to the [React Query documentation](https://react-query.tanstack.com/) for detailed information on usage.

## Styling with Tailwind CSS

Tailwind CSS is used for styling and UI components in this project. Tailwind provides a utility-first CSS approach, making it easy to create responsive and custom UI elements. You can customize the styles by editing the `tailwind.config.js` file.

