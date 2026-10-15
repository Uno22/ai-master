# TUẦN 09 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 09 — Durable agents
> **Gate:** Bảo vệ side effects và approval bên ngoài model.  
> **Official docs:** https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
**Chọn ngày học:** [Ngày 57](#day-57) · [Ngày 58](#day-58) · [Ngày 59](#day-59) · [Ngày 60](#day-60) · [Ngày 61](#day-61) · [Ngày 62](#day-62) · [Ngày 63](#day-63)

<a id="day-57"></a>

### Ngày 57 — Agent loop và state machine

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Agent state phải mô tả task phase, prior tool calls, limits và terminal states; giới hạn step count, time và budget ngăn runaway loops.

**Vì sao phải học:** Nhờ Claude thiết kế agent hỗ trợ đối soát đơn hàng bất thường với read-only tools và state chart; mới simulate bằng mocks.

**Quy tắc phải tự giải thích được:** Persist state transitions before externally visible effects. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Để LLM quyết định vô hạn số tools và dừng khi “cảm thấy xong”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-56.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Workflow moves queued→running→waiting_approval→done. Cân nhắc trường hợp lỗi `Để LLM quyết định vô hạn số tools và dừng khi “cảm thấy xong”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/workflow-state.ts` và `docs/learning/day-57.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/workflow-state.ts`
- `packages/agents/src/workflow-runner.ts`
- `packages/agents/src/state-store.ts`
- `packages/agents/tests/state.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 57 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 57: Agent loop và state machine
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-56.md` đã duyệt
MỤC TIÊU: Nhờ Claude thiết kế agent hỗ trợ đối soát đơn hàng bất thường với read-only tools và state chart; mới simulate bằng mocks.

YÊU CẦU RIÊNG:
Tạo state machine `created→analyzing→awaiting_approval→completed/failed`. Agent dùng getOrderStatus/getProductStock, max 5 steps, maxCost, deadline và structured final report. Không cho phép tự cancel order.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/workflow-state.ts
  2. packages/agents/src/workflow-runner.ts
  3. packages/agents/src/state-store.ts
  4. packages/agents/tests/state.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Workflow moves queued→running→waiting_approval→done
QUY TẮC QUYẾT ĐỊNH: Persist state transitions before externally visible effects
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Workflow moves queued→running→waiting_approval→done.
- **Luận cứ để chọn thiết kế:** Persist state transitions before externally visible effects.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Để LLM quyết định vô hạn số tools và dừng khi “cảm thấy xong”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Để LLM quyết định vô hạn số tools và dừng khi “cảm thấy xong”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 58 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao cần terminal states rõ?

<details><summary>Xem đáp án</summary>

Cho phép retry/recovery và giám sát workflow có trạng thái xác định.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Workflow moves queued→running→waiting_approval→done.
- [ ] Lỗi `Để LLM quyết định vô hạn số tools và dừng khi “cảm thấy xong”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 57 đã được lưu.

<a id="day-58"></a>

### Ngày 58 — Task decomposition

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Planning agent cần tách subtasks dựa dependency graph và mục tiêu kiểm chứng; parallelism chỉ hữu ích khi shared state không xung đột.

**Vì sao phải học:** Agent phân tích issue “Order inconsistent after broker outage”, tạo subtasks read-only có owner, prerequisites, outputs; không triển khai ngay.

**Quy tắc phải tự giải thích được:** Plans are untrusted until checked against allowed tools. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chia subagents chỉ theo số lượng mà không quản lý dependencies. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-57.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Planner returns bounded task list with explicit dependencies. Cân nhắc trường hợp lỗi `Chia subagents chỉ theo số lượng mà không quản lý dependencies`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/task-planner.ts` và `docs/learning/day-58.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/task-planner.ts`
- `packages/agents/tests/task-planner.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 58 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 58: Task decomposition
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-57.md` đã duyệt
MỤC TIÊU: Agent phân tích issue “Order inconsistent after broker outage”, tạo subtasks read-only có owner, prerequisites, outputs; không triển khai ngay.

YÊU CẦU RIÊNG:
Phân rã điều tra sự cố order không phát event sau DB commit thành tasks: inspect outbox, verify publisher, DLQ, consumer dedup, replay test. Sắp xếp theo dependencies, xác định can-parallel và gate approval.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/task-planner.ts
  2. packages/agents/tests/task-planner.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Planner returns bounded task list with explicit dependencies
QUY TẮC QUYẾT ĐỊNH: Plans are untrusted until checked against allowed tools
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Planner returns bounded task list with explicit dependencies.
- **Luận cứ để chọn thiết kế:** Plans are untrusted until checked against allowed tools.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chia subagents chỉ theo số lượng mà không quản lý dependencies` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chia subagents chỉ theo số lượng mà không quản lý dependencies`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 59 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Dấu hiệu task nên chạy tuần tự?

<details><summary>Xem đáp án</summary>

Cần đầu ra/định nghĩa của task trước hoặc có shared mutable state.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Planner returns bounded task list with explicit dependencies.
- [ ] Lỗi `Chia subagents chỉ theo số lượng mà không quản lý dependencies` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 58 đã được lưu.

<a id="day-59"></a>

### Ngày 59 — Persistence và memory

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Conversation context không phải durable business state; checkpoint cần lưu plan/task status/tool outputs tham chiếu an toàn. Memory ngắn hạn và dài hạn có retention/privacy khác nhau.

**Vì sao phải học:** Nhờ AI tạo persistence schema cho agent runs và checkpoints, hỗ trợ resume sau crash bằng mock.

**Quy tắc phải tự giải thích được:** Agent memory does not replace durable state. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Lưu toàn bộ prompt/response chứa secrets mãi mãi. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-58.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Process restart resumes without executing completed tool twice. Cân nhắc trường hợp lỗi `Lưu toàn bộ prompt/response chứa secrets mãi mãi`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/checkpoint-store.ts` và `docs/learning/day-59.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/checkpoint-store.ts`
- `packages/agents/tests/resume.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 59 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 59: Persistence và memory
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-58.md` đã duyệt
MỤC TIÊU: Nhờ AI tạo persistence schema cho agent runs và checkpoints, hỗ trợ resume sau crash bằng mock.

YÊU CẦU RIÊNG:
Thiết kế tables `agent_runs`, `agent_steps` (runId, state, toolName, sanitizedInputRef, resultRef, status, timestamps) và retention policy. Implement resume test sau simulated crash giữa read tool và final response.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/checkpoint-store.ts
  2. packages/agents/tests/resume.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Process restart resumes without executing completed tool twice
QUY TẮC QUYẾT ĐỊNH: Agent memory does not replace durable state
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Process restart resumes without executing completed tool twice.
- **Luận cứ để chọn thiết kế:** Agent memory does not replace durable state.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Lưu toàn bộ prompt/response chứa secrets mãi mãi` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Lưu toàn bộ prompt/response chứa secrets mãi mãi`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 60 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao state phải bền vững?

<details><summary>Xem đáp án</summary>

Để phục hồi sau process crash và tránh thực thi lại thao tác quan trọng.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Process restart resumes without executing completed tool twice.
- [ ] Lỗi `Lưu toàn bộ prompt/response chứa secrets mãi mãi` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 59 đã được lưu.

<a id="day-60"></a>

### Ngày 60 — Human approvals

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Human-in-the-loop cần mô tả action, data diff, impact, expiry, approver và replay protection. Approval chỉ hợp lệ cho chính request scope được hiển thị.

**Vì sao phải học:** Agent thêm approval gate trước mọi write tool, tạo UI/API approve/reject và audit.

**Quy tắc phải tự giải thích được:** An LLM's text cannot self-approve a task. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Agent xin duyệt “thực hiện mọi hành động cần thiết” không liệt kê cụ thể. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-59.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Destructive actions remain blocked until user approval. Cân nhắc trường hợp lỗi `Agent xin duyệt “thực hiện mọi hành động cần thiết” không liệt kê cụ thể`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/approval-gate.ts` và `docs/learning/day-60.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/approval-gate.ts`
- `packages/agents/tests/approval.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 60 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 60: Human approvals
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-59.md` đã duyệt
MỤC TIÊU: Agent thêm approval gate trước mọi write tool, tạo UI/API approve/reject và audit.

YÊU CẦU RIÊNG:
Thiết kế `POST /agent-runs/:id/approve` chỉ cho phép reviewer authorized duyệt action có hash của arguments và TTL. Nếu arguments đổi, approval hết hiệu lực. Test double approval, expired approval, role mismatch.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/approval-gate.ts
  2. packages/agents/tests/approval.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Destructive actions remain blocked until user approval
QUY TẮC QUYẾT ĐỊNH: An LLM's text cannot self-approve a task
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Destructive actions remain blocked until user approval.
- **Luận cứ để chọn thiết kế:** An LLM's text cannot self-approve a task.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Agent xin duyệt “thực hiện mọi hành động cần thiết” không liệt kê cụ thể` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Agent xin duyệt “thực hiện mọi hành động cần thiết” không liệt kê cụ thể`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 61 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Approval cần ràng buộc theo gì?

<details><summary>Xem đáp án</summary>

Actor, action, exact arguments, thời hạn và identity của người duyệt.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Destructive actions remain blocked until user approval.
- [ ] Lỗi `Agent xin duyệt “thực hiện mọi hành động cần thiết” không liệt kê cụ thể` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 60 đã được lưu.

<a id="day-61"></a>

### Ngày 61 — Reliable workflows

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Retry/backoff, idempotency và compensation cần được định nghĩa theo từng step; cache/retry không thay transaction. Dead-letter và manual resolution cho lỗi vĩnh viễn.

**Vì sao phải học:** Nhờ Claude xây workflow read-analyze-propose và mock write action có approval; inject timeout/duplicate callbacks để test.

**Quy tắc phải tự giải thích được:** Whole-workflow replay may duplicate side effects. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Retry toàn bộ workflow sau khi action ghi thành công dẫn đến tác động hai lần. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-60.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Transient 429 retries; permission errors never retry automatically. Cân nhắc trường hợp lỗi `Retry toàn bộ workflow sau khi action ghi thành công dẫn đến tác động hai lần`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/retry-policy.ts` và `docs/learning/day-61.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/retry-policy.ts`
- `packages/agents/tests/retry.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 61 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 61: Reliable workflows
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-60.md` đã duyệt
MỤC TIÊU: Nhờ Claude xây workflow read-analyze-propose và mock write action có approval; inject timeout/duplicate callbacks để test.

YÊU CẦU RIÊNG:
Tạo workflow xử lý yêu cầu hoàn hàng giả lập: validate→collect facts→propose→approval→record decision. Persist step idempotency keys, exponential backoff với jitter và max attempts. Mô phỏng fail sau DB commit.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/retry-policy.ts
  2. packages/agents/tests/retry.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Transient 429 retries; permission errors never retry automatically
QUY TẮC QUYẾT ĐỊNH: Whole-workflow replay may duplicate side effects
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Transient 429 retries; permission errors never retry automatically.
- **Luận cứ để chọn thiết kế:** Whole-workflow replay may duplicate side effects.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Retry toàn bộ workflow sau khi action ghi thành công dẫn đến tác động hai lần` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Retry toàn bộ workflow sau khi action ghi thành công dẫn đến tác động hai lần`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 62 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào không retry?

<details><summary>Xem đáp án</summary>

Permanent validation/auth errors hoặc side effect không có idempotency guarantee.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Transient 429 retries; permission errors never retry automatically.
- [ ] Lỗi `Retry toàn bộ workflow sau khi action ghi thành công dẫn đến tác động hai lần` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 61 đã được lưu.

<a id="day-62"></a>

### Ngày 62 — Agent tool sandbox

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Sandbox giảm blast radius bằng filesystem/network/process restrictions; prompt instructions không phải biện pháp bảo mật cứng. Access token scope tối thiểu và network egress policy.

**Vì sao phải học:** Giao AI thiết kế sandbox read-only analysis tools, thử untrusted README chứa hướng dẫn sai để kiểm guardrails.

**Quy tắc phải tự giải thích được:** Sandbox policy must be externally enforced. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tin prompt “don't read secrets” là đủ để sandbox file access. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-61.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Forbidden file writes and network hosts rejected. Cân nhắc trường hợp lỗi `Tin prompt “don't read secrets” là đủ để sandbox file access`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/agents/src/tool-sandbox.ts` và `docs/learning/day-62.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/agents/src/tool-sandbox.ts`
- `packages/agents/tests/sandbox.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 62 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 62: Agent tool sandbox
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-61.md` đã duyệt
MỤC TIÊU: Giao AI thiết kế sandbox read-only analysis tools, thử untrusted README chứa hướng dẫn sai để kiểm guardrails.

YÊU CẦU RIÊNG:
Tạo policy sandbox cho code analysis agent: chỉ đọc `apps/api/src`, không đọc `.env`, không network egress trừ domains đã duyệt, command timeout. Test một README chứa prompt injection yêu cầu in secrets; ghi kết quả observed.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/agents/src/tool-sandbox.ts
  2. packages/agents/tests/sandbox.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Forbidden file writes and network hosts rejected
QUY TẮC QUYẾT ĐỊNH: Sandbox policy must be externally enforced
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Forbidden file writes and network hosts rejected.
- **Luận cứ để chọn thiết kế:** Sandbox policy must be externally enforced.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tin prompt “don't read secrets” là đủ để sandbox file access` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tin prompt “don't read secrets” là đủ để sandbox file access`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 63 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Quyền least privilege phải enforce ở đâu?

<details><summary>Xem đáp án</summary>

Operating environment/tool runtime và credential scopes.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Forbidden file writes and network hosts rejected.
- [ ] Lỗi `Tin prompt “don't read secrets” là đủ để sandbox file access` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 62 đã được lưu.

<a id="day-63"></a>

### Ngày 63 — Agent capstone

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Demo agent phải có measurable task success, human approval, bounded tools và failure recovery; UI hấp dẫn không thay logs và tests.

**Vì sao phải học:** AI hoàn thiện Order Support Agent dùng RAG policy + MCP order lookup + approval for simulated follow-up; chạy 20-case eval.

**Quy tắc phải tự giải thích được:** Observe actual task history, not a narrative generated by LLM. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** “Demo hoạt động” nhưng không có regression test cho unauthorized order. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-62.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Demo shows interrupted workflow resumed after approval. Cân nhắc trường hợp lỗi `“Demo hoạt động” nhưng không có regression test cho unauthorized order`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/agent-workflow-demo.md` và `docs/learning/day-63.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/agent-workflow-demo.md`
- `docs/learning/week-09-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 63 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 63: Agent capstone
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-62.md` đã duyệt
MỤC TIÊU: AI hoàn thiện Order Support Agent dùng RAG policy + MCP order lookup + approval for simulated follow-up; chạy 20-case eval.

YÊU CẦU RIÊNG:
Tích hợp agent: buyer hỏi tình trạng đơn→authorized MCP; hỏi chính sách đổi trả→RAG citations; yêu cầu thao tác nhạy cảm→propose + approval. Ghi trace và eval scores. Không thực hiện refund/payment thật.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/agent-workflow-demo.md
  2. docs/learning/week-09-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Demo shows interrupted workflow resumed after approval
QUY TẮC QUYẾT ĐỊNH: Observe actual task history, not a narrative generated by LLM
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Demo shows interrupted workflow resumed after approval.
- **Luận cứ để chọn thiết kế:** Observe actual task history, not a narrative generated by LLM.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `“Demo hoạt động” nhưng không có regression test cho unauthorized order` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `“Demo hoạt động” nhưng không có regression test cho unauthorized order`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 64 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Phân biệt agent demo và agent có kiểm soát?

<details><summary>Xem đáp án</summary>

Agent có state, permissions, limits, telemetry, tests và recovery.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Demo shows interrupted workflow resumed after approval.
- [ ] Lỗi `“Demo hoạt động” nhưng không có regression test cho unauthorized order` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 63 đã được lưu.

<a id="week-10"></a>
