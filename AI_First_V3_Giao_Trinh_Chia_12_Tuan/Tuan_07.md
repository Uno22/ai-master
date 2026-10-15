# TUẦN 07 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 07 — LLM APIs and Gateway
> **Gate:** Có mock contract + live smoke được gắn nhãn riêng.  
> **Official docs:** https://platform.openai.com/docs/api-reference/responses
**Chọn ngày học:** [Ngày 43](#day-43) · [Ngày 44](#day-44) · [Ngày 45](#day-45) · [Ngày 46](#day-46) · [Ngày 47](#day-47) · [Ngày 48](#day-48) · [Ngày 49](#day-49)

<a id="day-43"></a>

### Ngày 43 — Provider APIs và adapters

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Adapter pattern tách capability chung khỏi provider-specific API; OpenAI responses, Anthropic messages và Gemini generateContent có khác biệt output/tool protocol. Không ép token usage mang cùng nghĩa tuyệt đối.

**Vì sao phải học:** Nhờ Claude xây AiProviderAdapter và implement hai SDK thật, provider thứ ba có contract tests; xác minh model IDs trong quyền truy cập thực.

**Quy tắc phải tự giải thích được:** SDK response shapes differ between providers. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Giả định schema `tools` của ba SDK giống nhau, copy JSON lẫn provider. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-42.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Mock provider routing selects declared model and returns normalized usage. Cân nhắc trường hợp lỗi `Giả định schema `tools` của ba SDK giống nhau, copy JSON lẫn provider`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/ai.module.ts` và `docs/learning/day-43.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/ai.module.ts`
- `apps/api/src/ai/ai-adapter.ts`
- `apps/api/src/ai/ai-gateway.service.ts`
- `apps/api/src/ai/adapters/openai.adapter.ts`
- `apps/api/src/ai/adapters/anthropic.adapter.ts`
- `apps/api/src/ai/adapters/gemini.adapter.ts`
- `apps/api/src/ai/adapters/mock.adapter.ts`
- `apps/api/src/ai/ai-config.ts`
- `apps/api/test/ai-routing.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 43 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 43: Provider APIs và adapters
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-42.md` đã duyệt
MỤC TIÊU: Nhờ Claude xây AiProviderAdapter và implement hai SDK thật, provider thứ ba có contract tests; xác minh model IDs trong quyền truy cập thực.

YÊU CẦU RIÊNG:
Xây NestJS AiGateway với `generateText(prompt,provider)` và normalized result gồm provider/model/text/usage. Implement OpenAI Responses, Anthropic Messages, Gemini `generateContent` theo SDK docs hiện hành, chỉ enable provider có key. Tách error mapping, không log raw prompts.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/ai.module.ts
  2. apps/api/src/ai/ai-adapter.ts
  3. apps/api/src/ai/ai-gateway.service.ts
  4. apps/api/src/ai/adapters/openai.adapter.ts
  5. apps/api/src/ai/adapters/anthropic.adapter.ts
  6. apps/api/src/ai/adapters/gemini.adapter.ts
  7. apps/api/src/ai/adapters/mock.adapter.ts
  8. apps/api/src/ai/ai-config.ts
  9. apps/api/test/ai-routing.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Mock provider routing selects declared model and returns normalized usage
QUY TẮC QUYẾT ĐỊNH: SDK response shapes differ between providers
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Mock provider routing selects declared model and returns normalized usage.
- **Luận cứ để chọn thiết kế:** SDK response shapes differ between providers.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Giả định schema `tools` của ba SDK giống nhau, copy JSON lẫn provider` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Giả định schema `tools` của ba SDK giống nhau, copy JSON lẫn provider`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 44 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao adapter không nên giấu mọi khác biệt?

<details><summary>Xem đáp án</summary>

Feature đặc thù như caching, tool events hoặc multimodal cần capability boundary rõ.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Mock provider routing selects declared model and returns normalized usage.
- [ ] Lỗi `Giả định schema `tools` của ba SDK giống nhau, copy JSON lẫn provider` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 43 đã được lưu.

<a id="day-44"></a>

### Ngày 44 — Prompt/version registry

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Prompt là một phần behavior có version; rollback prompt khác rollback code. Registry cần owner, version, expected schema, eval sample và change log.

**Vì sao phải học:** Dùng AI thiết kế prompt templates cho product FAQ và order assistant, lưu version không kèm data thật.

**Quy tắc phải tự giải thích được:** Prompt updates are versioned behavioral changes. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tùy tiện sửa prompt prod mà không có version/test. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-43.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Prompt version is logged with request ID but prompt body is redacted. Cân nhắc trường hợp lỗi `Tùy tiện sửa prompt prod mà không có version/test`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/prompt-registry.ts` và `docs/learning/day-44.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/prompt-registry.ts`
- `docs/ai/prompt-version-policy.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 44 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 44: Prompt/version registry
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-43.md` đã duyệt
MỤC TIÊU: Dùng AI thiết kế prompt templates cho product FAQ và order assistant, lưu version không kèm data thật.

YÊU CẦU RIÊNG:
Tạo `packages/ai/prompts` cho `faq-answer` và `order-status-summary`. Mỗi prompt có id, semantic version, supported models, input fields, expected output schema, safety instructions và changelog; tích hợp chọn version qua config.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/prompt-registry.ts
  2. docs/ai/prompt-version-policy.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Prompt version is logged with request ID but prompt body is redacted
QUY TẮC QUYẾT ĐỊNH: Prompt updates are versioned behavioral changes
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Prompt version is logged with request ID but prompt body is redacted.
- **Luận cứ để chọn thiết kế:** Prompt updates are versioned behavioral changes.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tùy tiện sửa prompt prod mà không có version/test` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tùy tiện sửa prompt prod mà không có version/test`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 45 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao prompt cần version?

<details><summary>Xem đáp án</summary>

Để tái hiện, A/B test và rollback behavior khi output thay đổi.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Prompt version is logged with request ID but prompt body is redacted.
- [ ] Lỗi `Tùy tiện sửa prompt prod mà không có version/test` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 44 đã được lưu.

<a id="day-45"></a>

### Ngày 45 — Structured outputs

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Schema-constrained output hạn chế lỗi hình dạng nhưng không chứng minh tính đúng sự thật; unsupported schema keywords tùy provider. Cần parse/validate ở backend và xử lý refusal/partial outputs.

**Vì sao phải học:** Agent làm product extraction từ mô tả, dùng Zod hoặc JSON Schema được provider hỗ trợ, test sai cấu trúc/giá trị.

**Quy tắc phải tự giải thích được:** Valid JSON can violate business constraints. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Bắt model phải chọn giá khi input không có thông tin. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-44.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Confidence outside 0..1 fails schema validation. Cân nhắc trường hợp lỗi `Bắt model phải chọn giá khi input không có thông tin`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/schemas/product-extraction.schema.ts` và `docs/learning/day-45.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/schemas/product-extraction.schema.ts`
- `apps/api/src/ai/structured-output.service.ts`
- `apps/api/test/structured-output.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 45 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 45: Structured outputs
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-44.md` đã duyệt
MỤC TIÊU: Agent làm product extraction từ mô tả, dùng Zod hoặc JSON Schema được provider hỗ trợ, test sai cấu trúc/giá trị.

YÊU CẦU RIÊNG:
Xây `extractProductAttributes(text)` trả `{name, brand|null, price|null, currency|null, confidence}`. Khai báo schema theo capabilities của từng provider, validate server-side `confidence in [0,1]`, `price>=0`. Test missing brand, prompt injection, malformed output và refusal.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/schemas/product-extraction.schema.ts
  2. apps/api/src/ai/structured-output.service.ts
  3. apps/api/test/structured-output.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Confidence outside 0..1 fails schema validation
QUY TẮC QUYẾT ĐỊNH: Valid JSON can violate business constraints
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Confidence outside 0..1 fails schema validation.
- **Luận cứ để chọn thiết kế:** Valid JSON can violate business constraints.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Bắt model phải chọn giá khi input không có thông tin` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Bắt model phải chọn giá khi input không có thông tin`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 46 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao valid JSON chưa đủ?

<details><summary>Xem đáp án</summary>

Dữ liệu có thể sai kiểu/constraint hoặc không đúng với văn bản nguồn.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Confidence outside 0..1 fails schema validation.
- [ ] Lỗi `Bắt model phải chọn giá khi input không có thông tin` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 45 đã được lưu.

<a id="day-46"></a>

### Ngày 46 — Function calling

> **75–120 phút · IMPLEMENT · AI: Claude Code + Codex kiểm tra authorization · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Model đề xuất tool call, backend mới validate, authorize và execute; tool loop phải giới hạn rounds, size và timeout. Tool output là dữ liệu không đáng tin cậy có thể chứa prompt injection.

**Vì sao phải học:** Agent xây allowlisted read-only `getProductStock` tool liên kết InventoryService, triển khai loop một lượt và nhiều lượt nếu provider yêu cầu.

**Quy tắc phải tự giải thích được:** Tool call is a proposal, not automatic permission. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Model sinh tên tool lạ và app chạy bằng dynamic eval hoặc arbitrary query. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-45.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + Codex kiểm tra authorization. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Unauthorized user cannot read another tenant's stock. Cân nhắc trường hợp lỗi `Model sinh tên tool lạ và app chạy bằng dynamic eval hoặc arbitrary query`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/tools/stock.tool.ts` và `docs/learning/day-46.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/tools/stock.tool.ts`
- `apps/api/src/ai/tools/tool-dispatcher.ts`
- `apps/api/src/ai/tools/tool-policy.ts`
- `apps/api/src/ai/tools/schemas/stock.schema.ts`
- `apps/api/test/stock-tool-auth.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 46 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 46: Function calling
CÔNG CỤ: Claude Code + Codex kiểm tra authorization | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-45.md` đã duyệt
MỤC TIÊU: Agent xây allowlisted read-only `getProductStock` tool liên kết InventoryService, triển khai loop một lượt và nhiều lượt nếu provider yêu cầu.

YÊU CẦU RIÊNG:
Implement function calling cho câu “sản phẩm 101 còn bao nhiêu?”. Khai báo tool schema positive integer, executor xác minh current user/tenant; max 3 tool rounds, timeout 2s trên tool nội bộ, unknown tool bị từ chối. Hãy viết tests tool-call args sai và unauthorized id.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/tools/stock.tool.ts
  2. apps/api/src/ai/tools/tool-dispatcher.ts
  3. apps/api/src/ai/tools/tool-policy.ts
  4. apps/api/src/ai/tools/schemas/stock.schema.ts
  5. apps/api/test/stock-tool-auth.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Unauthorized user cannot read another tenant's stock
QUY TẮC QUYẾT ĐỊNH: Tool call is a proposal, not automatic permission
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Unauthorized user cannot read another tenant's stock.
- **Luận cứ để chọn thiết kế:** Tool call is a proposal, not automatic permission.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Model sinh tên tool lạ và app chạy bằng dynamic eval hoặc arbitrary query` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Model sinh tên tool lạ và app chạy bằng dynamic eval hoặc arbitrary query`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 47 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Ai thật sự thực thi tool?

<details><summary>Xem đáp án</summary>

Backend runtime sau schema validation và authorization.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Unauthorized user cannot read another tenant's stock.
- [ ] Lỗi `Model sinh tên tool lạ và app chạy bằng dynamic eval hoặc arbitrary query` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 46 đã được lưu.

<a id="day-47"></a>

### Ngày 47 — Streaming và cancellation

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

SSE gửi delta để UI cập nhật sớm; tổng thời gian hoàn tất khác time-to-first-token. Cancellation phải dừng upstream khi client ngắt, xử lý partial outputs và logging.

**Vì sao phải học:** Agent tạo `GET /ai/stream-demo` hoặc POST→SSE workflow thích hợp; browser hiển thị tokens; test disconnect.

**Quy tắc phải tự giải thích được:** No streaming success claim from unobserved event order. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Stream không có cancellation nên tiêu token sau khi tab đóng. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-46.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** When client disconnects, upstream stream is canceled where supported. Cân nhắc trường hợp lỗi `Stream không có cancellation nên tiêu token sau khi tab đóng`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/stream.controller.ts` và `docs/learning/day-47.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/stream.controller.ts`
- `apps/api/src/ai/stream.service.ts`
- `apps/api/test/stream-cancel.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 47 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 47: Streaming và cancellation
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-46.md` đã duyệt
MỤC TIÊU: Agent tạo `GET /ai/stream-demo` hoặc POST→SSE workflow thích hợp; browser hiển thị tokens; test disconnect.

YÊU CẦU RIÊNG:
Xây streaming endpoint cho AI FAQ; format SSE `event: token` và `event: done/error`; không chèn secret trong stream. Khi client disconnect, abort provider request nếu SDK hỗ trợ; xử lý upstream timeout và multi-byte UTF-8.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/stream.controller.ts
  2. apps/api/src/ai/stream.service.ts
  3. apps/api/test/stream-cancel.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: When client disconnects, upstream stream is canceled where supported
QUY TẮC QUYẾT ĐỊNH: No streaming success claim from unobserved event order
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** When client disconnects, upstream stream is canceled where supported.
- **Luận cứ để chọn thiết kế:** No streaming success claim from unobserved event order.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Stream không có cancellation nên tiêu token sau khi tab đóng` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Stream không có cancellation nên tiêu token sau khi tab đóng`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 48 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Streaming cải thiện metric nào rõ nhất?

<details><summary>Xem đáp án</summary>

Time-to-first-token/first useful content, không mặc định giảm tổng token.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] When client disconnects, upstream stream is canceled where supported.
- [ ] Lỗi `Stream không có cancellation nên tiêu token sau khi tab đóng` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 47 đã được lưu.

<a id="day-48"></a>

### Ngày 48 — Routing/fallback/cost

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Routing chọn model theo task, budget, policy dữ liệu và capability; fallback cần tránh side effects trùng và không vi phạm data residency. Retry ở SDK cộng retry ở gateway có thể bùng nổ.

**Vì sao phải học:** Cho agent thiết kế policy FAQ dùng model cost thấp, complex reasoning cần capability cao, provider outage fallback có điều kiện.

**Quy tắc phải tự giải thích được:** Retry and fallback can duplicate non-idempotent side effects. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tính giá hiện tại bằng số cố định lấy từ blog năm trước. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-47.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Cross-provider fallback denied if privacy policy disallows transfer. Cân nhắc trường hợp lỗi `Tính giá hiện tại bằng số cố định lấy từ blog năm trước`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/ai/model-router.ts` và `docs/learning/day-48.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/ai/model-router.ts`
- `apps/api/src/ai/model-capabilities.ts`
- `apps/api/src/ai/cost-meter.ts`
- `apps/api/test/fallback-policy.spec.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 48 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 48: Routing/fallback/cost
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-47.md` đã duyệt
MỤC TIÊU: Cho agent thiết kế policy FAQ dùng model cost thấp, complex reasoning cần capability cao, provider outage fallback có điều kiện.

YÊU CẦU RIÊNG:
Tạo routing table `{task,primary,allowedFallbacks,requiredCapabilities,maxCost}` dựa trên config; usage/cost theo bảng giá cấu hình có ngày hiệu lực. Thử injected 429, 503, timeout; không retry tool ghi dữ liệu không idempotent.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/ai/model-router.ts
  2. apps/api/src/ai/model-capabilities.ts
  3. apps/api/src/ai/cost-meter.ts
  4. apps/api/test/fallback-policy.spec.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Cross-provider fallback denied if privacy policy disallows transfer
QUY TẮC QUYẾT ĐỊNH: Retry and fallback can duplicate non-idempotent side effects
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Cross-provider fallback denied if privacy policy disallows transfer.
- **Luận cứ để chọn thiết kế:** Retry and fallback can duplicate non-idempotent side effects.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tính giá hiện tại bằng số cố định lấy từ blog năm trước` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tính giá hiện tại bằng số cố định lấy từ blog năm trước`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 49 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Tại sao fallback đôi khi sai?

<details><summary>Xem đáp án</summary>

Dữ liệu có thể không được phép chuyển provider, contract khác hoặc side effect bị lặp.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Cross-provider fallback denied if privacy policy disallows transfer.
- [ ] Lỗi `Tính giá hiện tại bằng số cố định lấy từ blog năm trước` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 48 đã được lưu.

<a id="day-49"></a>

### Ngày 49 — Gateway integration gate

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Gateway ready khi adapters+schema+tools+streaming+auth+observability được kiểm chung, không chỉ từng API đơn lẻ pass.

**Vì sao phải học:** Agent làm contract test suite; deploy local gateway dùng mock provider; smoke test thật có budget được phê duyệt.

**Quy tắc phải tự giải thích được:** Provider API tests must distinguish mocks from live calls. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Gọi mock tests là bằng chứng kết nối thật với providers. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-48.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Text, JSON, tool and stream endpoints report usage and errors. Cân nhắc trường hợp lỗi `Gọi mock tests là bằng chứng kết nối thật với providers`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/ai-gateway-integration.md` và `docs/learning/day-49.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/ai-gateway-integration.md`
- `docs/learning/week-07-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 49 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 49: Gateway integration gate
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-48.md` đã duyệt
MỤC TIÊU: Agent làm contract test suite; deploy local gateway dùng mock provider; smoke test thật có budget được phê duyệt.

YÊU CẦU RIÊNG:
Chạy end-to-end AI Gateway: generate structured product extraction; FAQ tool read-only; stream cancel; injected 429/provider failure. Tạo trace matrix từ requestId đến provider usage. Cấm in keys/PII trong logs và test reports.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/ai-gateway-integration.md
  2. docs/learning/week-07-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Text, JSON, tool and stream endpoints report usage and errors
QUY TẮC QUYẾT ĐỊNH: Provider API tests must distinguish mocks from live calls
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Text, JSON, tool and stream endpoints report usage and errors.
- **Luận cứ để chọn thiết kế:** Provider API tests must distinguish mocks from live calls.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Gọi mock tests là bằng chứng kết nối thật với providers` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Gọi mock tests là bằng chứng kết nối thật với providers`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 50 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Phân biệt contract test và live smoke?

<details><summary>Xem đáp án</summary>

Mock xác minh logic adapter; live smoke kiểm credentials, model access và service thật.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Text, JSON, tool and stream endpoints report usage and errors.
- [ ] Lỗi `Gọi mock tests là bằng chứng kết nối thật với providers` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 49 đã được lưu.

<a id="week-08"></a>
