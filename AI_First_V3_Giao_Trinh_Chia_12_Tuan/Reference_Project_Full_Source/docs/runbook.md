# Local recovery runbook

1. **Before changes:** record `git status --short` and current branch.
2. **Dependencies unavailable:** run only `npm test`; report NestJS startup as NOT VERIFIED.
3. **Domain tests fail:** record exact test name, stderr and exit code. Ask Claude to propose smallest fix and add a regression test.
4. **Provider missing:** mock providers only; do not add real credentials or change data-sharing policy.
5. **Database migration:** none in this sample. For real MySQL add approved rollback and isolation procedure.
6. **Unplanned changes:** stop the agent and inspect the diff; do not reset unrelated user changes.
7. **Evidence:** keep command, environment, timestamp, SHA, status and remaining risks.
