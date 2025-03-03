# ToolIt Docs

A handy chat-gpt wrapper focused on vehicle diagnostic tools, built with Vue, Node, MongoDB and TypeScript

## Prerequisites

- Node.js v18 or higher
- Docker and Docker Compose

## Running with Docker

1. Clone the repository:

```bash
git clone <repository-url>
cd toolit
```

2. Create the `.env` file in the root directory:

```bash
PORT=3000
NODE_ENV=development
VITE_API_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/
OPENAI_API_KEY=
VITE_EMAIL_PUBLIC_KEY=
```

3. Build and run containers:

```bash
docker compose build --no-cache
docker compose watch
```

4. Health check:
    - Client: http://localhost:5173
    - Server: http://localhost:3000
