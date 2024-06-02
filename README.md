# Printease-backend

## Walkthrough Video

[![Video Title](http://img.youtube.com/vi/ILdctlz-VvI/0.jpg)](https://www.youtube.com/watch?v=ILdctlz-VvI)

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/ILdctlz-VvI)

## How to setup?

- Setup all the environment vars in the .env file taking inspiration from the .env.example file

- Setup the mysql server locally.

- Make sure that the env var "BLOB_READ_WRITE_TOKEN" is not set when running the server locally. It will only be used when deploying on vercel.

After that, do,

> npm i

> prisma migrate dev

> npm run dev

### Test Credentials

**Shop-owner:** _Email_ - shop1@gmail.com, _Pass_ - test

**Customer:** _Email_ - customertest@test.com, _Pass_ - test

### Misc

Frontend is deplyed here [Printease Web](https://print-ease.netlify.app)
(Credits: [Aman Siddiqui](https://github.com/Aman-Sidd))

Link for the frontend codebase - [PrintEase-UI](https://github.com/Aman-Sidd/PrintEase)
