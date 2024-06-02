# Printease-backend

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
