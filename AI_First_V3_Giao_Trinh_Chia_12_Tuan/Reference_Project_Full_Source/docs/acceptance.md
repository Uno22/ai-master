# Acceptance checklist

- [ ] All example project files are complete and named in the README.
- [ ] `npm test` passes offline using Node 22+.
- [ ] Duplicate reservation with same key/payload is idempotent in one process.
- [ ] Duplicate key with different payload returns conflict.
- [ ] Unauthorized stock tool access is rejected in the domain tool executor.
- [ ] Mock multi-provider routing returns provider name and usage.
- [ ] After `npm install`, NestJS development server starts and HTTP smoke tests pass.
- [ ] Production readiness is explicitly NOT claimed.

## Negative controls

- Remove a required test assertion and verify a regression can be detected by an added test.
- Try reusing idempotency key with changed quantity.
- Try malformed product ID or non-positive quantity.
- Do not expose a public endpoint without real authentication.
