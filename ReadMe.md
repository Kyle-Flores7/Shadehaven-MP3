Project Name: Shadehaven Lore API (Real-Time Bestiary & Lore Database)

1. Project Overview

The Shadehaven Lore API is a backend application that maintains a real-time fantasy bestiary for the Shadehaven universe.

Instead of consuming data directly from an external API at runtime, the server fetches monster/creature data from a public fantasy API on startup and stores it in a MongoDB database. The Shadehaven application then reads and manipulates this local database instead of making live external calls for every request.

This project continues my previous Shadehaven Codex mini-projects by adding a proper backend and database layer that could later power the React front-end.