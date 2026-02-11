# Client Management Module (MERN)

This project contains a beginner-friendly **Client Management** CRUD module using:
- Frontend: React.js + Axios + React Router
- Backend: Node.js + Express.js + Mongoose
- Database: MongoDB (Atlas or local)

## Folder Structure

```text
ClientProject/
  backend/
    controllers/
      clientController.js
    models/
      Client.js
    routes/
      clientRoutes.js
    .env.example
    package.json
    server.js
  frontend/
    public/
      index.html
    src/
      api/
        clientApi.js
      components/
        AddClient.jsx
        ClientList.jsx
        EditClient.jsx
      App.js
      index.js
      styles.css
    .env.example
    package.json
  README.md
```

## Backend Setup

```bash
cd backend
npm install
```

1. Create `.env` file from `.env.example`
2. Set your MongoDB URL in `MONGO_URI`
3. Run backend:

```bash
npm run dev
```

Server starts at `http://localhost:5000`

## Frontend Setup

```bash
cd frontend
npm install
```

1. Create `.env` file from `.env.example`
2. Run frontend:

```bash
npm start
```

Frontend starts at `http://localhost:3000`

## REST APIs

### Add Client
- `POST /api/clients`

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "Acme Inc"
}
```

Response (201):

```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "_id": "66c7514792b38712ab0e9e11",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "company": "Acme Inc",
    "createdAt": "2026-02-11T10:20:47.324Z",
    "__v": 0
  }
}
```

### Get All Clients
- `GET /api/clients`

Response (200):

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66c7514792b38712ab0e9e11",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "company": "Acme Inc",
      "createdAt": "2026-02-11T10:20:47.324Z",
      "__v": 0
    }
  ]
}
```

### Get One Client (used by Edit screen)
- `GET /api/clients/:id`

Response (200):

```json
{
  "success": true,
  "data": {
    "_id": "66c7514792b38712ab0e9e11",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "company": "Acme Inc",
    "createdAt": "2026-02-11T10:20:47.324Z",
    "__v": 0
  }
}
```

### Update Client
- `PUT /api/clients/:id`

Request:

```json
{
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "1112223333",
  "company": "Acme Corp"
}
```

Response (200):

```json
{
  "success": true,
  "message": "Client updated successfully",
  "data": {
    "_id": "66c7514792b38712ab0e9e11",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "1112223333",
    "company": "Acme Corp",
    "createdAt": "2026-02-11T10:20:47.324Z",
    "__v": 0
  }
}
```

### Delete Client
- `DELETE /api/clients/:id`

Response (200):

```json
{
  "success": true,
  "message": "Client deleted successfully",
  "data": {
    "_id": "66c7514792b38712ab0e9e11",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "1112223333",
    "company": "Acme Corp",
    "createdAt": "2026-02-11T10:20:47.324Z",
    "__v": 0
  }
}
```

## Notes
- Use MongoDB Atlas by putting Atlas connection string in `backend/.env`.
- CORS is enabled in backend for frontend access.
- React forms are controlled using state and hooks.
- Loading and error states are handled on all pages.
