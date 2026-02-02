Project Name: Shadehaven Lore API (Real-Time Bestiary & Lore Database)

1. Project Overview

The Shadehaven Lore API is a backend application that maintains a real-time fantasy bestiary for the Shadehaven universe.

Instead of consuming data directly from an external API at runtime, the server fetches monster/creature data from a public fantasy API on startup and stores it in a MongoDB database. The Shadehaven application then reads and manipulates this local database instead of making live external calls for every request.

This project continues my previous Shadehaven Codex mini-projects by adding a proper backend and database layer that could later power the React front-end.

## Project Goals

- Follow the **MVC (Model-View-Controller)** architecture
- Fetch data from an **external API** on server startup
- Populate a **MongoDB database** with that data
- Perform **full CRUD operations**
- Demonstrate functionality using **Postman**
- Keep the scope realistic and aligned with what was taught in Modules 8 and 9

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB Atlas**
- **Mongoose**
- **Axios**
- **Postman** (for testing and demonstration)

---

## Architecture (MVC)

The project follows a clear MVC structure:

- **Models**  
  Define the data structure using Mongoose schemas.

- **Controllers**  
  Contain the logic for handling requests and interacting with the database.

- **Routes**  
  Map HTTP endpoints to controller functions.

- **Services**  
  Handle external API communication and startup seeding logic.

---

## External API

This project uses the **D&D 5e API** as the external data source:

- Base URL: `https://www.dnd5eapi.co`
- Endpoint used: `/api/monsters`

On server startup, the application fetches monster data from this API and stores it locally in MongoDB. This allows the database to act as the primary data source instead of repeatedly calling the external API.

---

## Startup Seeding Logic

When the server starts:

1. The application connects to MongoDB.
2. It checks whether the `creatures` collection is empty.
3. If empty, it fetches monster data from the external API.
4. The data is transformed to match the database schema.
5. The data is inserted into MongoDB.
6. On subsequent restarts, seeding is skipped to prevent duplicates.

This approach improves performance and reliability while still demonstrating real-time API integration.

---

## Database Design

The database stores a collection called **creatures**.

Each creature includes:
- Fields sourced from the external API (name, type, hit points, challenge rating, etc.)
- Additional **Shadehaven-specific fields** such as:
  - `shadehavenName`
  - `realm`
  - `threatLevel`
  - `isCanon`
  - `notes`

This allows generic fantasy data to be extended into custom Shadehaven lore through CRUD operations.

---

## API Endpoints

Base path: `/api/creatures`

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/creatures` | Retrieve all creatures |
| GET | `/api/creatures/:id` | Retrieve a creature by ID |
| POST | `/api/creatures` | Create a new creature |
| PUT | `/api/creatures/:id` | Update an existing creature |
| DELETE | `/api/creatures/:id` | Delete a creature |

All endpoints return JSON responses and are tested using Postman.

---

## CRUD Functionality

- **Create**: Add new creatures, including custom Shadehaven characters
- **Read**: Retrieve all creatures or a single creature by ID
- **Update**: Modify existing creature data and lore fields
- **Delete**: Remove creatures from the database

These operations demonstrate full interaction with the database.

---

## Why Use a Database Instead of an External API Directly?

Using a database provides several benefits:

- Reduces repeated external API calls
- Improves performance and reliability
- Allows customization and enrichment of data
- Prevents issues if the external API becomes unavailable
- Makes it easier to extend the application in the future

---