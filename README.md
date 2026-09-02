# LinkedIn Leads Search Platform

Full-stack application for searching and filtering LinkedIn professional profiles.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: NestJS 10, TypeORM, PostgreSQL
- **Search**: ElasticSearch 8 (with database fallback)

## Project Structure

```
linkedin-leads/
├── frontend/          # Next.js Frontend (port 3000)
│   ├── src/
│   │   ├── app/       # Pages
│   │   └── components/
│   └── package.json
├── backend/           # NestJS Backend (port 3001)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── profile/
│   │   │   └── search/
│   │   └── shared/
│   └── package.json
└── README.md
```

## Setup

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment

```bash
# Linux / Mac
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Windows (PowerShell)
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.local.example frontend\.env.local
```

Edit `backend/.env` with your PostgreSQL credentials if needed.

### 3. Create Database

```sql
CREATE DATABASE linkedin_leads;
```

### 4. Run Development Servers

Open **two terminals**:

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Swagger Docs: http://localhost:3001/api/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profiles` | List all profiles |
| GET | `/api/profiles/search` | Search with filters |
| GET | `/api/profiles/filters` | Get filter options |
| GET | `/api/profiles/:id` | Get profile by ID |
| POST | `/api/profiles` | Import profiles |
| GET | `/api/search` | ElasticSearch search |
| GET | `/api/search/index` | Index all profiles |

### Search Parameters

| Parameter | Type | Example |
|-----------|------|---------|
| `keyword` | string | `react developer` |
| `skills` | string | `TypeScript,React` |
| `industry` | string | `Information Technology` |
| `job_title` | string | `Software Engineer` |
| `location` | string | `Iran,United States` |
| `company_size` | string | `51-200,201-500` |
| `page` | number | `1` |
| `limit` | number | `20` |

## Architecture

### Backend (NestJS)
- **Modules**: Profile, Search
- **Controllers**: Handle HTTP requests
- **Services**: Business logic
- **Entity**: TypeORM entity for PostgreSQL
- **DTOs**: Data transfer objects with validation
- **Interceptors**: Response transformation
- **Filters**: Exception handling
- **Pipes**: Input validation
- **Swagger**: API documentation at http://localhost:3001/api/docs

### Frontend (Next.js)
- **Components**: SearchBar, FilterPanel, ProfileCard, ProfileList, Pagination
- **Pages**: Main search page

## License

MIT
