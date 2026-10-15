# Multi-model routing policy

## Routing order
1. Security/data-sharing permission and residency requirements.
2. Required capability: text, code, tools, structured output, image, or long context.
3. Measured success on the relevant golden dataset.
4. Cost/latency budgets and availability.

## Default roles
- Claude Code: primary repository implementer.
- Codex: independent review of diff, tests and contract.
- Gemini: analysis of large approved design documents when beneficial.
- Product runtime providers: selected by capability and policy, not by brand.

## Fallback
Only retry/fallback if policy permits, output schema is compatible, and it cannot duplicate side effects. Record provider/model, prompt version, usage, error class, retry count and estimated cost, but not raw secrets or PII.

## Evaluation
Compare at least two approved models on the same source-verified task set, record sample size and cost. No hardcoded model IDs or live prices in this document.
