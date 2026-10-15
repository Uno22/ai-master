# TUẦN 12 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 12 — Final capstone
> **Gate:** Tách thành công demo, staging validation và production capability.  
> **Official docs:** https://docs.nestjs.com/
**Chọn ngày học:** [Ngày 78](#day-78) · [Ngày 79](#day-79) · [Ngày 80](#day-80) · [Ngày 81](#day-81) · [Ngày 82](#day-82) · [Ngày 83](#day-83) · [Ngày 84](#day-84)

<a id="day-78"></a>

### Ngày 78 — Architecture freeze

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Freeze khóa contracts/releases scopes trước capstone; chỉ sửa nếu có change request và regression tests. Điều này tránh model liên tục “cải tiến” không kiểm soát.

**Vì sao phải học:** Yêu cầu AI lập inventory artifacts và phát hiện drift giữa OpenAPI, Prisma/Sequelize models, frontend clients, MCP tools và prompt schemas.

**Quy tắc phải tự giải thích được:** Freeze exceptions require change request. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Refactor dữ liệu giữa demo chỉ vì AI đề xuất “kiến trúc đẹp hơn”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-77.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Freeze captures API/event/prompt schema version and owner. Cân nhắc trường hợp lỗi `Refactor dữ liệu giữa demo chỉ vì AI đề xuất “kiến trúc đẹp hơn”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/release/freeze.md` và `docs/learning/day-78.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/release/freeze.md`
- `docs/release/contract-drift.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 78 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 78: Architecture freeze
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-77.md` đã duyệt
MỤC TIÊU: Yêu cầu AI lập inventory artifacts và phát hiện drift giữa OpenAPI, Prisma/Sequelize models, frontend clients, MCP tools và prompt schemas.

YÊU CẦU RIÊNG:
So sánh thực tế repo với PRD/ADRs/OpenAPI: list contract drift, status unresolved, acceptable breaking changes và release blockers. Tạo `docs/freeze.md` khóa API v1 schema, event versions, prompt registry và eval data. Không âm thầm đổi architecture.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/release/freeze.md
  2. docs/release/contract-drift.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Freeze captures API/event/prompt schema version and owner
QUY TẮC QUYẾT ĐỊNH: Freeze exceptions require change request
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Freeze captures API/event/prompt schema version and owner.
- **Luận cứ để chọn thiết kế:** Freeze exceptions require change request.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Refactor dữ liệu giữa demo chỉ vì AI đề xuất “kiến trúc đẹp hơn”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Refactor dữ liệu giữa demo chỉ vì AI đề xuất “kiến trúc đẹp hơn”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 79 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Architecture freeze dùng để làm gì?

<details><summary>Xem đáp án</summary>

Hạn chế scope creep và làm testing/release có baseline ổn định.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Freeze captures API/event/prompt schema version and owner.
- [ ] Lỗi `Refactor dữ liệu giữa demo chỉ vì AI đề xuất “kiến trúc đẹp hơn”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 78 đã được lưu.

<a id="day-79"></a>

### Ngày 79 — End-to-end integration

> **90–150 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

E2E capstone chứng minh hành vi người dùng xuyên Next.js/NestJS/DB/Kafka/AI tools; integration cần mock paid APIs và bounded live smoke.

**Vì sao phải học:** Claude chạy flow buyer signup→catalog→cart→COD order→AI order status; thu traces/screenshots, đối chiếu DB.

**Quy tắc phải tự giải thích được:** A mock-only run is not evidence of live-provider integration. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Test chỉ UI text “success” mà không xác thực database/order state. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-78.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Buyer checkout→order lookup→AI FAQ works across services. Cân nhắc trường hợp lỗi `Test chỉ UI text “success” mà không xác thực database/order state`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `tests/e2e/commerce-ai-flow.spec.ts` và `docs/learning/day-79.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `tests/e2e/commerce-ai-flow.spec.ts`
- `docs/reports/e2e-capstone.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 79 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 79: End-to-end integration
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-78.md` đã duyệt
MỤC TIÊU: Claude chạy flow buyer signup→catalog→cart→COD order→AI order status; thu traces/screenshots, đối chiếu DB.

YÊU CẦU RIÊNG:
Chạy 5 scripted journeys trên staging fixtures: buyer checkout, out-of-stock, expired session, AI FAQ citation, cross-user order denial. Lưu screenshots, trace IDs, DB snapshots đã redact và failure evidence.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. tests/e2e/commerce-ai-flow.spec.ts
  2. docs/reports/e2e-capstone.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Buyer checkout→order lookup→AI FAQ works across services
QUY TẮC QUYẾT ĐỊNH: A mock-only run is not evidence of live-provider integration
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Buyer checkout→order lookup→AI FAQ works across services.
- **Luận cứ để chọn thiết kế:** A mock-only run is not evidence of live-provider integration.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Test chỉ UI text “success” mà không xác thực database/order state` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Test chỉ UI text “success” mà không xác thực database/order state`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 80 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Cần bao nhiêu lớp assertions cho checkout?

<details><summary>Xem đáp án</summary>

Ít nhất browser, HTTP/API, persistence và asynchronous event state nếu được dùng.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Buyer checkout→order lookup→AI FAQ works across services.
- [ ] Lỗi `Test chỉ UI text “success” mà không xác thực database/order state` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 79 đã được lưu.

<a id="day-80"></a>

### Ngày 80 — Bug bash và hardening

> **90–150 phút · GATE · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Bug bash chủ động tạo edge cases dưới tải, input xấu, network failure; severity theo impact/reproduction. Hardening ưu tiên bugs, không ưu tiên polish.

**Vì sao phải học:** Cho Claude/Codex tìm lỗi đa tenant, duplicate clicks, malformed requests, network partitions, stale cache; chỉ fix lỗi confirmed.

**Quy tắc phải tự giải thích được:** No silent broad refactoring during final hardening. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Thêm features mới trong bug bash khiến phạm vi không kiểm soát. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-79.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Every P1 fix has reproduction and regression test. Cân nhắc trường hợp lỗi `Thêm features mới trong bug bash khiến phạm vi không kiểm soát`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/bug-bash.md` và `docs/learning/day-80.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/bug-bash.md`
- `docs/reports/regression-closure.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 80 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 80: Bug bash và hardening
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-79.md` đã duyệt
MỤC TIÊU: Cho Claude/Codex tìm lỗi đa tenant, duplicate clicks, malformed requests, network partitions, stale cache; chỉ fix lỗi confirmed.

YÊU CẦU RIÊNG:
Tạo bug bash charter 20 scenarios: rapid checkout, retry, network timeout, invalid UTF-8/user input, stale stock, expired token, malformed tool result. Triage issues theo severity và đề xuất minimal patches.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/bug-bash.md
  2. docs/reports/regression-closure.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Every P1 fix has reproduction and regression test
QUY TẮC QUYẾT ĐỊNH: No silent broad refactoring during final hardening
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Every P1 fix has reproduction and regression test.
- **Luận cứ để chọn thiết kế:** No silent broad refactoring during final hardening.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Thêm features mới trong bug bash khiến phạm vi không kiểm soát` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Thêm features mới trong bug bash khiến phạm vi không kiểm soát`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 81 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao fix cần regression test?

<details><summary>Xem đáp án</summary>

Để lỗi tương tự không quay lại khi refactor/AI thay đổi code.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Every P1 fix has reproduction and regression test.
- [ ] Lỗi `Thêm features mới trong bug bash khiến phạm vi không kiểm soát` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 80 đã được lưu.

<a id="day-81"></a>

### Ngày 81 — Performance tuning

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Chỉ tối ưu từ profiler/traces/EXPLAIN và load profile; cache, batching và pool tuning đều có tradeoff. Số concurrent users không suy từ benchmark một máy.

**Vì sao phải học:** AI phân tích top 3 bottlenecks, thay đổi từng cái, benchmark trước/sau, giữ correctness gates.

**Quy tắc phải tự giải thích được:** Never claim speedup from unmatched test environments. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tăng pool size vô hạn làm DB quá tải; dùng cache che bug consistency. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-80.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Optimization compares same scenario before and after. Cân nhắc trường hợp lỗi `Tăng pool size vô hạn làm DB quá tải; dùng cache che bug consistency`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/performance-optimization.md` và `docs/learning/day-81.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/performance-optimization.md`
- `infra/load/benchmark.js`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 81 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 81: Performance tuning
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-80.md` đã duyệt
MỤC TIÊU: AI phân tích top 3 bottlenecks, thay đổi từng cái, benchmark trước/sau, giữ correctness gates.

YÊU CẦU RIÊNG:
Từ k6 results, DB EXPLAIN, metrics, hãy chọn tối đa 3 bottlenecks có dữ liệu. Đề xuất tối ưu index/N+1, Redis, worker concurrency hoặc LLM batching; mỗi thay đổi có baseline và acceptance threshold.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/performance-optimization.md
  2. infra/load/benchmark.js

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Optimization compares same scenario before and after
QUY TẮC QUYẾT ĐỊNH: Never claim speedup from unmatched test environments
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Optimization compares same scenario before and after.
- **Luận cứ để chọn thiết kế:** Never claim speedup from unmatched test environments.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tăng pool size vô hạn làm DB quá tải; dùng cache che bug consistency` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tăng pool size vô hạn làm DB quá tải; dùng cache che bug consistency`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 82 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao phải benchmark cùng workload?

<details><summary>Xem đáp án</summary>

Để phân biệt tác động change với biến động traffic/hạ tầng.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Optimization compares same scenario before and after.
- [ ] Lỗi `Tăng pool size vô hạn làm DB quá tải; dùng cache che bug consistency` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 81 đã được lưu.

<a id="day-82"></a>

### Ngày 82 — Security & reliability signoff

> **90–150 phút · GATE · AI: Claude Code + human security owner · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Sign-off là quyết định có người chịu trách nhiệm dựa trên evidence; một AI không thể thay bảo đảm tuân thủ pháp lý và kiểm thử chuyên môn. Stop nếu có auth bypass/secret exposure/data integrity risk.

**Vì sao phải học:** AI compile release dossier: threats, scans, evals, load report, known vulnerabilities và owners; reviewer khác kiểm tra claims.

**Quy tắc phải tự giải thích được:** AI can recommend but cannot sign off as accountable human. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tự động đánh dấu “approved production” vì score cao. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-81.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + human security owner. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Signoff lists unresolved risk owner and explicit NO-GO reasons. Cân nhắc trường hợp lỗi `Tự động đánh dấu “approved production” vì score cao`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/release/security-signoff.md` và `docs/learning/day-82.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/release/security-signoff.md`
- `docs/release/reliability-signoff.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 82 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 82: Security & reliability signoff
CÔNG CỤ: Claude Code + human security owner | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-81.md` đã duyệt
MỤC TIÊU: AI compile release dossier: threats, scans, evals, load report, known vulnerabilities và owners; reviewer khác kiểm tra claims.

YÊU CẦU RIÊNG:
Tổng hợp security + reliability evidence từ 12 tuần: scan results, open risks, backup restore drill, AI injection eval, auth tenant tests, provider outage. Viết `release-signoff.md` có decision template NO-GO/GO với signatures để con người điền.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/release/security-signoff.md
  2. docs/release/reliability-signoff.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Signoff lists unresolved risk owner and explicit NO-GO reasons
QUY TẮC QUYẾT ĐỊNH: AI can recommend but cannot sign off as accountable human
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Signoff lists unresolved risk owner and explicit NO-GO reasons.
- **Luận cứ để chọn thiết kế:** AI can recommend but cannot sign off as accountable human.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tự động đánh dấu “approved production” vì score cao` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tự động đánh dấu “approved production” vì score cao`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 83 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Ai có quyền sign-off?

<details><summary>Xem đáp án</summary>

Người được tổ chức/owner giao trách nhiệm, không phải model.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Signoff lists unresolved risk owner and explicit NO-GO reasons.
- [ ] Lỗi `Tự động đánh dấu “approved production” vì score cao` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 82 đã được lưu.

<a id="day-83"></a>

### Ngày 83 — Documentation & demo

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Tài liệu hữu dụng là runbook có lệnh, expected output, troubleshooting và architecture diagrams có cùng version; demo phải có data fixtures an toàn.

**Vì sao phải học:** Claude tạo README onboarding, API examples, deployment/incident runbooks và script demo 10 phút; reviewer mới thử làm theo.

**Quy tắc phải tự giải thích được:** The README must not hide prerequisites or costs. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Docs copy từ AI nhưng lệnh không chạy trong repo hiện tại. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-82.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Demo runs from documented setup and sanitized seed data. Cân nhắc trường hợp lỗi `Docs copy từ AI nhưng lệnh không chạy trong repo hiện tại`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `README.md` và `docs/learning/day-83.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `README.md`
- `docs/demo-script.md`
- `docs/runbooks/operations.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 83 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 83: Documentation & demo
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-82.md` đã duyệt
MỤC TIÊU: Claude tạo README onboarding, API examples, deployment/incident runbooks và script demo 10 phút; reviewer mới thử làm theo.

YÊU CẦU RIÊNG:
Soạn docs: quickstart, repo structure, local env setup, architecture C4, provider config, migration strategy, tests, demo script với 3 persona, FAQ và rollback. Kèm demo checklist, credentials giả/placeholder.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. README.md
  2. docs/demo-script.md
  3. docs/runbooks/operations.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Demo runs from documented setup and sanitized seed data
QUY TẮC QUYẾT ĐỊNH: The README must not hide prerequisites or costs
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Demo runs from documented setup and sanitized seed data.
- **Luận cứ để chọn thiết kế:** The README must not hide prerequisites or costs.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Docs copy từ AI nhưng lệnh không chạy trong repo hiện tại` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Docs copy từ AI nhưng lệnh không chạy trong repo hiện tại`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 84 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Kiểm chứng README tốt nhất bằng cách nào?

<details><summary>Xem đáp án</summary>

Thực hiện từ môi trường sạch bởi người không viết tài liệu.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Demo runs from documented setup and sanitized seed data.
- [ ] Lỗi `Docs copy từ AI nhưng lệnh không chạy trong repo hiện tại` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 83 đã được lưu.

<a id="day-84"></a>

### Ngày 84 — Final assessment

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Portfolio đánh giá theo traceable deliverables và honesty: giải thích design tradeoffs, failures, metrics, limitations. Hệ thống chưa thử tải lớn không được quảng bá “triệu concurrent users”.

**Vì sao phải học:** Tạo capstone release pack với repo tag, demo checklist, quality scorecard, retrospective và kế hoạch 90 ngày sau khóa.

**Quy tắc phải tự giải thích được:** No claims about million concurrent users without measured test data. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** “Hoàn thành 84 ngày” bị đánh đồng với production scale đã kiểm chứng. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-83.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Final report shows checked gates, release evidence, remaining risks. Cân nhắc trường hợp lỗi `“Hoàn thành 84 ngày” bị đánh đồng với production scale đã kiểm chứng`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/release/final-assessment.md` và `docs/learning/day-84.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/release/final-assessment.md`
- `docs/release/handover.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 84 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 84: Final assessment
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-83.md` đã duyệt
MỤC TIÊU: Tạo capstone release pack với repo tag, demo checklist, quality scorecard, retrospective và kế hoạch 90 ngày sau khóa.

YÊU CẦU RIÊNG:
Tổng kiểm tra dự án qua PRD→code→tests→staging. Tạo báo cáo cuối khóa: architecture, AI tools workflow, multi-model benchmark, evaluation metrics, security scans, load profile, cost, known limitations và prioritized roadmap. Không dùng số benchmark bịa.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/release/final-assessment.md
  2. docs/release/handover.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Final report shows checked gates, release evidence, remaining risks
QUY TẮC QUYẾT ĐỊNH: No claims about million concurrent users without measured test data
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Final report shows checked gates, release evidence, remaining risks.
- **Luận cứ để chọn thiết kế:** No claims about million concurrent users without measured test data.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `“Hoàn thành 84 ngày” bị đánh đồng với production scale đã kiểm chứng` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `“Hoàn thành 84 ngày” bị đánh đồng với production scale đã kiểm chứng`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày mới trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Điều kiện tuyên bố sản phẩm có thể chạy production?

<details><summary>Xem đáp án</summary>

Có yêu cầu rõ, môi trường, kiểm chứng, sign-off và monitoring/rollback; scale claim cần load evidence.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Final report shows checked gates, release evidence, remaining risks.
- [ ] Lỗi `“Hoàn thành 84 ngày” bị đánh đồng với production scale đã kiểm chứng` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 84 đã được lưu.
