# AI Provider Incident Runbook

## Symptoms
429 spikes, increased provider error rate, elevated p95 latency or token-cost anomalies.

## Triage
1. Identify provider, model, route, first occurrence, error class and trace IDs.
2. Check whether requests are read-only or have side-effecting tools.
3. Verify model/provider status with official sources.
4. Disable retries exceeding the bounded policy; preserve user-facing graceful errors.

## Recovery
1. Use a preapproved fallback only if data policy, capabilities and cost allow it.
2. Never replay a tool with side effects without durable idempotency check.
3. Run staging smoke and compare error rate; record rollback decision and operator.
4. Produce a postmortem with confirmed causes and remaining unknowns.

**No production changes are authorized by this document alone.**
