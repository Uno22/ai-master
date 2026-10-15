# TUẦN 05 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 05 — NestJS backend by AI
> **Gate:** Order + inventory chịu test DB concurrency thật trước gate.  
> **Official docs:** https://docs.nestjs.com/fundamentals/testing
**Chọn ngày học:** [Ngày 29](#day-29) · [Ngày 30](#day-30) · [Ngày 31](#day-31) · [Ngày 32](#day-32) · [Ngày 33](#day-33) · [Ngày 34](#day-34) · [Ngày 35](#day-35)

<a id="day-29"></a>

### Ngày 29 — Scaffold NestJS có kiểm soát

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Scaffold tạo bộ khung, không đảm bảo kiến trúc đúng. Dependency versions, tsconfig, build scripts và DI tokens phải khớp toolchain thực tế.

**Vì sao phải học:** Giao Claude Code tạo monorepo Nx/Turborepo hoặc npm workspaces sau khi đánh giá tradeoff; modules ban đầu và test skeleton.

**Quy tắc phải tự giải thích được:** Respect existing monorepo; do not scaffold duplicate app. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** AI xóa code hiện có để làm scaffolding “sạch”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-28.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** A NestJS server exposes a local health route under selected API prefix. Cân nhắc trường hợp lỗi `AI xóa code hiện có để làm scaffolding “sạch”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/package.json` và `docs/learning/day-29.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/src/main.ts`
- `apps/api/src/app.module.ts`
- `apps/api/src/health.controller.ts`
- `apps/api/test/health.e2e-spec.ts`
- `apps/api/.env.example`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 29 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 29: Scaffold NestJS có kiểm soát
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-28.md` đã duyệt
MỤC TIÊU: Giao Claude Code tạo monorepo Nx/Turborepo hoặc npm workspaces sau khi đánh giá tradeoff; modules ban đầu và test skeleton.

YÊU CẦU RIÊNG:
Hãy đọc repo hiện có và đề xuất scaffold mở rộng thay vì rewrite. Tạo `apps/api`, `apps/web`, `packages/contracts`, `packages/evals`, `infra` nếu chưa tồn tại; chọn workspace tool dựa trên hiện trạng. Đưa lockfile và commands; xin approval trước khi cài.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/package.json
  2. apps/api/tsconfig.json
  3. apps/api/src/main.ts
  4. apps/api/src/app.module.ts
  5. apps/api/src/health.controller.ts
  6. apps/api/test/health.e2e-spec.ts
  7. apps/api/.env.example

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: A NestJS server exposes a local health route under selected API prefix
QUY TẮC QUYẾT ĐỊNH: Respect existing monorepo; do not scaffold duplicate app
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** A NestJS server exposes a local health route under selected API prefix.
- **Luận cứ để chọn thiết kế:** Respect existing monorepo; do not scaffold duplicate app.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `AI xóa code hiện có để làm scaffolding “sạch”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `AI xóa code hiện có để làm scaffolding “sạch”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 30 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào không nên scaffold lại?

<details><summary>Xem đáp án</summary>

Khi đã có cấu trúc vận hành và migration cost lớn hơn lợi ích.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] A NestJS server exposes a local health route under selected API prefix.
- [ ] Lỗi `AI xóa code hiện có để làm scaffolding “sạch”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 29 đã được lưu.

<a id="day-30"></a>

### Ngày 30 — Authentication và authorization

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Authentication xác định ai, authorization xác định được làm gì; tenant isolation phải enforce trên DB/service chứ không chỉ guard UI. JWT refresh và revocation cần threat model.

**Vì sao phải học:** Yêu cầu Claude triển khai auth guard + RBAC scoped buyer/admin bằng test-first, không thay đổi token contract hiện hữu.

**Quy tắc phải tự giải thích được:** Authentication and authorization are separate decisions. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dựa vào userId trong body mà không đối chiếu principal của access token. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-29.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Unauthenticated request=401, insufficient permissions=403. Cân nhắc trường hợp lỗi `Dựa vào userId trong body mà không đối chiếu principal của access token`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/auth/auth.module.ts` và `docs/learning/day-30.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/auth/auth.module.ts`
- `apps/api/src/auth/auth.controller.ts`
- `apps/api/src/auth/auth.service.ts`
- `apps/api/src/auth/auth.guard.ts`
- `apps/api/src/auth/authz.policy.ts`
- `apps/api/test/auth.e2e-spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 30 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 30: Authentication và authorization
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-29.md` đã duyệt
MỤC TIÊU: Yêu cầu Claude triển khai auth guard + RBAC scoped buyer/admin bằng test-first, không thay đổi token contract hiện hữu.

YÊU CẦU RIÊNG:
Theo OpenAPI, implement hoặc tích hợp auth có sẵn; bảo vệ order endpoints theo owner/user và admin endpoints theo role. Giữ login/refresh behavior tương thích. Viết tests cho 401,403, cross-user resource và expired JWT.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/auth/auth.module.ts
  2. apps/api/src/auth/auth.controller.ts
  3. apps/api/src/auth/auth.service.ts
  4. apps/api/src/auth/auth.guard.ts
  5. apps/api/src/auth/authz.policy.ts
  6. apps/api/test/auth.e2e-spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Unauthenticated request=401, insufficient permissions=403
QUY TẮC QUYẾT ĐỊNH: Authentication and authorization are separate decisions
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Unauthenticated request=401, insufficient permissions=403.
- **Luận cứ để chọn thiết kế:** Authentication and authorization are separate decisions.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dựa vào userId trong body mà không đối chiếu principal của access token` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dựa vào userId trong body mà không đối chiếu principal của access token`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 31 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khác 401 và 403?

<details><summary>Xem đáp án</summary>

401 chưa xác thực hợp lệ; 403 đã xác thực nhưng không đủ quyền.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Unauthenticated request=401, insufficient permissions=403.
- [ ] Lỗi `Dựa vào userId trong body mà không đối chiếu principal của access token` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 30 đã được lưu.

<a id="day-31"></a>

### Ngày 31 — Catalog APIs

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Catalog cần filtering, sorting ổn định, query indexes và pagination giới hạn; input validation phải thống nhất OpenAPI.

**Vì sao phải học:** Cho agent implement brand/category/product list/detail, generate Swagger decorators và regression tests.

**Quy tắc phải tự giải thích được:** Pagination order must be stable on ties. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Trả items tổng thể không stable sort gây trùng/mất khi phân trang. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-30.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** GET catalog paginates deterministically, limit is bounded. Cân nhắc trường hợp lỗi `Trả items tổng thể không stable sort gây trùng/mất khi phân trang`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/catalog/catalog.module.ts` và `docs/learning/day-31.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/catalog/catalog.module.ts`
- `apps/api/src/catalog/catalog.controller.ts`
- `apps/api/src/catalog/catalog.service.ts`
- `apps/api/src/catalog/catalog.repository.ts`
- `apps/api/src/catalog/dto/catalog-query.dto.ts`
- `apps/api/test/catalog.e2e-spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 31 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 31: Catalog APIs
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-30.md` đã duyệt
MỤC TIÊU: Cho agent implement brand/category/product list/detail, generate Swagger decorators và regression tests.

YÊU CẦU RIÊNG:
Implement vertical slice Catalog từ contract: DTO, controller, service, repository, tests, query filters. Không tạo fake brands/products nếu migration/seed chưa có approval. Nêu index cho filters và stable tie-breaker sort theo id.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/catalog/catalog.module.ts
  2. apps/api/src/catalog/catalog.controller.ts
  3. apps/api/src/catalog/catalog.service.ts
  4. apps/api/src/catalog/catalog.repository.ts
  5. apps/api/src/catalog/dto/catalog-query.dto.ts
  6. apps/api/test/catalog.e2e-spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: GET catalog paginates deterministically, limit is bounded
QUY TẮC QUYẾT ĐỊNH: Pagination order must be stable on ties
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** GET catalog paginates deterministically, limit is bounded.
- **Luận cứ để chọn thiết kế:** Pagination order must be stable on ties.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Trả items tổng thể không stable sort gây trùng/mất khi phân trang` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Trả items tổng thể không stable sort gây trùng/mất khi phân trang`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 32 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao sort cần tie-breaker?

<details><summary>Xem đáp án</summary>

Khi nhiều rows có cùng giá/createdAt, thứ tự có thể bất định.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] GET catalog paginates deterministically, limit is bounded.
- [ ] Lỗi `Trả items tổng thể không stable sort gây trùng/mất khi phân trang` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 31 đã được lưu.

<a id="day-32"></a>

### Ngày 32 — Inventory concurrency

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Tồn kho khả dụng = quantity - reserved_quantity; conditional atomic UPDATE giúp tránh lost updates nhưng idempotency cần reservation record/unique key. Với MySQL phải kiểm tra transaction semantics và row count.

**Vì sao phải học:** Cho Claude triển khai reserve/release và concurrency tests bằng transaction; reviewer độc lập bắt buộc.

**Quy tắc phải tự giải thích được:** Atomic update plus unique DB key plus transaction required. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Select trước rồi update sau ở transactions tách biệt tạo over-reservation. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-31.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** 20 concurrent attempts against 5 units have at most 5 successful 1-unit reserves. Cân nhắc trường hợp lỗi `Select trước rồi update sau ở transactions tách biệt tạo over-reservation`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/inventory/inventory.module.ts` và `docs/learning/day-32.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/inventory/inventory.module.ts`
- `apps/api/src/inventory/inventory.controller.ts`
- `apps/api/src/inventory/inventory.service.ts`
- `apps/api/src/inventory/inventory.repository.ts`
- `apps/api/src/inventory/inventory-reservation.model.ts`
- `apps/api/src/inventory/dto/reserve.dto.ts`
- `apps/api/src/database/migrations/create-inventory-reservations.ts`
- `apps/api/test/inventory-concurrency.e2e-spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 32 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 32: Inventory concurrency
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-31.md` đã duyệt
MỤC TIÊU: Cho Claude triển khai reserve/release và concurrency tests bằng transaction; reviewer độc lập bắt buộc.

YÊU CẦU RIÊNG:
Implement InventoryService.reserve(productItemId, qty, idempotencyKey). Dùng atomic conditional update, reservation record có unique key, transaction và trạng thái release hợp lệ. Xử lý duplicate same payload và key collision khác payload. Tạo race test ≥20 parallel requests trên DB sandbox.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/inventory/inventory.module.ts
  2. apps/api/src/inventory/inventory.controller.ts
  3. apps/api/src/inventory/inventory.service.ts
  4. apps/api/src/inventory/inventory.repository.ts
  5. apps/api/src/inventory/inventory-reservation.model.ts
  6. apps/api/src/inventory/dto/reserve.dto.ts
  7. apps/api/src/database/migrations/create-inventory-reservations.ts
  8. apps/api/test/inventory-concurrency.e2e-spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: 20 concurrent attempts against 5 units have at most 5 successful 1-unit reserves
QUY TẮC QUYẾT ĐỊNH: Atomic update plus unique DB key plus transaction required
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** 20 concurrent attempts against 5 units have at most 5 successful 1-unit reserves.
- **Luận cứ để chọn thiết kế:** Atomic update plus unique DB key plus transaction required.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Select trước rồi update sau ở transactions tách biệt tạo over-reservation` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Select trước rồi update sau ở transactions tách biệt tạo over-reservation`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 33 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Tại sao atomic update vẫn chưa đủ?

<details><summary>Xem đáp án</summary>

Chưa xử lý idempotency key, duplicate response record và transaction với reservation state.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] 20 concurrent attempts against 5 units have at most 5 successful 1-unit reserves.
- [ ] Lỗi `Select trước rồi update sau ở transactions tách biệt tạo over-reservation` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 32 đã được lưu.

<a id="day-33"></a>

### Ngày 33 — Order orchestration

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Order lifecycle có pending/confirmed/failed/cancelled; concurrent requests, Kafka duplicate và outbox phải được xử lý thống nhất.

**Vì sao phải học:** Cho Claude implement create order COD, reserve inventory, persist order, publish event qua outbox; không bật payment thật.

**Quy tắc phải tự giải thích được:** Kafka at-least-once requires consumer idempotency. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Publish trước khi DB commit mà không có recover strategy. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-32.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Same idempotency key cannot produce duplicate orders or double-release. Cân nhắc trường hợp lỗi `Publish trước khi DB commit mà không có recover strategy`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/orders/orders.module.ts` và `docs/learning/day-33.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/orders/orders.module.ts`
- `apps/api/src/orders/orders.controller.ts`
- `apps/api/src/orders/orders.service.ts`
- `apps/api/src/orders/orders.repository.ts`
- `apps/api/src/orders/dto/create-order.dto.ts`
- `apps/api/src/orders/order-events.ts`
- `apps/api/src/database/migrations/create-outbox.ts`
- `apps/api/test/orders-retry.e2e-spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 33 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 33: Order orchestration
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-32.md` đã duyệt
MỤC TIÊU: Cho Claude implement create order COD, reserve inventory, persist order, publish event qua outbox; không bật payment thật.

YÊU CẦU RIÊNG:
Thực hiện flow COD create order theo PRD: validate cart ownership, reserve stock, write order+outbox transaction, publish asynchronously, idempotent consumer; compensation cho failure. Viết state transition tests và duplicate event replay tests.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/orders/orders.module.ts
  2. apps/api/src/orders/orders.controller.ts
  3. apps/api/src/orders/orders.service.ts
  4. apps/api/src/orders/orders.repository.ts
  5. apps/api/src/orders/dto/create-order.dto.ts
  6. apps/api/src/orders/order-events.ts
  7. apps/api/src/database/migrations/create-outbox.ts
  8. apps/api/test/orders-retry.e2e-spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Same idempotency key cannot produce duplicate orders or double-release
QUY TẮC QUYẾT ĐỊNH: Kafka at-least-once requires consumer idempotency
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Same idempotency key cannot produce duplicate orders or double-release.
- **Luận cứ để chọn thiết kế:** Kafka at-least-once requires consumer idempotency.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Publish trước khi DB commit mà không có recover strategy` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Publish trước khi DB commit mà không có recover strategy`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 34 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao cần compensation?

<details><summary>Xem đáp án</summary>

Không phải mọi bước workflow phân tán đều rollback trong một DB transaction.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Same idempotency key cannot produce duplicate orders or double-release.
- [ ] Lỗi `Publish trước khi DB commit mà không có recover strategy` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 33 đã được lưu.

<a id="day-34"></a>

### Ngày 34 — Caching và Redis

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Cache là optimization; stale data, key design và stampede ảnh hưởng kết quả. Không dùng cache để quyết định cuối cùng về stock reservation nếu thiếu consistency guarantee.

**Vì sao phải học:** Yêu cầu Claude thêm cache-aside cho catalog list/detail, TTL, invalidation khi update; benchmark hit/miss.

**Quy tắc phải tự giải thích được:** TTL is not a substitute for invalidation strategy. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Cache user-sensitive results bằng key không có user/tenant scope. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-33.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Product update invalidates stale product detail cache. Cân nhắc trường hợp lỗi `Cache user-sensitive results bằng key không có user/tenant scope`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/cache/cache.service.ts` và `docs/learning/day-34.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/cache/cache.service.ts`
- `apps/api/test/cache-invalidation.e2e-spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 34 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 34: Caching và Redis
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-33.md` đã duyệt
MỤC TIÊU: Yêu cầu Claude thêm cache-aside cho catalog list/detail, TTL, invalidation khi update; benchmark hit/miss.

YÊU CẦU RIÊNG:
Chỉ cache GET catalog; thiết kế key có filters/page/sort và scope phù hợp. TTL cấu hình được, invalidation khi product update. Không dùng cache để check-and-reserve tồn kho. Thêm tests cho stale read/hit/miss.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/cache/cache.service.ts
  2. apps/api/test/cache-invalidation.e2e-spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Product update invalidates stale product detail cache
QUY TẮC QUYẾT ĐỊNH: TTL is not a substitute for invalidation strategy
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Product update invalidates stale product detail cache.
- **Luận cứ để chọn thiết kế:** TTL is not a substitute for invalidation strategy.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Cache user-sensitive results bằng key không có user/tenant scope` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Cache user-sensitive results bằng key không có user/tenant scope`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 35 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao không tin cache cho critical stock?

<details><summary>Xem đáp án</summary>

Có thể stale khi requests đồng thời, không phải nguồn consistency authoritative.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Product update invalidates stale product detail cache.
- [ ] Lỗi `Cache user-sensitive results bằng key không có user/tenant scope` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 34 đã được lưu.

<a id="day-35"></a>

### Ngày 35 — Backend integration gate

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Integration cần end-to-end assertions dựa trên DB và events thật trong test environment; unit green không chứng minh Kafka/MySQL hoạt động chung.

**Vì sao phải học:** Cho agent xây docker-compose test dependencies, seed fixtures, workflow checkout COD và báo cáo failures; gate trước frontend.

**Quy tắc phải tự giải thích được:** No frontend integration until API contracts are verified. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chỉ fake repository ở mọi tầng và gọi đó là integration E2E. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-34.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Catalog to COD checkout returns a persistent order ID in sandbox. Cân nhắc trường hợp lỗi `Chỉ fake repository ở mọi tầng và gọi đó là integration E2E`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/backend-integration.md` và `docs/learning/day-35.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/backend-integration.md`
- `docs/learning/week-05-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 35 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 35: Backend integration gate
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-34.md` đã duyệt
MỤC TIÊU: Cho agent xây docker-compose test dependencies, seed fixtures, workflow checkout COD và báo cáo failures; gate trước frontend.

YÊU CẦU RIÊNG:
Tích hợp auth, catalog, cart, inventory, orders. Viết e2e test đăng nhập→thêm giỏ→tạo COD→reserve stock; đo database state và outbox. Chuẩn bị fixtures sandbox, không chạm production.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/backend-integration.md
  2. docs/learning/week-05-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Catalog to COD checkout returns a persistent order ID in sandbox
QUY TẮC QUYẾT ĐỊNH: No frontend integration until API contracts are verified
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Catalog to COD checkout returns a persistent order ID in sandbox.
- **Luận cứ để chọn thiết kế:** No frontend integration until API contracts are verified.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chỉ fake repository ở mọi tầng và gọi đó là integration E2E` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chỉ fake repository ở mọi tầng và gọi đó là integration E2E`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 36 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Những gì gate phải chứng minh?

<details><summary>Xem đáp án</summary>

Cross-module behavior cùng DB/events, failure path và contract stability.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Catalog to COD checkout returns a persistent order ID in sandbox.
- [ ] Lỗi `Chỉ fake repository ở mọi tầng và gọi đó là integration E2E` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 35 đã được lưu.

<a id="week-06"></a>
