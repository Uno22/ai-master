# TUẦN 06 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 06 — Next.js frontend by AI
> **Gate:** Browser E2E phải chạy against staging/mock deterministic.  
> **Official docs:** https://nextjs.org/docs
**Chọn ngày học:** [Ngày 36](#day-36) · [Ngày 37](#day-37) · [Ngày 38](#day-38) · [Ngày 39](#day-39) · [Ngày 40](#day-40) · [Ngày 41](#day-41) · [Ngày 42](#day-42)

<a id="day-36"></a>

### Ngày 36 — AI UI specification

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Frontend agent cần source of truth cho design tokens, states và a11y; screenshot không thay UI contracts. Tách flow, component responsibilities và error-state copies.

**Vì sao phải học:** Dùng AI soạn screen map buyer/admin từ PRD và OpenAPI, kèm loading, empty, error và mobile states.

**Quy tắc phải tự giải thích được:** Use realistic empty/error states, not only happy path. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chỉ thiết kế happy path desktop, bỏ mobile và lỗi API. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-35.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Buyer flow includes error states, empty cart and loading UI. Cân nhắc trường hợp lỗi `Chỉ thiết kế happy path desktop, bỏ mobile và lỗi API`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/ui/buyer-flows.md` và `docs/learning/day-36.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/ui/buyer-flows.md`
- `docs/ui/accessibility-checklist.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 36 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 36: AI UI specification
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-35.md` đã duyệt
MỤC TIÊU: Dùng AI soạn screen map buyer/admin từ PRD và OpenAPI, kèm loading, empty, error và mobile states.

YÊU CẦU RIÊNG:
Tạo `docs/ui-spec.md` cho catalog, PDP, cart, checkout, order confirmation, admin orders. Với mỗi page nêu data source contract, components, state variants, aria considerations, responsive breakpoints và visual acceptance checks. Không tạo code lúc này.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/ui/buyer-flows.md
  2. docs/ui/accessibility-checklist.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Buyer flow includes error states, empty cart and loading UI
QUY TẮC QUYẾT ĐỊNH: Use realistic empty/error states, not only happy path
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Buyer flow includes error states, empty cart and loading UI.
- **Luận cứ để chọn thiết kế:** Use realistic empty/error states, not only happy path.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chỉ thiết kế happy path desktop, bỏ mobile và lỗi API` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chỉ thiết kế happy path desktop, bỏ mobile và lỗi API`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 37 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao cần empty/error states?

<details><summary>Xem đáp án</summary>

Những trạng thái đó xuất hiện thật khi network/data không như kỳ vọng và ảnh hưởng trải nghiệm.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Buyer flow includes error states, empty cart and loading UI.
- [ ] Lỗi `Chỉ thiết kế happy path desktop, bỏ mobile và lỗi API` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 36 đã được lưu.

<a id="day-37"></a>

### Ngày 37 — Next.js scaffold

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

App Router/server vs client components quyết định data fetching và secret exposure; secrets tuyệt đối không đưa vào client bundle.

**Vì sao phải học:** Giao Claude tạo Next.js TypeScript frontend, layouts và typed API client từ OpenAPI.

**Quy tắc phải tự giải thích được:** Do not overwrite existing frontend scaffold. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Đặt provider API key trong `NEXT_PUBLIC_` env. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-36.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Next.js home renders catalog entry and health state. Cân nhắc trường hợp lỗi `Đặt provider API key trong `NEXT_PUBLIC_` env`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/web/package.json` và `docs/learning/day-37.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/next.config.ts`
- `apps/web/.env.example`
- `apps/web/app/layout.tsx`
- `apps/web/app/page.tsx`
- `apps/web/tests/home.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 37 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 37: Next.js scaffold
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-36.md` đã duyệt
MỤC TIÊU: Giao Claude tạo Next.js TypeScript frontend, layouts và typed API client từ OpenAPI.

YÊU CẦU RIÊNG:
Scaffold apps/web theo UI spec và API contract thực tế. Tạo layout public/buyer/admin, typed fetch wrapper và env example chỉ chứa public API base URL không có secrets. Không tự chọn auth storage nếu PRD chưa quyết.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/web/package.json
  2. apps/web/tsconfig.json
  3. apps/web/next.config.ts
  4. apps/web/.env.example
  5. apps/web/app/layout.tsx
  6. apps/web/app/page.tsx
  7. apps/web/tests/home.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Next.js home renders catalog entry and health state
QUY TẮC QUYẾT ĐỊNH: Do not overwrite existing frontend scaffold
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Next.js home renders catalog entry and health state.
- **Luận cứ để chọn thiết kế:** Do not overwrite existing frontend scaffold.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Đặt provider API key trong `NEXT_PUBLIC_` env` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Đặt provider API key trong `NEXT_PUBLIC_` env`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 38 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao `NEXT_PUBLIC_*` không dành cho secrets?

<details><summary>Xem đáp án</summary>

Dữ liệu có thể được đưa vào bundle client trình duyệt.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Next.js home renders catalog entry and health state.
- [ ] Lỗi `Đặt provider API key trong `NEXT_PUBLIC_` env` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 37 đã được lưu.

<a id="day-38"></a>

### Ngày 38 — Catalog UI

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

UI cần semantic HTML, keyboard access và loading/skeleton; mapping frontend↔API là điểm AI hay hallucinate field names.

**Vì sao phải học:** Nhờ Claude dựng product grid, filter, pagination, product detail và states từ dữ liệu API sandbox.

**Quy tắc phải tự giải thích được:** Product UI must honor OpenAPI types. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** AI lấy hình/giá sản phẩm giả mà không đánh dấu placeholder. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-37.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Catalog cards show name/price and handle no products. Cân nhắc trường hợp lỗi `AI lấy hình/giá sản phẩm giả mà không đánh dấu placeholder`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/web/app/products/page.tsx` và `docs/learning/day-38.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/web/app/products/page.tsx`
- `apps/web/components/product-card.tsx`
- `apps/web/tests/catalog.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 38 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 38: Catalog UI
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-37.md` đã duyệt
MỤC TIÊU: Nhờ Claude dựng product grid, filter, pagination, product detail và states từ dữ liệu API sandbox.

YÊU CẦU RIÊNG:
Implement CatalogPage và ProductDetailPage theo `docs/ui-spec.md` và OpenAPI. Support brand filter, page navigation, skeleton, empty and server error. Thêm tests cho 400/404 và invalid images. Không tạo product fields chưa có trong contract.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/web/app/products/page.tsx
  2. apps/web/components/product-card.tsx
  3. apps/web/tests/catalog.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Catalog cards show name/price and handle no products
QUY TẮC QUYẾT ĐỊNH: Product UI must honor OpenAPI types
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Catalog cards show name/price and handle no products.
- **Luận cứ để chọn thiết kế:** Product UI must honor OpenAPI types.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `AI lấy hình/giá sản phẩm giả mà không đánh dấu placeholder` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `AI lấy hình/giá sản phẩm giả mà không đánh dấu placeholder`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 39 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao URL state có ích cho filters?

<details><summary>Xem đáp án</summary>

Link có thể chia sẻ, reload và back/forward nhất quán.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Catalog cards show name/price and handle no products.
- [ ] Lỗi `AI lấy hình/giá sản phẩm giả mà không đánh dấu placeholder` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 38 đã được lưu.

<a id="day-39"></a>

### Ngày 39 — Cart và checkout

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Cart state có business constraints, duplicate submits và checkout idempotency; API client cần hiểu validation errors.

**Vì sao phải học:** Cho agent dựng cart summary, qty update, COD checkout và order confirmation, có disable-submit khi pending.

**Quy tắc phải tự giải thích được:** UI disable button is not server idempotency. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Client tự tính giá rồi gửi tổng tiền để server tin hoàn toàn. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-38.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Checkout prevents duplicate submit and shows order ID. Cân nhắc trường hợp lỗi `Client tự tính giá rồi gửi tổng tiền để server tin hoàn toàn`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/web/app/cart/page.tsx` và `docs/learning/day-39.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/web/app/cart/page.tsx`
- `apps/web/app/checkout/page.tsx`
- `apps/web/tests/checkout.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 39 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 39: Cart và checkout
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-38.md` đã duyệt
MỤC TIÊU: Cho agent dựng cart summary, qty update, COD checkout và order confirmation, có disable-submit khi pending.

YÊU CẦU RIÊNG:
Tạo frontend cart/checkout flow theo API hiện có: totals từ authoritative backend; client hiển thị tạm thời; submit `Idempotency-Key` cho create order, không tạo lại key khi retry cùng intent. Mô phỏng timeout và duplicate click.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/web/app/cart/page.tsx
  2. apps/web/app/checkout/page.tsx
  3. apps/web/tests/checkout.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Checkout prevents duplicate submit and shows order ID
QUY TẮC QUYẾT ĐỊNH: UI disable button is not server idempotency
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Checkout prevents duplicate submit and shows order ID.
- **Luận cứ để chọn thiết kế:** UI disable button is not server idempotency.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Client tự tính giá rồi gửi tổng tiền để server tin hoàn toàn` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Client tự tính giá rồi gửi tổng tiền để server tin hoàn toàn`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 40 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Server hay client quyết định tổng tiền đơn hàng?

<details><summary>Xem đáp án</summary>

Server xác minh price và totals từ nguồn tin cậy.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Checkout prevents duplicate submit and shows order ID.
- [ ] Lỗi `Client tự tính giá rồi gửi tổng tiền để server tin hoàn toàn` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 39 đã được lưu.

<a id="day-40"></a>

### Ngày 40 — Admin dashboard

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Trang admin cần role-gated API và phân quyền server; hidden UI không đủ bảo mật. Metrics cần scope và thời gian định nghĩa.

**Vì sao phải học:** Agent dựng admin orders list, status filter, summary widgets bằng APIs đã cho phép.

**Quy tắc phải tự giải thích được:** Hiding admin links is not access control. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng localStorage role flag để quyết định backend authorization. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-39.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Buyer role cannot render or call admin-only functions. Cân nhắc trường hợp lỗi `Dùng localStorage role flag để quyết định backend authorization`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/web/app/admin/page.tsx` và `docs/learning/day-40.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/web/app/admin/page.tsx`
- `apps/web/tests/admin-auth.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 40 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 40: Admin dashboard
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-39.md` đã duyệt
MỤC TIÊU: Agent dựng admin orders list, status filter, summary widgets bằng APIs đã cho phép.

YÊU CẦU RIÊNG:
Implement admin dashboard orders chỉ dùng endpoint đã xác minh. Guard routes ở UI để cải thiện UX, nhưng yêu cầu backend enforce admin role. Tạo tests buyer token gọi admin API bị 403, pagination/filter giữ trạng thái.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/web/app/admin/page.tsx
  2. apps/web/tests/admin-auth.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Buyer role cannot render or call admin-only functions
QUY TẮC QUYẾT ĐỊNH: Hiding admin links is not access control
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Buyer role cannot render or call admin-only functions.
- **Luận cứ để chọn thiết kế:** Hiding admin links is not access control.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng localStorage role flag để quyết định backend authorization` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng localStorage role flag để quyết định backend authorization`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 41 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao frontend guard chưa đủ?

<details><summary>Xem đáp án</summary>

Client có thể bị chỉnh sửa; server phải kiểm quyền trên mỗi request.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Buyer role cannot render or call admin-only functions.
- [ ] Lỗi `Dùng localStorage role flag để quyết định backend authorization` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 40 đã được lưu.

<a id="day-41"></a>

### Ngày 41 — Frontend testing

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Test pyramid UI: unit component, integration API mocking, browser E2E; tránh brittle selectors dựa CSS classes. Visual tests cần baseline và tolerance.

**Vì sao phải học:** Nhờ agent tạo Playwright tests cho browse/filter/cart/checkout, fixtures độc lập và accessibility smoke.

**Quy tắc phải tự giải thích được:** UI tests need deterministic mock APIs. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Assertions chỉ kiểm button tồn tại, không kiểm behavior sau click. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-40.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Keyboard-only checkout works and empty/error states are tested. Cân nhắc trường hợp lỗi `Assertions chỉ kiểm button tồn tại, không kiểm behavior sau click`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/web/tests/a11y.spec.ts` và `docs/learning/day-41.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/web/tests/a11y.spec.ts`
- `docs/reports/frontend-test-matrix.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 41 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 41: Frontend testing
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-40.md` đã duyệt
MỤC TIÊU: Nhờ agent tạo Playwright tests cho browse/filter/cart/checkout, fixtures độc lập và accessibility smoke.

YÊU CẦU RIÊNG:
Dựa trên UI spec, tạo browser tests cho catalog empty/error, filter keyboard, cart qty và duplicate checkout. Dùng test IDs chỉ khi semantics role/label không đủ. Không test bằng dữ liệu production.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/web/tests/a11y.spec.ts
  2. docs/reports/frontend-test-matrix.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Keyboard-only checkout works and empty/error states are tested
QUY TẮC QUYẾT ĐỊNH: UI tests need deterministic mock APIs
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Keyboard-only checkout works and empty/error states are tested.
- **Luận cứ để chọn thiết kế:** UI tests need deterministic mock APIs.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Assertions chỉ kiểm button tồn tại, không kiểm behavior sau click` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Assertions chỉ kiểm button tồn tại, không kiểm behavior sau click`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 42 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Chọn selector gì ổn định?

<details><summary>Xem đáp án</summary>

Role và accessible name ưu tiên hơn class names phụ thuộc CSS.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Keyboard-only checkout works and empty/error states are tested.
- [ ] Lỗi `Assertions chỉ kiểm button tồn tại, không kiểm behavior sau click` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 41 đã được lưu.

<a id="day-42"></a>

### Ngày 42 — Full-stack integration

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Full-stack test kiểm state xuyên browser, backend, DB và event workers. Nếu test environment shared dễ nhiễm fixtures, cần reset/namespace rõ ràng.

**Vì sao phải học:** Cho Claude nối Next.js với staging API, verify checkout và trace correlationId từ browser đến backend.

**Quy tắc phải tự giải thích được:** Require browser and database proof, not screenshot alone. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** UI báo thành công khi backend thực sự rollback. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-41.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Browser creates COD order, refreshes, sees persisted history. Cân nhắc trường hợp lỗi `UI báo thành công khi backend thực sự rollback`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/fullstack-e2e.md` và `docs/learning/day-42.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/fullstack-e2e.md`
- `docs/learning/week-06-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 42 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 42: Full-stack integration
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-41.md` đã duyệt
MỤC TIÊU: Cho Claude nối Next.js với staging API, verify checkout và trace correlationId từ browser đến backend.

YÊU CẦU RIÊNG:
Tạo E2E harness với login test account, fixture catalog, COD checkout. Correlate requestId và orderId qua browser logs/API/DB/outbox, redact tokens. Capture screenshots và test report.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/fullstack-e2e.md
  2. docs/learning/week-06-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Browser creates COD order, refreshes, sees persisted history
QUY TẮC QUYẾT ĐỊNH: Require browser and database proof, not screenshot alone
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Browser creates COD order, refreshes, sees persisted history.
- **Luận cứ để chọn thiết kế:** Require browser and database proof, not screenshot alone.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `UI báo thành công khi backend thực sự rollback` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `UI báo thành công khi backend thực sự rollback`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 43 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao cần correlation ID?

<details><summary>Xem đáp án</summary>

Giúp nối events/logs/traces của cùng một nghiệp vụ qua nhiều hệ thống.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Browser creates COD order, refreshes, sees persisted history.
- [ ] Lỗi `UI báo thành công khi backend thực sự rollback` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 42 đã được lưu.

<a id="week-07"></a>
