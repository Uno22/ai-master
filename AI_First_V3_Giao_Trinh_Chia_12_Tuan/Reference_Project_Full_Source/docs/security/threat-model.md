# Threat Model — AI E-commerce reference

## Assets
Account sessions, order records, provider API keys, customer PII and tenant-sensitive inventory.

## Trust boundaries
1. Browser to NestJS API (untrusted requests).
2. NestJS to database/Redis/Kafka (server privileges).
3. NestJS to LLM provider (approved data transmission).
4. Retrieved documents to LLM (untrusted content).
5. LLM tool call to backend executor (untrusted action proposal).

## Threats and mitigations
| Threat | Example | Mitigation | Evidence required |
|---|---|---|---|
| Broken object-level authorization | user A reads B's order | server-side authz per object | cross-tenant negative tests |
| Prompt injection | FAQ says to disclose keys | no secret tools; data-only retrieval | adversarial eval |
| Duplicate order | concurrent retry | DB unique request fingerprint | DB concurrency tests |
| Key exposure | provider key in logs | redaction and secret manager | log inspection + secret scan |
| Excess spend | recursive tool loop | max tool rounds, time and budget | synthetic timeout/cost test |

## Status
Threats identified; mitigations are proposed, not certified. Human approval required before public deployment.
