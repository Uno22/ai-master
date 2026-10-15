# TUẦN 04 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 04 — Architecture with AI
> **Gate:** PRD, ADR, OpenAPI, ERD và threat model phải nhất quán.  
> **Official docs:** https://docs.nestjs.com/
**Chọn ngày học:** [Ngày 22](#day-22) · [Ngày 23](#day-23) · [Ngày 24](#day-24) · [Ngày 25](#day-25) · [Ngày 26](#day-26) · [Ngày 27](#day-27) · [Ngày 28](#day-28)

<a id="day-22"></a>

### Ngày 22 — Product requirements và user stories

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

PRD tách problem/actors/flows/nonfunctional requirements/out-of-scope. Acceptance criteria nên viết Given-When-Then và có thể kiểm tra.

**Vì sao phải học:** Từ business e-commerce, giao Claude viết PRD cho buyer catalog/cart/checkout/admin và AI support; xác định MVP rõ ràng.

**Quy tắc phải tự giải thích được:** Reject unstated product requirements. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Trộn wish list thành scope bắt buộc và thiếu NFR. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-21.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** COD checkout is in scope; real online payments explicitly out of scope. Cân nhắc trường hợp lỗi `Trộn wish list thành scope bắt buộc và thiếu NFR`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/prd/commerce-mvp.md` và `docs/learning/day-22.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/prd/commerce-mvp.md`
- `docs/prd/user-stories.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 22 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 22: Product requirements và user stories
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-21.md` đã duyệt
MỤC TIÊU: Từ business e-commerce, giao Claude viết PRD cho buyer catalog/cart/checkout/admin và AI support; xác định MVP rõ ràng.

YÊU CẦU RIÊNG:
Hãy hỏi tôi tối đa 10 câu quyết định trước khi viết PRD, ưu tiên business critical. Sau đó soạn `docs/prd.md` với personas, in/out scope, user journeys, Given-When-Then, compliance assumptions và NFR có metric. Không tự thêm marketplace multi-seller.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/prd/commerce-mvp.md
  2. docs/prd/user-stories.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: COD checkout is in scope; real online payments explicitly out of scope
QUY TẮC QUYẾT ĐỊNH: Reject unstated product requirements
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** COD checkout is in scope; real online payments explicitly out of scope.
- **Luận cứ để chọn thiết kế:** Reject unstated product requirements.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Trộn wish list thành scope bắt buộc và thiếu NFR` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Trộn wish list thành scope bắt buộc và thiếu NFR`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 23 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Tại sao “giao diện nhanh” không đủ?

<details><summary>Xem đáp án</summary>

Không đo được; cần ngưỡng ví dụ p95 được đo dưới tải định nghĩa.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] COD checkout is in scope; real online payments explicitly out of scope.
- [ ] Lỗi `Trộn wish list thành scope bắt buộc và thiếu NFR` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 22 đã được lưu.

<a id="day-23"></a>

### Ngày 23 — System boundaries và C4

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

C4 gồm context, containers, components; ranh giới sync/async quyết định failure modes. Modular monolith thường là điểm khởi đầu hợp lý trước khi chia microservices nếu chưa có bằng chứng.

**Vì sao phải học:** Claude tạo C4 context/container cho platform bao gồm NestJS, Next.js, MySQL, Redis, Kafka, LLM Gateway; giải thích trust boundaries.

**Quy tắc phải tự giải thích được:** A component diagram is a hypothesis until grounded in repo. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Vẽ “mọi module thành microservice” mà không có deploy/ops plan. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-22.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Show Next.js, NestJS, MySQL, Redis, Kafka, external LLM trust boundaries. Cân nhắc trường hợp lỗi `Vẽ “mọi module thành microservice” mà không có deploy/ops plan`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/architecture/context-diagram.mmd` và `docs/learning/day-23.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/architecture/context-diagram.mmd`
- `docs/architecture/system-boundaries.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 23 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 23: System boundaries và C4
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-22.md` đã duyệt
MỤC TIÊU: Claude tạo C4 context/container cho platform bao gồm NestJS, Next.js, MySQL, Redis, Kafka, LLM Gateway; giải thích trust boundaries.

YÊU CẦU RIÊNG:
Từ PRD, tạo C4 context/container Mermaid, quyết định modular monolith vs microservices dựa trên current team=1, consistency, scale goals và ops burden. Ghi rõ data stores, external LLMs, human approval và trust zones. Không giả định Kafka là bắt buộc cho mọi request.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/architecture/context-diagram.mmd
  2. docs/architecture/system-boundaries.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Show Next.js, NestJS, MySQL, Redis, Kafka, external LLM trust boundaries
QUY TẮC QUYẾT ĐỊNH: A component diagram is a hypothesis until grounded in repo
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Show Next.js, NestJS, MySQL, Redis, Kafka, external LLM trust boundaries.
- **Luận cứ để chọn thiết kế:** A component diagram is a hypothesis until grounded in repo.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Vẽ “mọi module thành microservice” mà không có deploy/ops plan` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Vẽ “mọi module thành microservice” mà không có deploy/ops plan`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 24 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** C4 container khác component?

<details><summary>Xem đáp án</summary>

Container mô tả ứng dụng/storage chạy độc lập; component mô tả cấu phần bên trong container.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Show Next.js, NestJS, MySQL, Redis, Kafka, external LLM trust boundaries.
- [ ] Lỗi `Vẽ “mọi module thành microservice” mà không có deploy/ops plan` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 23 đã được lưu.

<a id="day-24"></a>

### Ngày 24 — API-first design

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

OpenAPI là contract giữa frontend, backend và agents; compatibility phải kiểm schema, errors, pagination và auth. Response không xác định khiến AI tự tạo frontend không khớp API.

**Vì sao phải học:** Thiết kế OpenAPI cho login, product list, inventory availability và order create; sinh mocks và contract test proposals.

**Quy tắc phải tự giải thích được:** Breaking changes require explicit versioning decision. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Copied API examples bị lệch tên field khiến Next.js agent tự đoán. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-23.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** POST /orders responses document 201, 400, 401, 409. Cân nhắc trường hợp lỗi `Copied API examples bị lệch tên field khiến Next.js agent tự đoán`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/contracts/openapi.yaml` và `docs/learning/day-24.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/contracts/openapi.yaml`
- `docs/contracts/api-compatibility.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 24 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 24: API-first design
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-23.md` đã duyệt
MỤC TIÊU: Thiết kế OpenAPI cho login, product list, inventory availability và order create; sinh mocks và contract test proposals.

YÊU CẦU RIÊNG:
Đọc PRD, viết OpenAPI 3.1 hoặc phiên bản phù hợp tooling, cho 4 endpoints: methods, auth, DTO schemas, response errors, pagination examples. Dùng một naming convention và `Idempotency-Key` cho create order nếu được duyệt. Đề xuất mock server/test trước coding.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/contracts/openapi.yaml
  2. docs/contracts/api-compatibility.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: POST /orders responses document 201, 400, 401, 409
QUY TẮC QUYẾT ĐỊNH: Breaking changes require explicit versioning decision
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** POST /orders responses document 201, 400, 401, 409.
- **Luận cứ để chọn thiết kế:** Breaking changes require explicit versioning decision.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Copied API examples bị lệch tên field khiến Next.js agent tự đoán` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Copied API examples bị lệch tên field khiến Next.js agent tự đoán`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 25 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao API contract cần trước khi giao frontend cho agent?

<details><summary>Xem đáp án</summary>

Để hạn chế drift schema, errors và auth giữa hai codebases.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] POST /orders responses document 201, 400, 401, 409.
- [ ] Lỗi `Copied API examples bị lệch tên field khiến Next.js agent tự đoán` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 24 đã được lưu.

<a id="day-25"></a>

### Ngày 25 — Database design với AI

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Data model cần constraints và indexes rõ; concurrency và idempotency cần nguồn sự thật bền vững. Không coi cache là transaction log.

**Vì sao phải học:** Giao AI tạo ERD users/products/product_items/orders/order_items/inventory_reservations, migration plan và index reasoning.

**Quy tắc phải tự giải thích được:** Document database constraints, not just ERD lines. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tạo schema đẹp nhưng không có constraints chống duplicate và orphan rows. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-24.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Unique order idempotency key; inventory quantity>=reservedQuantity. Cân nhắc trường hợp lỗi `Tạo schema đẹp nhưng không có constraints chống duplicate và orphan rows`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/data/commerce-erd.mmd` và `docs/learning/day-25.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/data/commerce-erd.mmd`
- `docs/data/constraints.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 25 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 25: Database design với AI
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-24.md` đã duyệt
MỤC TIÊU: Giao AI tạo ERD users/products/product_items/orders/order_items/inventory_reservations, migration plan và index reasoning.

YÊU CẦU RIÊNG:
Thiết kế Sequelize/MySQL 8 entities, keys, cardinality, unique constraints, timestamps, indexes cho catalog query và idempotency. Mô tả zero-downtime migration và backfill nếu repo có dữ liệu. Không chạy migration.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/data/commerce-erd.mmd
  2. docs/data/constraints.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Unique order idempotency key; inventory quantity>=reservedQuantity
QUY TẮC QUYẾT ĐỊNH: Document database constraints, not just ERD lines
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Unique order idempotency key; inventory quantity>=reservedQuantity.
- **Luận cứ để chọn thiết kế:** Document database constraints, not just ERD lines.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tạo schema đẹp nhưng không có constraints chống duplicate và orphan rows` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tạo schema đẹp nhưng không có constraints chống duplicate và orphan rows`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 26 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao reservation cần record độc lập?

<details><summary>Xem đáp án</summary>

Audit, idempotent response, release và crash recovery.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Unique order idempotency key; inventory quantity>=reservedQuantity.
- [ ] Lỗi `Tạo schema đẹp nhưng không có constraints chống duplicate và orphan rows` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 25 đã được lưu.

<a id="day-26"></a>

### Ngày 26 — Event-driven design

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

DB transaction và Kafka publish không tự tạo một atomic transaction chung; outbox pattern giảm dual-write gap. Consumers cần idempotency và DLQ strategy.

**Vì sao phải học:** Phân tích luồng order-created, inventory-reserved, order-failed; đề xuất outbox and consumer retry policy.

**Quy tắc phải tự giải thích được:** Outbox prevents DB+broker dual-write gap when implemented properly. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Nhầm Kafka at-least-once với exactly-once business processing. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-25.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Event has eventId, aggregateId, version, occurredAt, payload. Cân nhắc trường hợp lỗi `Nhầm Kafka at-least-once với exactly-once business processing`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/events/order-started.schema.json` và `docs/learning/day-26.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/events/order-started.schema.json`
- `docs/adr/0002-outbox.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 26 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 26: Event-driven design
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-25.md` đã duyệt
MỤC TIÊU: Phân tích luồng order-created, inventory-reserved, order-failed; đề xuất outbox and consumer retry policy.

YÊU CẦU RIÊNG:
Dựa trên entities và Kafka topology đã xác minh, thiết kế events kèm schema version, eventId, correlationId, aggregateId, timestamps; phân tích outbox, idempotent consumer, retry/DLQ và compensation. Đưa sequence diagrams của happy/fail flows.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/events/order-started.schema.json
  2. docs/adr/0002-outbox.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Event has eventId, aggregateId, version, occurredAt, payload
QUY TẮC QUYẾT ĐỊNH: Outbox prevents DB+broker dual-write gap when implemented properly
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Event has eventId, aggregateId, version, occurredAt, payload.
- **Luận cứ để chọn thiết kế:** Outbox prevents DB+broker dual-write gap when implemented properly.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Nhầm Kafka at-least-once với exactly-once business processing` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Nhầm Kafka at-least-once với exactly-once business processing`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 27 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Outbox giải bài toán gì?

<details><summary>Xem đáp án</summary>

Tránh mất event giữa commit database và publish không atomic.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Event has eventId, aggregateId, version, occurredAt, payload.
- [ ] Lỗi `Nhầm Kafka at-least-once với exactly-once business processing` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 26 đã được lưu.

<a id="day-27"></a>

### Ngày 27 — Threat modeling

> **120–180 phút · PLAN · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Threat model xác định assets, actors, trust boundaries, abuse paths, controls và residual risk; AI-specific threats gồm prompt injection, exfiltration và unsafe tool use.

**Vì sao phải học:** Claude phân tích STRIDE cho login, checkout và AI tool access; ưu tiên 5 rủi ro có hành động giảm thiểu.

**Quy tắc phải tự giải thích được:** Do not treat prompt instructions as an auth boundary. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chỉ yêu cầu model “hãy an toàn” và coi như authorization đã được enforce. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-26.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Unauthorized tenant read and exposed prompt logs are explicit threats. Cân nhắc trường hợp lỗi `Chỉ yêu cầu model “hãy an toàn” và coi như authorization đã được enforce`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/security/threat-model.md` và `docs/learning/day-27.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/security/threat-model.md`
- `docs/security/data-flow.mmd`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 27 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 27: Threat modeling
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-26.md` đã duyệt
MỤC TIÊU: Claude phân tích STRIDE cho login, checkout và AI tool access; ưu tiên 5 rủi ro có hành động giảm thiểu.

YÊU CẦU RIÊNG:
Từ C4 và PRD, viết threat model cho browser→API, API→DB, API→LLM, agent→tools. Nêu trust boundary, attack vector, impact, mitigations, owner và security acceptance tests. Tách user input khỏi instructions trusted.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/security/threat-model.md
  2. docs/security/data-flow.mmd

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Unauthorized tenant read and exposed prompt logs are explicit threats
QUY TẮC QUYẾT ĐỊNH: Do not treat prompt instructions as an auth boundary
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Unauthorized tenant read and exposed prompt logs are explicit threats.
- **Luận cứ để chọn thiết kế:** Do not treat prompt instructions as an auth boundary.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chỉ yêu cầu model “hãy an toàn” và coi như authorization đã được enforce` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chỉ yêu cầu model “hãy an toàn” và coi như authorization đã được enforce`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 28 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Prompt injection nguy hiểm nhất tại đâu?

<details><summary>Xem đáp án</summary>

Khi untrusted content bị nâng thành instruction hoặc được dùng quyết định tool permissions.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Unauthorized tenant read and exposed prompt logs are explicit threats.
- [ ] Lỗi `Chỉ yêu cầu model “hãy an toàn” và coi như authorization đã được enforce` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 27 đã được lưu.

<a id="day-28"></a>

### Ngày 28 — Architecture review gate

> **120–180 phút · GATE · AI: Claude Code + reviewer độc lập · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Architecture gate kiểm quyết định liên kết PRD↔API↔DB↔events↔security; reviewer cần đưa critical blockers có chứng cứ.

**Vì sao phải học:** Dùng Codex hoặc Gemini (nếu có) review ADR, OpenAPI, ERD, Kafka contracts; đóng open decisions trước triển khai.

**Quy tắc phải tự giải thích được:** No IMPLEMENT until P0 architecture contradictions resolved. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Cho phép coding agent triển khai dựa trên contracts mâu thuẫn nhau. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-27.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + reviewer độc lập. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Architecture gate records open decisions, rejected options and owner. Cân nhắc trường hợp lỗi `Cho phép coding agent triển khai dựa trên contracts mâu thuẫn nhau`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/architecture/architecture-review.md` và `docs/learning/day-28.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/architecture/architecture-review.md`
- `docs/learning/week-04-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 28 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 28: Architecture review gate
CÔNG CỤ: Claude Code + reviewer độc lập | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-27.md` đã duyệt
MỤC TIÊU: Dùng Codex hoặc Gemini (nếu có) review ADR, OpenAPI, ERD, Kafka contracts; đóng open decisions trước triển khai.

YÊU CẦU RIÊNG:
Đóng vai architecture reviewer độc lập. Đọc PRD, C4, OpenAPI, ERD, event schemas, threat model. Tạo traceability matrix; tìm mismatches có bằng chứng từ file/section, đánh dấu blocker vs improvement và test cần có. Không sửa code.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/architecture/architecture-review.md
  2. docs/learning/week-04-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Architecture gate records open decisions, rejected options and owner
QUY TẮC QUYẾT ĐỊNH: No IMPLEMENT until P0 architecture contradictions resolved
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Architecture gate records open decisions, rejected options and owner.
- **Luận cứ để chọn thiết kế:** No IMPLEMENT until P0 architecture contradictions resolved.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Cho phép coding agent triển khai dựa trên contracts mâu thuẫn nhau` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Cho phép coding agent triển khai dựa trên contracts mâu thuẫn nhau`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 29 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào nên stop architecture gate?

<details><summary>Xem đáp án</summary>

Khi thiếu business decisions hoặc blockers về auth/data consistency.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Architecture gate records open decisions, rejected options and owner.
- [ ] Lỗi `Cho phép coding agent triển khai dựa trên contracts mâu thuẫn nhau` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 28 đã được lưu.

<a id="week-05"></a>
