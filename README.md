# Express SQLite3 CRUD API

A simple REST API built with Express.js and SQLite3 for basic CRUD operations.

## Features

- Create, Read, Update and Delete operations
- SQLite3 database for data persistence
- Express.js REST API endpoints
- Simple and lightweight setup

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/candraKriswinarto/express-sqlite-crud
cd express-sqlite-crud
```

2. Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The API will be running at `http://localhost:3000`

## API Endpoints

- GET `/api/items` - Get all items
- GET `/api/items/:id` - Get a single item
- POST `/api/items` - Create a new item
- PUT `/api/items/:id` - Update an item
- DELETE `/api/items/:id` - Delete an item
- DELETE `/api/items` - Delete All items

## Example Request

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "This is a test item"}'
```
