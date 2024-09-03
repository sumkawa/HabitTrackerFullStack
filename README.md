This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, download dependencies & build next:
```
nvm use

pnpm i
pnpm run build
```
Then run `pnpm dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note: Project won't work since .env file is omitted & api keys for production, db, etc. aren't available.**
## About

Project is hosted on Vercel, with PostgreSQL and Next for db and backend stuff. The app allows users to add friends, compete for habits completed in a day, track the habits they complete & view data and analytics related to their habits. Currently working on more advanced data visualizations utilizing correlation matrices and graph theory.

