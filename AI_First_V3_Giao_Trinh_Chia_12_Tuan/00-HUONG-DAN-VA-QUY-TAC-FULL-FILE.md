---
title: "AI-First Software Engineering — V3 Full-File Edition"
subtitle: "12 tuần · 84 ngày · Claude Code-centered · Multi-provider · AI viết code, con người xác minh"
version: "3.0-full-file-reviewed"
language: "vi"
updated: "2026-10-16"
status: "Course material, file-complete working reference slice; not a complete tested production capstone"
---

# AI-FIRST SOFTWARE ENGINEERING — V3.0

> **84 ngày · 12 tuần · Claude Code là tác nhân thực thi chính · Codex/Gemini đánh giá khi cần.**  
> Vai trò học viên: Product owner + Engineering lead + người phê duyệt; không cần tự gõ code nhưng **phải xem được diff, contracts, test evidence, security findings và chấp nhận/trì hoãn release**.

**Điểm mới của V3:**

1. 84 ngày có **file manifest cụ thể**, mục tiêu, ví dụ kết quả và decision gate riêng.
2. Mọi prompt thực hiện thay đổi file đều có **full-file output contract**: liệt kê tất cả file tạo/sửa, từng file đầy đủ từ đầu đến cuối, không `TODO`, `...`, `same as above`, pseudocode hay import thiếu.
3. **Không áp dụng review chéo một cách máy móc.** Nêu chính xác công cụ chính, thứ tự thao tác và trường hợp cần independent reviewer.
4. **Không đánh tráo output expected thành lời giải.** Mỗi ngày có working-example decision, tình huống lỗi, kiểm chứng và checkpoint. Phụ lục chép **đầy đủ 29 file** của một reference slice TypeScript/NestJS, kèm tests được chạy tại thời điểm biên soạn.
5. Dùng một **project xuyên suốt**. Mỗi ngày tạo một artifact nằm trong dependency chain của capstone. Cần điều chỉnh file paths nếu mở rộng repo `ecom-system` có cấu trúc khác; không ép rewrite project hiện có.

> ⚠️ **Ranh giới trung thực:** Không thể bảo đảm một ứng dụng sản xuất chịu một triệu concurrent users từ bài giảng, hay rằng các API real providers/NestJS HTTP đã chạy trong môi trường không có npm dependencies/API keys. Reference slice đã test domain offline, **không** đồng nghĩa project 84 ngày đã hoàn thành/được deploy. Những chỗ chưa kiểm thử gắn nhãn NOT VERIFIED.

## Điều hướng nhanh

- [Phần A — Protocol bắt buộc](#phần-a--protocol-bắt-buộc)
- [Phần B — Bản đồ 12 tuần](#phần-b--bản-đồ-12-tuần)
- [Phần C — 84 bài chi tiết](#phần-c--84-bài-chi-tiết)
- [Phần D — Reference project: toàn bộ file](#phần-d--reference-project-đầy-đủ-19-file)
- [Phần E — Audit và rubric](#phần-e--audit-chất-lượng-và-rubric)

---

# Phần A — Protocol bắt buộc

## A1. Vai trò công cụ và quyền

| Công cụ | Công việc chính | Khi nào dùng | Điều không được suy diễn |
|---|---|---|---|
| Claude Code | Khảo sát repo, lập kế hoạch, implement, test, tạo file | Mặc định cho lab hằng ngày | Không mặc định được phép sửa DB/deploy |
| OpenAI Codex | Review độc lập và phân tích lỗi quan trọng | Những ngày có **Independent Review: YES** | Không tin summary do Claude tự viết |
| Gemini | Phân tích ADR, tài liệu dài, hợp đồng hoặc UI | Các ngày đánh dấu Gemini | Không đồng nghĩa Gemini tự chạy bên trong Claude Code |
| GitHub Copilot | Hỗ trợ IDE/PR khi có cấu hình | Review bổ sung | Không thay được CI hoặc authorization |

**Hai môi trường tách biệt:** (1) Repository sandbox chỉ chứa mock/test data; (2) staging có dịch vụ thật, giới hạn chi phí và permissions. Không dùng production thật cho thực hành.

## A2. Quy trình cố định (không lặp 84 lần)

1. **Snapshot:** `git status --short`, branch, commit SHA, scripts hiện có, quyền agent.
2. **Explore (READ-ONLY):** đòi file paths + đoạn nguồn bằng chứng; ghi `VERIFIED`, `ASSUMED`, `UNKNOWN`.
3. **Plan & approve:** nếu sửa code/DB/infra, cung cấp file manifest, API contracts, test matrix, rollbacks; chỉ tiếp tục khi bạn duyệt.
4. **Implement:** Claude tạo các file đủ nội dung theo manifest; không tự sửa file ngoài scope.
5. **Verify:** chạy lệnh phù hợp (`npm test`, lint, typecheck, integration, smoke); cung cấp exit codes/log redacted; mục không chạy đánh dấu `NOT VERIFIED`.
6. **Review chéo theo rủi ro:** auth, concurrency, orders, tool authorization, secrets, CI/CD và release gates. Thông tin reviewer gồm base SHA, diff, source, tests, scope, expected behavior.
7. **Handoff:** ghi commit SHA, paths, trạng thái acceptance, blocker và artifact của ngày sau.

## A3. Full-file output contract — yêu cầu bắt buộc khi AI tạo file

> **Không phải copy nguyên hàng trăm file vào mỗi prompt.** Đây là một contract bất biến; trong từng prompt của 84 ngày, phần `FILE MANIFEST` liệt kê đường dẫn và yêu cầu rõ cung cấp đầy đủ nội dung từng file. Đây cũng là cách tránh duplicate dài dòng của bản PDF trước.

**AI phải trả lời theo cấu trúc:**

````text
FILE MANIFEST
- <path 1>: CREATE | MODIFY | DELETE | UNCHANGED; lý do
- <path 2>: CREATE | MODIFY | DELETE | UNCHANGED; lý do

FILE CONTENTS — COMPLETE (chỉ CREATE/MODIFY)
### FILE: <path 1>
```<language>
<100% NỘI DUNG CUỐI CÙNG CỦA FILE 1: tất cả imports, exports, cấu hình, handlers, tests>
```
### FILE: <path 2>
```<language>
<100% NỘI DUNG CUỐI CÙNG CỦA FILE 2>
```

COMMANDS & EVIDENCE
- command, cwd, environment, exit code, 3-10 dòng output đã redact
- test coverage/cases; skipped tests hoặc blocked dependencies

GIT DIFF SUMMARY
- changed file paths, reason, migration impact, rollback/undo

UNVERIFIED / RISKS / APPROVAL NEEDED
- điều chưa chạy; assumption; permission cần duyệt
````

**Không chấp nhận** `TODO`, `FIXME`, `...`, `// implement later`, `same as above`, partial file, chỉ trả diff mà không có final file, thiếu test assertions, missing imports, sử dụng API/model name chưa xác minh, fake tool results. Với file không tồn tại trong repo, phải ghi `NOT FOUND` và hỏi nếu vị trí là bắt buộc; không lén tạo file với tên ngẫu nhiên.

**Ngoại lệ thực tế:** Với repo lớn, AI có thể **tạo file thật trong worktree**, sau đó cung cấp danh sách file + commit SHA + đường dẫn + lệnh xuất toàn bộ file để bạn kiểm tra; yêu cầu “full file” được thỏa mãn bằng các file nguyên vẹn trên đĩa, không nhất thiết nhét hàng nghìn dòng vào một câu trả lời chat. Phải có cách xem/copy nội dung *từng file* mà không bỏ sót file.

### A3.1. Bộ lệnh kiểm tra file đầy đủ

```bash
git status --short
git diff --check
git diff --name-status
git diff --stat
# Đọc file hiện có:
# sed -n '1,240p' path/to/file; lặp lại các khoảng đến hết file
# Nếu file dài, dùng IDE để mở nội dung đầy đủ, không chỉ đọc một phần.
```

**Nếu đầu ra bị giới hạn context:** yêu cầu AI xuất tuần tự theo `FILE MANIFEST`, tối đa 1–3 file mỗi lần; mỗi file gửi nguyên từ dòng đầu đến dòng cuối, rồi mới chuyển file kế tiếp. Không coi câu trả lời bị cắt là đầy đủ.

## A4. Prompt khởi động repository (dùng một lần)

```text
Role: Principal engineer / AI coding operator.
Repository: hiện tại, chỉ dùng fact kiểm chứng từ source.
Rules: READ-ONLY trước approval; no secrets; no production; no destructive migration.
FIRST OUTPUT: tree thực tế + package scripts + tests + risk matrix.
SECOND OUTPUT: danh sách artifacts dự kiến và plan từng bước.
IMPLEMENTATION: chỉ khi được approve; tạo/sửa file theo FILE MANIFEST của ngày học; áp dụng A3 Full-file output contract.
VERIFICATION: báo command, exit code, evidence, skipped/blocked, diff.
STOP: khi thiếu quyết định về auth, data safety, API break, external provider billing.
```

## A5. Hướng dẫn xác minh mà không phải tự code

- **Task READ-ONLY:** chỉ cần báo cáo nguồn, file paths, trước/sau `git status` không đổi. Không bắt agent tự tạo tests.
- **Task PLAN:** nộp hợp đồng, ADR, alternatives và risks; source code chưa được phép sửa.
- **Task IMPLEMENT:** file thực tế + tests, kiểm chứng khả năng chạy, output mẫu đã quan sát; code không đúng scope phải rollback an toàn.
- **Task GATE:** chứng cứ từ CI, logs, staging, eval datasets, benchmarks, security. Không tự ghi PASS nếu không có chứng cứ.

## A6. Prompt xử lý lỗi chung (chỉ dùng khi gặp lỗi)

```text
STOP new features. Nhận các bằng chứng sau: exact command, stderr/stdout (redacted), exit code, changed files, environment, git SHA.
Phân nhóm lỗi: dependency / TypeScript / runtime / contract / database / permission / flaky test.
Chỉ đề xuất một nguyên nhân có chứng cứ, một thay đổi nhỏ nhất, một regression test và cách rollback.
Trước khi sửa, trình bày file manifest; sau duyệt, xuất nguyên file mới theo A3 và chạy lại test gây lỗi + regression suite.
Nếu không thể chạy thử, ghi NOT VERIFIED và cách tái hiện cho tôi.
```


---

# Phần B — Bản đồ 12 tuần

| Tuần | Trọng tâm | Reference | Bằng chứng qua gate |
|---|---|---|---|
| [01](#week-01) | Claude Code Foundations | [Tài liệu chính thức](https://code.claude.com/docs/en/overview) | Không cho agent ghi file trong bài khảo sát; đầu tiên tạo repo map và rules. |
| [02](#week-02) | Skills, Hooks, Subagents, Reviews | [Tài liệu chính thức](https://code.claude.com/docs/en/skills) | Thử nghiệm trên sandbox; không coi hook hay skill là security boundary. |
| [03](#week-03) | Multi-model orchestration | [Tài liệu chính thức](https://developers.openai.com/codex) | Review độc lập phải nhìn code, diff, test evidence; chi phí có budget. |
| [04](#week-04) | Architecture with AI | [Tài liệu chính thức](https://docs.nestjs.com/) | PRD, ADR, OpenAPI, ERD và threat model phải nhất quán. |
| [05](#week-05) | NestJS backend by AI | [Tài liệu chính thức](https://docs.nestjs.com/fundamentals/testing) | Order + inventory chịu test DB concurrency thật trước gate. |
| [06](#week-06) | Next.js frontend by AI | [Tài liệu chính thức](https://nextjs.org/docs) | Browser E2E phải chạy against staging/mock deterministic. |
| [07](#week-07) | LLM APIs and Gateway | [Tài liệu chính thức](https://platform.openai.com/docs/api-reference/responses) | Có mock contract + live smoke được gắn nhãn riêng. |
| [08](#week-08) | RAG, MCP and access control | [Tài liệu chính thức](https://modelcontextprotocol.io/docs/getting-started/intro) | Nguồn, quyền tenant và provenance kiểm tra trước trả lời. |
| [09](#week-09) | Durable agents | [Tài liệu chính thức](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | Bảo vệ side effects và approval bên ngoài model. |
| [10](#week-10) | Evals, Security, Quality | [Tài liệu chính thức](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | P0/P1 blocking, quality measurement có nguồn/định nghĩa. |
| [11](#week-11) | DevOps and staged delivery | [Tài liệu chính thức](https://docs.github.com/en/actions) | CI staging evidence, không cho phép automation deploy production. |
| [12](#week-12) | Final capstone | [Tài liệu chính thức](https://docs.nestjs.com/) | Tách thành công demo, staging validation và production capability. |


### Chuỗi dependencies của capstone

```text
Tuần 01–02: repo map → CLAUDE.md → tests/review workflow
Tuần 03–04: multi-model scorecard → PRD/ADR/OpenAPI/ERD/event contracts
Tuần 05–06: NestJS backend → Next.js frontend → E2E checkout
Tuần 07–08: AI Gateway → tool calling → ingestion/RAG → MCP boundary
Tuần 09–10: durable agent workflow → evals → security gates
Tuần 11–12: staging delivery → rehearsed recovery → demo/release dossier
```

**Cách hiểu `file manifest`:** các đường dẫn ở mỗi ngày là *artifact đề xuất* cho repo capstone lý tưởng. Nếu repo bạn đã có `ecom-system` với tên file khác, Claude phải mapping file hiện hữu trước, ghi mapping vào `docs/learning/day-XX.md` và xin duyệt; không tự tạo trùng lặp.

---

