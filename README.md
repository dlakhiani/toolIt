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

> the `watch` parameter syncs any changes made on your local to the container, `up` fell off

4. Health check:
    - Client: http://localhost:5173
    - Server: http://localhost:3000

## Working with Docker

The build process hooks into a few files:

- `package*.json`
- `tsconfig*.json`
- `**/Dockerfile`
- `compose.yml`

After building, we can simply use `watch` to run and `stop` to suspend our cached container, saving **heaps** of time.

_However_, if you were to update the build process below, it is recommended to `docker compose down` to clear any remnants prior to another `build` ...

> Thus, unless changes were made to the above files, simply stop the containers with `docker compose stop`
