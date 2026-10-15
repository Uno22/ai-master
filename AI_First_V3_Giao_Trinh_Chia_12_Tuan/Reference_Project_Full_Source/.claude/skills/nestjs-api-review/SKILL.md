---
name: nestjs-api-review
description: Review NestJS changes for API contract, authorization, transactions, tests and secrets before a human approves a PR.
---

# NestJS API Review

Read changed files, API requirements and relevant existing patterns. Operate read-only by default.

## Review sequence

1. Validate request/response contract and HTTP errors against OpenAPI or approved DTOs.
2. Check authentication and authorization at the service/tool boundary.
3. Check transaction boundaries, idempotency and concurrency in write endpoints.
4. Verify negative tests, including wrong tenant, bad payload, duplicate request and failures.
5. Review redaction, logging and secrets handling.
6. Compare findings with test reports; do not invent a reproduction.

## Output

| Severity | file:line | Evidence | Repro steps | Proposed regression test |
|---|---|---|---|---|

If evidence is missing, write NOT VERIFIED and request the specific source/test. Do not edit files or merge PRs.
