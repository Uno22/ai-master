# ADR 0001 — Durable order idempotency

- **Status:** Proposed (not implemented in this sample)
- **Context:** Client retries and message redelivery can duplicate a COD order. Redis locks alone do not persist durable results after TTL/process failure.
- **Decision:** Store a unique `(tenant_id, idempotency_key)` with request fingerprint and order reference in the primary transactional database. A duplicate with the same fingerprint returns the original outcome; a different fingerprint returns a conflict.
- **Tradeoff:** Requires transaction design, uniqueness handling and retained records; supports crash recovery and traceable outcomes.
- **Rejected alternative:** Redis `SET NX` as the only source of truth, because lock expiry/restart can permit duplicate writes.
- **Verification:** Two parallel same-key requests yield one committed order; changed payload returns 409; simulated crash/retry returns durable outcome.
- **Rollback:** Disable write endpoint and reconcile pending keys; do not delete durable idempotency records without reconciliation.
- **Evidence:** NOT VERIFIED until backed by database integration tests.
