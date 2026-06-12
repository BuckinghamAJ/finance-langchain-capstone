# SolidJS Wails Template

A personal desktop app template for SolidJS, Tailwind CSS, Go, Wails v2, SQLite, goose, and sqlc.

## Tech Stack

- **Backend:** Go 1.25, SQLite, goose migrations, sqlc query types
- **Frontend:** SolidJS, TypeScript, Tailwind CSS v4, Solid Router, solid-ui/Kobalte primitives
- **Framework:** Wails v2 (Go <-> JS bridge, native desktop builds)
- **Package Manager:** pnpm

## Project Structure

```
solidjs-wails-template/
  app.go                 -- Wails app controller, exposes methods to frontend
  main.go                -- Entrypoint, Wails window config
  migrations/            -- Embedded goose SQL migrations
  internal/
    db/                  -- SQLite setup and migration runner
    store/               -- sqlc schema, queries, and generated query layer
  frontend/              -- SolidJS + TypeScript + Tailwind CSS v4
    src/
      components/        -- UI components and solid-ui primitives
      routes/            -- Page-level route components
      layouts/           -- Layout wrappers
    wailsjs/             -- Auto-generated Wails v2 JS bindings (do not edit)
  wails.json             -- Wails v2 project config
  scripts/               -- Shell build scripts for various platforms
  .github/workflows/     -- CI/CD release workflow
```

## Getting Started

Prerequisites: Go 1.25+, Node 20+, pnpm, Wails v2 CLI, and sqlc if you want to regenerate query code.

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest

cd frontend
pnpm install
cd ..

wails dev
```

## Build

```bash
wails build
```

Wails v2 uses `wails.json` for frontend build/dev commands. The build compiles the frontend, regenerates TypeScript bindings, and writes the app binary to `build/bin/`.

## Database Workflow

The starter app includes a small `items` table to prove the full data path works.

```bash
# create a new goose migration
goose -dir migrations create add_example_table sql

# regenerate sqlc code after editing schema.sql or queries.sql
cd internal/store
sqlc generate

# regenerate Wails bindings after changing App methods
cd ../..
wails generate module
```

The SQLite database is created in the user's OS config directory under `solidjs-wails-template/app.db`.

## Rename Checklist

- Update the Go module path in `go.mod`.
- Update `name` and frontend commands in `wails.json`.
- Update the app title and config directory name in `main.go` and `app.go`.
- Replace `assets/appicon.png`.
- Update release artifact names in `.github/workflows/release.yml`.

## License

[MIT](LICENSE)
