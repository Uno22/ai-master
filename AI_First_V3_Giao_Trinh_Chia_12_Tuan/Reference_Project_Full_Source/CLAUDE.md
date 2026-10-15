# Claude Code project instructions

## Repository facts
- TypeScript, Node.js 22+, NestJS HTTP integration; domain is framework-free.
- `npm test` uses Node's built-in test runner and no paid AI API.
- `npm run start:dev` requires `npm install` to fetch dependencies.
- No real databases, payment operations, or real AI provider calls exist in this example.

## Workflow
1. READ-ONLY explore first; distinguish verified files from assumptions.
2. Request approval before editing app code, installing packages, or running a live service.
3. Provide a proposed file manifest before implementing.
4. For each created or modified file, provide complete final contents, no TODO, `...`, or omitted imports.
5. Run available validation and report command, exit code, observed output, and skipped tests.
6. Keep changes small and reversible; no push, deployment or production changes.

## Security
- Never open or output secrets or hidden credentials.
- Never permit a model-proposed tool call to bypass user authorization.
- Mock providers only unless a human explicitly approves sending inputs to an external provider.
