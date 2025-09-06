# Daily Weather Notifier

A side project built with **Fastify, BullMQ, Redis, and Prisma** to send **daily or weekly weather forecast emails** to subscribers.  
The system fetches weather data, caches results by location, and distributes emails efficiently

---

## Features

- Email subscribers with **daily or weekly forecasts**.
- Location-based grouping — fetch forecast once per country, share across subscribers.
- Job queues with **BullMQ** for scalability & retries.
- **Redis caching** to avoid repeated API calls for the same location/date.
- Built with **TypeScript**, **Fastify**, **Prisma ORM**, and **Docker** ready.

---

## Tech Stack

- **Fastify** – API server
- **Prisma** – Database ORM (PostgreSQL/MySQL/SQLite)
- **BullMQ** – Job queue for scheduling and workers
- **Redis** – Queue backend & caching
- **Nodemailer** – Email sending
- **TypeScript** – Strict typing

---
