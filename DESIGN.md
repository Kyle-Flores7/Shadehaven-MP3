# Shadehaven MP3 – Design & Requirements

## Project Concept

This project extends my earlier Shadehaven Codex work by adding a backend API and real database. The idea is to manage a collection of fantasy creatures that can be used as the foundation for Shadehaven lore.

- The **external API** (D&D 5e API) provides generic fantasy monsters.
- My **MongoDB database** stores those creatures locally.
- I can then extend or override those creatures with Shadehaven-specific data using CRUD operations.

The long-term idea is that this backend could later power the Shadehaven Codex front-end.

---

## Functional Requirements

**Users (via Postman or another client) can:**

- Retrieve **all** creatures in the database.
- Retrieve a **single** creature by its id.
- **Create** new creatures, including custom Shadehaven characters.
- **Update** existing creature data (for example, adding lore fields).
- **Delete** creatures from the database.

**The system must:**

- Fetch data from an external API on startup.
- Seed the database only when it is empty.
- Use MongoDB to store and query creature data.
- Follow the MVC (Model–View–Controller) pattern.

---

## Non-Functional Requirements

- Use **Node.js** and **Express** for the backend.
- Use **MongoDB Atlas** as the database.
- Follow a clear **folder structure** (MVC).
- Be testable using **Postman** (no front-end required).
- Use environment variables for secrets (Mongo connection string).

---

## Architecture Overview (MVC)

The application is structured as follows:

- `/src/app.js` – Express app setup and middleware.
- `/src/server.js` – Starts the server, connects to MongoDB, and runs seeding.
- `/src/models/Creature.js` – Mongoose schema for creatures.
- `/src/controllers/creatureController.js` – Logic for CRUD operations.
- `/src/routes/creatureRoutes.js` – Express router that maps URLs to controller functions.
- `/src/services/externalApiService.js` – Handles external API calls and database seeding.
- `/src/config/db.js` – MongoDB connection logic.

### Data Flow

```text
Client (Postman)
      │
      ▼
Express Routes (/api/creatures)
      │
      ▼
Creature Controller
      │
      ├── Reads/Writes MongoDB via Mongoose
      │
      └── (On startup) External API service seeds database
