# Rate My Human — Claude Notes

## Stack

- `client/` — React + Vite (frontend)
- `server/` — Node + Express (backend)
- `prisma/` — Prisma schema, migrations, seed files

## Team ownership

| Area | Owner |
|---|---|
| `client/` and project skeleton | Michael |
| `server/` and `prisma/` | Jordan |
| Frontend-to-API wiring | Phil |

## Scope rules

Unless Michael explicitly asks, do NOT:
- Create or modify database schema (`prisma/schema.prisma`)
- Create or modify seed files (`prisma/seed.*`)
- Create or modify Prisma configuration
- Create or modify API route logic (`server/routes/`, `server/controllers/`, etc.)

Keep changes scoped to `client/` and project-level skeleton files (root config, `.gitignore`, `package.json`, etc.) unless asked otherwise.
