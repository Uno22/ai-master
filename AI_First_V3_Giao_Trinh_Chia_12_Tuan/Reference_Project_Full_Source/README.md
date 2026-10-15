# AI-First Reference Project (TypeScript / NestJS)

This is a **complete, intentionally small reference slice**, not the full twelve-week capstone.
The domain and AI mock adapter are testable without network access. The HTTP layer uses NestJS and needs `npm install`.

## Requirements

- Node >= 22.16.0
- npm (for the HTTP/NestJS integration)

## Run domain tests (no install required)

```bash
npm test
```

## Run NestJS API (requires dependencies)

```bash
npm install
npm run typecheck
npm run start:dev
```

Endpoints: `GET /inventory/101`, `POST /inventory/reservations`, `POST /ai/generate`, `POST /ai/tools/stock`.

Example:

```bash
curl -X POST http://localhost:3000/inventory/reservations \
  -H 'content-type: application/json' \
  -d '{"productItemId":101,"quantity":2,"idempotencyKey":"demo-1"}'
```

## Security and production limitations

- In-memory only: reservations are NOT safe across processes, instances, crashes or database transactions.
- No authentication: use only in local isolated environments; no deployment as a public service.
- Mock AI: adapters are deterministic teaching substitutes, not OpenAI/Anthropic/Gemini network clients.
- Production exercises later add MySQL transaction/unique index, authz, provider SDK adapters, rate limiting, tracing, budgets and approval gates.

See `docs/acceptance.md` and `docs/runbook.md`.
