# E-commerce Backend with Todo API

A simple Node.js backend application that connects to AWS RDS MySQL instance and provides Todo API endpoints.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     - DB_HOST: Your AWS RDS endpoint
     - DB_USER: Your database username
     - DB_PASSWORD: Your database password
     - DB_NAME: Your database name (default: ecommerce_db)
     - DB_PORT: Your database port (default: 3306)
     - PORT: Application port (default: 3000)

4. Set up the database:
   - Connect to your AWS RDS MySQL instance
   - Execute the SQL commands in `database.sql`

## Running the Application

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### GET /api/todos

Retrieves all todos

### POST /api/todos

Creates a new todo

Request body:

```json
{
  "title": "Todo title",
  "description": "Todo description"
}
```

## Testing the API

You can test the API using curl or Postman:

1. Get all todos:

```bash
curl http://localhost:3000/api/todos
```

2. Create a new todo:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Test Description"}'
```
