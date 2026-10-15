# Commerce MVP — Product requirements

## Problem
A customer needs to browse an online catalog and place a COD order reliably. An admin must view orders. AI support must be grounded in approved FAQ materials and authorized read-only tools.

## Scope
- Buyer: browse catalog, add to cart, place COD order, view own order status.
- Admin: view catalog and order states with role-based authorization.
- AI: mock/live-provider gateway (live requires approval), FAQ with source citations, read-only order/stock tools.

## Non-goals
- Real card payments, automatic refunds, uncontrolled agent writes, multi-tenant data sharing or production scale claims.

## Acceptance examples
1. Empty cart checkout returns 400 without creating an order.
2. Same idempotency key and payload yield one order; changed payload conflicts.
3. Attempt to view another tenant's order is denied.
4. AI FAQ with no evidence responds with uncertainty rather than fabricated citations.
5. Every operation has traceable logs that exclude secrets.

## Release gates
- API contracts reviewed; DB consistency tests and browser E2E pass.
- Security checks have no unresolved high-severity authorization bypass.
- Staging smoke tests, rollback and a named human approver are recorded.
