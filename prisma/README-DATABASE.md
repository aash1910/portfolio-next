# Database: MongoDB vs MySQL

This project is configured to use **MongoDB** by default (see `schema.prisma`).

## Switching back to MySQL

1. Replace the Prisma schema with the MySQL backup:
   ```bash
   cp prisma/schema.mysql.prisma prisma/schema.prisma
   ```
2. Set `DATABASE_URL` in `.env` to your MySQL connection string, e.g.:
   ```env
   DATABASE_URL="mysql://root:root@localhost:3306/portfolio_next"
   ```
3. Regenerate the Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```
4. Revert the app code that expects `User.id` as a string back to number (edit page, actions, DeleteUserButton) if you had changed them for MongoDB.

## Using MongoDB (current setup)

- Set `DATABASE_URL` in `.env` to your MongoDB connection string (e.g. from Atlas). On Vercel, set `DATABASE_URL` to the same value as `MONGODB_URI` if your app reads `DATABASE_URL`.
- No migrations: run `npx prisma generate` and use the app. Collections are created when you first write data.
- To seed: `npx prisma db seed`
