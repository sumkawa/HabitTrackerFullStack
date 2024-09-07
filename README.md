This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![dashboard](/public/dashboard.png)
[Screenshot of Habit Tracking App Dashboard](/public/dashboard.png)

## About

Project is hosted on Vercel, with PostgreSQL and Next for db and backend stuff. The app allows users to add friends, compete for habits completed in a day, track the habits they complete & view data and analytics related to their habits. App is complete with user auth & accounts.

Currently working on more advanced data visualizations utilizing correlation matrices and graph theory.

[Project Website](https://summitkawakami.com/habits/)

## Getting Started

First, download dependencies & build next:

```
nvm use

pnpm i
pnpm run build
```

Then run `pnpm dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note: Project won't work since .env file is omitted & api keys for production, db, etc. aren't available.**
In order for it to work you'll have to add a .env with the appropriate postgres & OAuth env vars.
