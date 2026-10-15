# TUẦN 03 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 03 — Multi-model orchestration
> **Gate:** Review độc lập phải nhìn code, diff, test evidence; chi phí có budget.  
> **Official docs:** https://developers.openai.com/codex
**Chọn ngày học:** [Ngày 15](#day-15) · [Ngày 16](#day-16) · [Ngày 17](#day-17) · [Ngày 18](#day-18) · [Ngày 19](#day-19) · [Ngày 20](#day-20) · [Ngày 21](#day-21)

<a id="day-15"></a>

### Ngày 15 — Provider/model landscape

> **75–120 phút · READ-ONLY · AI: Claude Code + catalog docs · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Provider khác model, model khác coding agent product; so sánh cần task, quyền dữ liệu, capabilities, latency và cost. Model tốt trên benchmark chung chưa chắc tốt với codebase riêng.

**Vì sao phải học:** Lập inventory Claude Code, Codex, Gemini, Copilot đang có quyền truy cập; liệt kê models có thể chọn và hạn chế thực tế; không giả định subscription = API entitlement.

**Quy tắc phải tự giải thích được:** Model catalog and prices must be checked at time of use. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Gọi tất cả Claude/Gemini/Codex là “cùng một loại API”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-14.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + catalog docs. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Capability matrix includes text/tools/structured output, context, quotas, privacy. Cân nhắc trường hợp lỗi `Gọi tất cả Claude/Gemini/Codex là “cùng một loại API”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/ai/providers-and-models.md` và `docs/learning/day-15.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/ai/providers-and-models.md`
- `docs/learning/day-15.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 15 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 15: Provider/model landscape
CÔNG CỤ: Claude Code + catalog docs | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-14.md` đã duyệt
MỤC TIÊU: Lập inventory Claude Code, Codex, Gemini, Copilot đang có quyền truy cập; liệt kê models có thể chọn và hạn chế thực tế; không giả định subscription = API entitlement.

YÊU CẦU RIÊNG:
Với các công cụ hiện đăng nhập trên máy này, lập bảng provider/product/model/access path/feature/cost unit/privacy controls. Chỉ dùng thông tin từ CLI/help và docs chính thức; đánh dấu unknown khi cần credentials hoặc giá riêng tài khoản. Không gọi API tính phí trước approval.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/ai/providers-and-models.md
  2. docs/learning/day-15.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Capability matrix includes text/tools/structured output, context, quotas, privacy
QUY TẮC QUYẾT ĐỊNH: Model catalog and prices must be checked at time of use
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Capability matrix includes text/tools/structured output, context, quotas, privacy.
- **Luận cứ để chọn thiết kế:** Model catalog and prices must be checked at time of use.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Gọi tất cả Claude/Gemini/Codex là “cùng một loại API”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Gọi tất cả Claude/Gemini/Codex là “cùng một loại API”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 16 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao provider và agent tool không đồng nghĩa?

<details><summary>Xem đáp án</summary>

Provider cung cấp model/API; agent tool bổ sung runtime, tools, permissions và workflow.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Capability matrix includes text/tools/structured output, context, quotas, privacy.
- [ ] Lỗi `Gọi tất cả Claude/Gemini/Codex là “cùng một loại API”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 15 đã được lưu.

<a id="day-16"></a>

### Ngày 16 — Claude Code và Codex phân công

> **75–120 phút · READ-ONLY · AI: Claude Code (thực thi) + Codex (review) · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Phân công theo mục tiêu khác nhau: implementer nhận spec, reviewer nhận diff và contracts; không cần hai agent cùng sửa một file. Đánh giá đầu ra dựa trên test và findings.

**Vì sao phải học:** Cho Claude implement filter catalog đã duyệt; Codex chỉ đọc diff để viết regression tests proposal; tổng hợp findings.

**Quy tắc phải tự giải thích được:** Independent reviewer must see source and diff, not just summary. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng hai agents chạy cùng task giống hệt nhưng không có tiêu chí đánh giá. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-15.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code (thực thi) + Codex (review). **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** A handoff includes base commit SHA and exact changed file list. Cân nhắc trường hợp lỗi `Dùng hai agents chạy cùng task giống hệt nhưng không có tiêu chí đánh giá`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/ai/claude-codex-handoff.md` và `docs/learning/day-16.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/ai/claude-codex-handoff.md`
- `docs/reviews/codex-feedback.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 16 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 16: Claude Code và Codex phân công
CÔNG CỤ: Claude Code (thực thi) + Codex (review) | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-15.md` đã duyệt
MỤC TIÊU: Cho Claude implement filter catalog đã duyệt; Codex chỉ đọc diff để viết regression tests proposal; tổng hợp findings.

YÊU CẦU RIÊNG:
Dùng Claude Code xây feature theo spec catalog; dùng Codex trong session độc lập đọc code+diff và chỉ trả danh sách bug có evidence. Hãy đo time-to-first-review, số bug confirmed và token/cost nếu có. Không tự sửa findings chưa xác nhận.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/ai/claude-codex-handoff.md
  2. docs/reviews/codex-feedback.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: A handoff includes base commit SHA and exact changed file list
QUY TẮC QUYẾT ĐỊNH: Independent reviewer must see source and diff, not just summary
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** A handoff includes base commit SHA and exact changed file list.
- **Luận cứ để chọn thiết kế:** Independent reviewer must see source and diff, not just summary.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng hai agents chạy cùng task giống hệt nhưng không có tiêu chí đánh giá` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng hai agents chạy cùng task giống hệt nhưng không có tiêu chí đánh giá`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 17 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao review độc lập thường hữu ích?

<details><summary>Xem đáp án</summary>

Tách vai trò giảm nguy cơ reviewer kế thừa giả định hoặc phương án của implementer.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] A handoff includes base commit SHA and exact changed file list.
- [ ] Lỗi `Dùng hai agents chạy cùng task giống hệt nhưng không có tiêu chí đánh giá` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 16 đã được lưu.

<a id="day-17"></a>

### Ngày 17 — Gemini phân tích context lớn

> **75–120 phút · READ-ONLY · AI: Gemini (chính), Claude Code (đối chiếu) · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Long context giúp đọc nhiều tài liệu, nhưng không thay retrieval và lựa chọn tài liệu liên quan; cost và privacy phụ thuộc API/product. Không gửi secrets hay toàn repo nếu không cần.

**Vì sao phải học:** Dùng Gemini đọc ADR, OpenAPI và README đã loại secrets, đánh giá chỗ mâu thuẫn; đối chiếu lại source.

**Quy tắc phải tự giải thích được:** Gemini is invoked separately unless integration exists. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Giả định context lớn cho phép gửi không hạn chế tài liệu nội bộ lên mọi provider. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-16.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Gemini (chính), Claude Code (đối chiếu). **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Compare actual ADR, OpenAPI, and entity definitions; cite source line. Cân nhắc trường hợp lỗi `Giả định context lớn cho phép gửi không hạn chế tài liệu nội bộ lên mọi provider`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reviews/gemini-contract-drift.md` và `docs/learning/day-17.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reviews/gemini-contract-drift.md`
- `docs/learning/day-17.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 17 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 17: Gemini phân tích context lớn
CÔNG CỤ: Gemini (chính), Claude Code (đối chiếu) | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-16.md` đã duyệt
MỤC TIÊU: Dùng Gemini đọc ADR, OpenAPI và README đã loại secrets, đánh giá chỗ mâu thuẫn; đối chiếu lại source.

YÊU CẦU RIÊNG:
Tôi cung cấp PRD, ADR và API contract đã redacted. Hãy lập bảng 10 invariants và mọi mâu thuẫn giữa các tài liệu, có trích tên file/section. Không tự suy đoán module chưa tồn tại. Đưa 3 câu hỏi có ảnh hưởng lớn nhất cần tôi quyết định.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reviews/gemini-contract-drift.md
  2. docs/learning/day-17.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Compare actual ADR, OpenAPI, and entity definitions; cite source line
QUY TẮC QUYẾT ĐỊNH: Gemini is invoked separately unless integration exists
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Compare actual ADR, OpenAPI, and entity definitions; cite source line.
- **Luận cứ để chọn thiết kế:** Gemini is invoked separately unless integration exists.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Giả định context lớn cho phép gửi không hạn chế tài liệu nội bộ lên mọi provider` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Giả định context lớn cho phép gửi không hạn chế tài liệu nội bộ lên mọi provider`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 18 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Rủi ro của context dài là gì?

<details><summary>Xem đáp án</summary>

Chi phí, nhiễu, thông tin hết hạn và đưa dữ liệu không cần thiết ra ngoài trust boundary.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Compare actual ADR, OpenAPI, and entity definitions; cite source line.
- [ ] Lỗi `Giả định context lớn cho phép gửi không hạn chế tài liệu nội bộ lên mọi provider` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 17 đã được lưu.

<a id="day-18"></a>

### Ngày 18 — Model selection và task routing

> **75–120 phút · READ-ONLY · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Routing theo capability fit, privacy, budget và accuracy; không chọn model chỉ vì tên/giá. Hãy thiết kế rubric riêng cho code generation, architecture critique và visual testing.

**Vì sao phải học:** Cho AI đề xuất policy chọn Claude, Codex, Gemini theo các task đã học; đo chỗ nào cần reviewer thứ hai.

**Quy tắc phải tự giải thích được:** Routing follows privacy and capability before price. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Routing dựa vào “mạnh nhất” mà không có metric hoặc task definition. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-17.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Sensitive tenant data is never routed to an unapproved provider. Cân nhắc trường hợp lỗi `Routing dựa vào “mạnh nhất” mà không có metric hoặc task definition`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/ai/task-routing-policy.md` và `docs/learning/day-18.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/ai/task-routing-policy.md`
- `docs/learning/day-18.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 18 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 18: Model selection và task routing
CÔNG CỤ: Claude Code | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-17.md` đã duyệt
MỤC TIÊU: Cho AI đề xuất policy chọn Claude, Codex, Gemini theo các task đã học; đo chỗ nào cần reviewer thứ hai.

YÊU CẦU RIÊNG:
Thiết kế routing matrix cho 6 task: refactor NestJS, review SQL transaction, summarize docs, analyze UI screenshot, security review, test generation. Với mỗi task: model/tool candidate, capability, constraints, fallback rule và stop condition.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/ai/task-routing-policy.md
  2. docs/learning/day-18.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Sensitive tenant data is never routed to an unapproved provider
QUY TẮC QUYẾT ĐỊNH: Routing follows privacy and capability before price
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Sensitive tenant data is never routed to an unapproved provider.
- **Luận cứ để chọn thiết kế:** Routing follows privacy and capability before price.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Routing dựa vào “mạnh nhất” mà không có metric hoặc task definition` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Routing dựa vào “mạnh nhất” mà không có metric hoặc task definition`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 19 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào không fallback sang provider khác?

<details><summary>Xem đáp án</summary>

Khi vi phạm quyền dữ liệu, capability mismatch, budget hoặc side effect có thể lặp.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Sensitive tenant data is never routed to an unapproved provider.
- [ ] Lỗi `Routing dựa vào “mạnh nhất” mà không có metric hoặc task definition` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 18 đã được lưu.

<a id="day-19"></a>

### Ngày 19 — Benchmark prompt và model

> **75–120 phút · READ-ONLY · AI: Claude Code (benchmark harness) + providers được duyệt · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

So sánh model cần cố định task, input snapshot, rubric, môi trường, thời điểm, lần chạy; dùng chỉ số cả chất lượng và chi phí. Không so latency nếu workload khác nhau.

**Vì sao phải học:** Tạo benchmark 12 cases thực tế gồm 4 code analysis, 4 SQL/architecture, 4 test design; để ít nhất 2 models làm khi được phép.

**Quy tắc phải tự giải thích được:** Use one fixed dataset for comparison; include confounders. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng một prompt thắng rồi kết luận model tốt nhất cho mọi tình huống. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-18.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code (benchmark harness) + providers được duyệt. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Report pass-rate, median latency, sample size, cost per task. Cân nhắc trường hợp lỗi `Dùng một prompt thắng rồi kết luận model tốt nhất cho mọi tình huống`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `evals/model-benchmark-cases.jsonl` và `docs/learning/day-19.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `evals/model-benchmark-cases.jsonl`
- `docs/ai/model-benchmark.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 19 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 19: Benchmark prompt và model
CÔNG CỤ: Claude Code (benchmark harness) + providers được duyệt | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-18.md` đã duyệt
MỤC TIÊU: Tạo benchmark 12 cases thực tế gồm 4 code analysis, 4 SQL/architecture, 4 test design; để ít nhất 2 models làm khi được phép.

YÊU CẦU RIÊNG:
Tạo bộ 12 test tasks dạng JSONL gồm id, instructions, repo snapshot ref, expected behavior, scoring rubric. Thiết kế script/worksheet đo pass rate, observed cost, latency; không đặt điểm chỉ theo độ trôi chảy của câu trả lời.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. evals/model-benchmark-cases.jsonl
  2. docs/ai/model-benchmark.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Report pass-rate, median latency, sample size, cost per task
QUY TẮC QUYẾT ĐỊNH: Use one fixed dataset for comparison; include confounders
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Report pass-rate, median latency, sample size, cost per task.
- **Luận cứ để chọn thiết kế:** Use one fixed dataset for comparison; include confounders.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng một prompt thắng rồi kết luận model tốt nhất cho mọi tình huống` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng một prompt thắng rồi kết luận model tốt nhất cho mọi tình huống`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 20 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao cố định input snapshot?

<details><summary>Xem đáp án</summary>

Để hạn chế nhiễu từ thay đổi codebase giữa các lần chạy.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Report pass-rate, median latency, sample size, cost per task.
- [ ] Lỗi `Dùng một prompt thắng rồi kết luận model tốt nhất cho mọi tình huống` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 19 đã được lưu.

<a id="day-20"></a>

### Ngày 20 — Cost governance

> **120–180 phút · READ-ONLY · AI: Claude Code + official pricing pages · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Token budgets, API bills, subscription plans và caching là các khái niệm khác nhau; model output có thể tạo tool runs và side effects. Cost per accepted deliverable hữu ích hơn cost per raw request.

**Vì sao phải học:** Lập policy đặt giới hạn ngày, cost alerts, retry caps và điều kiện yêu cầu phê duyệt cho tác vụ tốn kém.

**Quy tắc phải tự giải thích được:** Usage tokens are not always directly comparable across vendors. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tự động dùng model đắt cho mọi tác vụ và nhân số lần retry không giới hạn. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-19.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + official pricing pages. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Define per-day spend cap and alert at a chosen budget threshold. Cân nhắc trường hợp lỗi `Tự động dùng model đắt cho mọi tác vụ và nhân số lần retry không giới hạn`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/ai/cost-budget-policy.md` và `docs/learning/day-20.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/ai/cost-budget-policy.md`
- `docs/learning/day-20.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 20 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 20: Cost governance
CÔNG CỤ: Claude Code + official pricing pages | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-19.md` đã duyệt
MỤC TIÊU: Lập policy đặt giới hạn ngày, cost alerts, retry caps và điều kiện yêu cầu phê duyệt cho tác vụ tốn kém.

YÊU CẦU RIÊNG:
Thiết kế budget policy cho cá nhân: target weekly spending, max concurrent agents, max retries per task, threshold yêu cầu approval và log spend. Phân biệt giá subscription với API metered usage. Hỏi tôi ngân sách thay vì tự đặt USD số thực tế.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/ai/cost-budget-policy.md
  2. docs/learning/day-20.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Define per-day spend cap and alert at a chosen budget threshold
QUY TẮC QUYẾT ĐỊNH: Usage tokens are not always directly comparable across vendors
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Define per-day spend cap and alert at a chosen budget threshold.
- **Luận cứ để chọn thiết kế:** Usage tokens are not always directly comparable across vendors.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tự động dùng model đắt cho mọi tác vụ và nhân số lần retry không giới hạn` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tự động dùng model đắt cho mọi tác vụ và nhân số lần retry không giới hạn`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 21 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Chỉ số nào phản ánh hiệu quả tốt hơn giá một request?

<details><summary>Xem đáp án</summary>

Tổng chi phí trên một deliverable được chấp nhận, gồm retry/review/test.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Define per-day spend cap and alert at a chosen budget threshold.
- [ ] Lỗi `Tự động dùng model đắt cho mọi tác vụ và nhân số lần retry không giới hạn` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 20 đã được lưu.

<a id="day-21"></a>

### Ngày 21 — Lab tuần 3: multi-model review

> **120–180 phút · GATE · AI: Claude Code + Codex; Gemini optional · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Multi-model hữu ích khi có độ độc lập và cách adjudication rõ. Kết quả khác nhau không đồng nghĩa một bên sai; phân loại bằng bằng chứng từ source/tests.

**Vì sao phải học:** Cho Claude sửa catalog filter, Codex review auth/SQL, Gemini review API compatibility; lập bảng quyết định findings.

**Quy tắc phải tự giải thích được:** Agreeing models are not proof of correctness. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Ba model cùng dựa trên summary lỗi dẫn tới xác nhận giả. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-20.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + Codex; Gemini optional. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Three disagreements resolved with tests or source proof. Cân nhắc trường hợp lỗi `Ba model cùng dựa trên summary lỗi dẫn tới xác nhận giả`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reviews/multi-model-pr.md` và `docs/learning/day-21.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reviews/multi-model-pr.md`
- `docs/learning/week-03-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 21 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 21: Lab tuần 3: multi-model review
CÔNG CỤ: Claude Code + Codex; Gemini optional | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-20.md` đã duyệt
MỤC TIÊU: Cho Claude sửa catalog filter, Codex review auth/SQL, Gemini review API compatibility; lập bảng quyết định findings.

YÊU CẦU RIÊNG:
Đánh giá PR filter catalog bằng ba vai: Claude implementer, Codex logic reviewer, Gemini contract reviewer. Mỗi reviewer nhận source/diff riêng và scope riêng. Tổng hợp findings có severity, evidence, reproduction, disposition và owner.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reviews/multi-model-pr.md
  2. docs/learning/week-03-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Three disagreements resolved with tests or source proof
QUY TẮC QUYẾT ĐỊNH: Agreeing models are not proof of correctness
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Three disagreements resolved with tests or source proof.
- **Luận cứ để chọn thiết kế:** Agreeing models are not proof of correctness.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Ba model cùng dựa trên summary lỗi dẫn tới xác nhận giả` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Ba model cùng dựa trên summary lỗi dẫn tới xác nhận giả`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 22 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Quyết định khi reviews bất đồng?

<details><summary>Xem đáp án</summary>

Tái hiện tests, tra contract và xét business risk, không bỏ phiếu theo số model.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Three disagreements resolved with tests or source proof.
- [ ] Lỗi `Ba model cùng dựa trên summary lỗi dẫn tới xác nhận giả` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 21 đã được lưu.

<a id="week-04"></a>
