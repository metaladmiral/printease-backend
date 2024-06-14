# Printease-backend 🖨️

## Introduction

Printease is a SaaS application designed to streamline the print ordering process for students and print shops near universities. It allows print shop owners to accept online print orders easily, reducing the need for students to wait in queue. With Printease, students can place print orders online and simply pick them up at the shop, saving time and avoiding queues.

> [!NOTE]
> **There are no logistics involved. Students have to get to the shop physically to get their printouts without waiting in the queue**

[More Details](https://printease-official.onrender.com/)

### Table of Contents 🗒️
- [Introduction](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#introduction)
- [Features](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#features-and-pages-)
- [Tech Stack](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#tech-stack-%EF%B8%8F)
- [Project Setup Guide](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#how-to-setup-)
- [Credentials for Testing](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#test-credentials-)
- [Useful links and Credits](https://github.com/metaladmiral/printease-backend?tab=readme-ov-file#useful-links--credits-)

# Features and Pages 🌟

#### Types of Pages (based on Types of Users 👨‍🦲)
1. Common Pages
2. Customer Pages
3. Shop-Owner Pages

## Common Pages

> ***Login/Register Page***
1. Secure and Fast
2. Uses JWT instead of session and cookies for persistent auth state.

    (Removing the overhead caused by storing sessions on the server)

   ![Login Page](https://github.com/metaladmiral/printease-backend/assets/107746968/3c5caa2d-69ac-412d-a80a-32a02e2c48a4)


> ***Profile Page***
1. View all your details here.
2. Logout here.

![Profile Page](https://github.com/metaladmiral/printease-backend/assets/107746968/42deef70-8c8a-499b-aa24-617bf093553f)


### Customer Pages

> ***Create-Order Page***
1. Create orders by selecting print details like page size, color, and PDF on this page.
2. Click **NEXT** to proceed to the **Checkout** page for payment and order completion.

![Customers create order on this page](https://github.com/metaladmiral/printease-backend/assets/107746968/bd72fd5b-2507-4b68-b813-09a00ec8f2bb)

> ***Order-Dashboard Page***
1. View all order history here.
2. Filter orders by status: ORDER PENDING, ORDER PREPARED/PRINTED, or ORDER PICKED.
3. Pagination is enabled for long order lists.

![Customers see their order history here](https://github.com/metaladmiral/printease-backend/assets/107746968/9ba12027-fdad-4bb0-8dde-8d3a8e0dcb77)


### Shop-Owner Pages

> ***Owner Order-Dashboard Page***
1. Similar to the Customer Order Dashboard.
2. View all order history here.
3. Filter orders by status: ORDER PENDING, ORDER PREPARED/PRINTED, or ORDER PICKED.
4. Pagination is enabled for long order lists.
5. Click any order tile to change its status and notify the customer.

![Shop-Owner Dashboard](https://github.com/metaladmiral/printease-backend/assets/107746968/7c198cca-c0fe-4113-aac9-00543fd94d4c)


> ***Update Order Status Page***

1. Order Status can be changed on this page.

![Order Status Change Page](https://github.com/metaladmiral/printease-backend/assets/107746968/b24e08f0-dcd9-40c6-b478-41bcbad1c4ab)


## Tech Stack ⚛️

### Frontend
1. React Native
2. Expo
3. Javascript

### Backend
1. ExpressJS
2. Typescript
3. MySQL
4. Prisma ORM
5. #### Deployment
       Vercel (for development and testing)
       AWS/other VPS (for production)

## How to setup? 💻

1. Setup all the environment vars in the .env file taking inspiration from the .env.example file
2. Setup the mysql server locally.
3. Make sure that the env var "BLOB_READ_WRITE_TOKEN" is not set when running the server locally. It will only be used when deploying on vercel.

After that do,
```bash
npm i
prisma generate
prisma db push
npm run dev
```

## Test Credentials 🔑

| User Type | Email | Pass 
| --- | --- | --- |
| Shop Owner | shop1@test.com | test
| Customer | customer1@test.com | test

## Useful Links & Credits ➕

Frontend is deployed here [Printease Web](https://print-ease.netlify.app)

Link for the frontend codebase - [PrintEase-UI](https://github.com/Aman-Sidd/PrintEase)

(Credits: [Aman Siddiqui](https://github.com/Aman-Sidd))
