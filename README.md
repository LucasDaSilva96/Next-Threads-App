# A Next.js Meta Threads Application

![Preview image 1](/public/img/Threads-1.png)
![Preview image 2](/public/img/Threads-2.png)

## Introduction

Welcome to the Next.js Meta Threads Application! This app is designed to manage and display threads in a vibrant community setting. Built with Next.js, it leverages the framework's powerful features such as server-side rendering and dynamic routing to provide a seamless and efficient user experience.

The primary goal of this project is to explore and implement advanced concepts in authentication, Next.js, and backend development. Whether you're here to learn, contribute, or simply use the app, we hope you find it valuable and engaging.

## Features

- User Authentication: Secure and easy login and registration using Clerk.
- Thread Management: Create, read, update, and delete threads.
- Real-time Updates: Stay updated with the latest threads and interactions.
- Responsive Design: Optimized for various devices and screen sizes.
- Dynamic Routing: Effortlessly navigate through different sections and threads.

## Technologies Used

- Next.js: Framework for server-rendered React applications.
- Clerk: Authentication and user management.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- React: JavaScript library for building user interfaces.

## Getting Started

To get a local copy of the project up and running, follow these simple steps:

### Clone the Repository:

```sh

 git clone https://github.com/LucasDaSilva96/Next-Threads-App.git
```

### Install Dependencies:

```sh

 cd NEXT-THREADS
 npm install
```

## Set Up Environment Variables:

Create a .env.local file in the root directory and add your environment variables.

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Public key for Clerk, used for initializing the Clerk frontend.
- CLERK_SECRET_KEY: Secret key for Clerk, used for server-side operations.
- NEXT_CLERK_WEBHOOK_SECRET: Webhook secret for verifying requests from Clerk.
- NEXT_PUBLIC_CLERK_SIGN_IN_URL: URL path for the sign-in page.
- NEXT_PUBLIC_CLERK_SIGN_UP_URL: URL path for the sign-up page.
- UPLOADTHING_SECRET: Secret key for Uploadthing, used for file uploads.
- UPLOADTHING_APP_ID: Application ID for Uploadthing.
- DB_PASSWORD: Password for the MongoDB database.
- MONGODB_URI: Connection string for connecting to the MongoDB database.

## Run the Application:

```sh
 npm run dev
 Open Your Browser:
 Visit http://localhost:3000 to see the application in action.
```
