# TUẦN 02 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 02 — Skills, Hooks, Subagents, Reviews
> **Gate:** Thử nghiệm trên sandbox; không coi hook hay skill là security boundary.  
> **Official docs:** https://code.claude.com/docs/en/skills
**Chọn ngày học:** [Ngày 08](#day-08) · [Ngày 09](#day-09) · [Ngày 10](#day-10) · [Ngày 11](#day-11) · [Ngày 12](#day-12) · [Ngày 13](#day-13) · [Ngày 14](#day-14)

<a id="day-08"></a>

### Ngày 08 — Skills và quy trình tái sử dụng

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Skill là quy trình chuyên môn đóng gói cho tác vụ lặp; không nên thay project instructions bằng hàng loạt skills. Skill tốt có trigger, inputs, checks và output contract.

**Vì sao phải học:** Nhờ Claude tạo skill review REST API NestJS: đọc DTO/guard/service, kiểm tra 400/401/403/404/409, tests và backward compatibility.

**Quy tắc phải tự giải thích được:** A skill is guidance, not a CI enforcement mechanism. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Skill review gây thay đổi source hoặc báo lỗi không có reproduction. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-07.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Skill review outputs finding, file:line, evidence, severity, suggested test. Cân nhắc trường hợp lỗi `Skill review gây thay đổi source hoặc báo lỗi không có reproduction`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `.claude/skills/nestjs-api-review/SKILL.md` và `docs/learning/day-08.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `.claude/skills/nestjs-api-review/SKILL.md`
- `docs/learning/day-08.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 08 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 08: Skills và quy trình tái sử dụng
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-07.md` đã duyệt
MỤC TIÊU: Nhờ Claude tạo skill review REST API NestJS: đọc DTO/guard/service, kiểm tra 400/401/403/404/409, tests và backward compatibility.

YÊU CẦU RIÊNG:
Đề xuất một Claude Code skill tên `nestjs-api-review`. Viết hướng dẫn sử dụng, inputs, các bước kiểm tra code thực, báo cáo findings theo severity/evidence; tránh tự động sửa code. Chỉ dùng đường dẫn/cấu trúc skill đã kiểm chứng trong docs của phiên bản đang chạy.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. .claude/skills/nestjs-api-review/SKILL.md
  2. docs/learning/day-08.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Skill review outputs finding, file:line, evidence, severity, suggested test
QUY TẮC QUYẾT ĐỊNH: A skill is guidance, not a CI enforcement mechanism
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Skill review outputs finding, file:line, evidence, severity, suggested test.
- **Luận cứ để chọn thiết kế:** A skill is guidance, not a CI enforcement mechanism.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Skill review gây thay đổi source hoặc báo lỗi không có reproduction` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Skill review gây thay đổi source hoặc báo lỗi không có reproduction`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 9 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Skill khác `CLAUDE.md` ở đâu?

<details><summary>Xem đáp án</summary>

Skill đóng gói workflow chuyên biệt; CLAUDE.md chứa hướng dẫn ổn định cho dự án.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Skill review outputs finding, file:line, evidence, severity, suggested test.
- [ ] Lỗi `Skill review gây thay đổi source hoặc báo lỗi không có reproduction` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 08 đã được lưu.

<a id="day-09"></a>

### Ngày 09 — Subagents và phân vai

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Subagent nên được giao trách nhiệm hẹp, context riêng và output định dạng; không nên tạo “hội đồng” cho task tầm thường. Reviewer độc lập phải đọc diff/source thay vì tin summary của implementer.

**Vì sao phải học:** Tạo hai vai analyst và test reviewer; dùng trên RFC availability, phân biệt phát hiện có chứng cứ và ý kiến.

**Quy tắc phải tự giải thích được:** Role separation does not replace permission boundaries. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Nhiều subagents đồng thuận nhưng cùng dùng một summary sai làm nguồn duy nhất. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-08.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Reviewer may inspect allowed code but must not execute write operations. Cân nhắc trường hợp lỗi `Nhiều subagents đồng thuận nhưng cùng dùng một summary sai làm nguồn duy nhất`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `.claude/agents/security-reviewer.md` và `docs/learning/day-09.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `.claude/agents/security-reviewer.md`
- `docs/learning/day-09.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 09 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 09: Subagents và phân vai
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-08.md` đã duyệt
MỤC TIÊU: Tạo hai vai analyst và test reviewer; dùng trên RFC availability, phân biệt phát hiện có chứng cứ và ý kiến.

YÊU CẦU RIÊNG:
Hãy đề xuất hai subagents: `contract-analyst` chỉ đọc API/DTO và `test-critic` kiểm tra edge cases. Nêu permissions tối thiểu, input artifacts, output schema; không cho cả hai sửa file. Nếu công cụ hiện tại thiếu feature subagent, mô phỏng bằng hai sessions tách biệt.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. .claude/agents/security-reviewer.md
  2. docs/learning/day-09.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Reviewer may inspect allowed code but must not execute write operations
QUY TẮC QUYẾT ĐỊNH: Role separation does not replace permission boundaries
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Reviewer may inspect allowed code but must not execute write operations.
- **Luận cứ để chọn thiết kế:** Role separation does not replace permission boundaries.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Nhiều subagents đồng thuận nhưng cùng dùng một summary sai làm nguồn duy nhất` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Nhiều subagents đồng thuận nhưng cùng dùng một summary sai làm nguồn duy nhất`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 10 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào không nên dùng subagent?

<details><summary>Xem đáp án</summary>

Khi tác vụ nhỏ, context đủ và chi phí phối hợp lớn hơn giá trị review.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Reviewer may inspect allowed code but must not execute write operations.
- [ ] Lỗi `Nhiều subagents đồng thuận nhưng cùng dùng một summary sai làm nguồn duy nhất` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 09 đã được lưu.

<a id="day-10"></a>

### Ngày 10 — Git worktrees và parallel tasks

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Git worktree tạo working directories riêng cho các branch; vẫn có rủi ro shared DB, shared cache, port và interface conflict. Song song hiệu quả khi các tác vụ ít phụ thuộc nhau.

**Vì sao phải học:** Tạo worktree cho branch `feat/catalog-filter` và `test/catalog-filter`, cho hai sessions độc lập phân tích code và viết test plan, không dùng chung port/database.

**Quy tắc phải tự giải thích được:** Separate working trees do not isolate external databases. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Cho hai agent chạy migration cùng một database development. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-09.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Worktrees feat/inventory and review/inventory point to different branches. Cân nhắc trường hợp lỗi `Cho hai agent chạy migration cùng một database development`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/worktrees.md` và `docs/learning/day-10.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/worktrees.md`
- `docs/learning/day-10.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 10 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 10: Git worktrees và parallel tasks
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-09.md` đã duyệt
MỤC TIÊU: Tạo worktree cho branch `feat/catalog-filter` và `test/catalog-filter`, cho hai sessions độc lập phân tích code và viết test plan, không dùng chung port/database.

YÊU CẦU RIÊNG:
Kiểm tra trạng thái repo, tạo 2 worktrees với tên branch khác nhau, cho mỗi agent làm trong cwd riêng. Yêu cầu một bên đề xuất lọc catalog, bên kia viết test contract. Không merge trước khi hai bên hoàn thành và kiểm tra diff.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/worktrees.md
  2. docs/learning/day-10.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Worktrees feat/inventory and review/inventory point to different branches
QUY TẮC QUYẾT ĐỊNH: Separate working trees do not isolate external databases
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Worktrees feat/inventory and review/inventory point to different branches.
- **Luận cứ để chọn thiết kế:** Separate working trees do not isolate external databases.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Cho hai agent chạy migration cùng một database development` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Cho hai agent chạy migration cùng một database development`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 11 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Worktree cô lập thứ gì và không cô lập thứ gì?

<details><summary>Xem đáp án</summary>

Cô lập working directory/branch, không tự cô lập database, ports hay external services.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Worktrees feat/inventory and review/inventory point to different branches.
- [ ] Lỗi `Cho hai agent chạy migration cùng một database development` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 10 đã được lưu.

<a id="day-11"></a>

### Ngày 11 — Hooks và guardrails

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Hook là điểm chạy kiểm tra tự động theo event được công cụ hỗ trợ, nhưng không thay permissions/sandbox. Guardrail phải có fail-safe, phạm vi hợp lý, test với lệnh vô hại.

**Vì sao phải học:** Thiết kế hook chặn thao tác trên `.env`, migration destructive và deployment production; thử trong sandbox với các trường hợp mô phỏng.

**Quy tắc phải tự giải thích được:** Config syntax and hook behavior must be verified against current docs. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tin rằng regex hook đủ phát hiện mọi lệnh nguy hiểm kể cả obfuscation. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-10.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Hook blocks a deliberately prohibited destructive operation in sandbox test. Cân nhắc trường hợp lỗi `Tin rằng regex hook đủ phát hiện mọi lệnh nguy hiểm kể cả obfuscation`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `.claude/settings.json` và `docs/learning/day-11.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `.claude/settings.json`
- `docs/learning/day-11.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 11 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 11: Hooks và guardrails
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-10.md` đã duyệt
MỤC TIÊU: Thiết kế hook chặn thao tác trên `.env`, migration destructive và deployment production; thử trong sandbox với các trường hợp mô phỏng.

YÊU CẦU RIÊNG:
Xác minh hooks lifecycle và format config trong Claude Code phiên bản hiện tại. Đề xuất guardrail cho write/edit vào file secrets và các lệnh phá hủy. Tạo test table gồm allowed/blocked/cannot-detect; chỉ cài khi tôi duyệt. Không thử xóa thật dữ liệu.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. .claude/settings.json
  2. docs/learning/day-11.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Hook blocks a deliberately prohibited destructive operation in sandbox test
QUY TẮC QUYẾT ĐỊNH: Config syntax and hook behavior must be verified against current docs
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Hook blocks a deliberately prohibited destructive operation in sandbox test.
- **Luận cứ để chọn thiết kế:** Config syntax and hook behavior must be verified against current docs.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tin rằng regex hook đủ phát hiện mọi lệnh nguy hiểm kể cả obfuscation` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tin rằng regex hook đủ phát hiện mọi lệnh nguy hiểm kể cả obfuscation`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 12 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Tại sao hook không thay sandbox?

<details><summary>Xem đáp án</summary>

Hook chỉ kiểm tra được những event/đường gọi mà nó thực sự quan sát; sandbox chặn quyền ở tầng môi trường.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Hook blocks a deliberately prohibited destructive operation in sandbox test.
- [ ] Lỗi `Tin rằng regex hook đủ phát hiện mọi lệnh nguy hiểm kể cả obfuscation` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 11 đã được lưu.

<a id="day-12"></a>

### Ngày 12 — AI-generated tests

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Test do cùng agent viết code tạo ra có thể “đồng lõa” với bug. Ưu tiên behavior-based tests từ acceptance criteria và thêm negative tests do reviewer độc lập đề xuất.

**Vì sao phải học:** Nhờ Claude thêm tests cho DTO phân trang và inventory availability, dùng Nest testing utilities; test mock và integration tách bạch.

**Quy tắc phải tự giải thích được:** A generated test should fail on an intentionally broken implementation. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** AI sửa kỳ vọng test để khớp code sai thay vì sửa bug. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-11.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Tests verify quantity=0 returns 400, insufficient stock returns 409. Cân nhắc trường hợp lỗi `AI sửa kỳ vọng test để khớp code sai thay vì sửa bug`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `tests/inventory-regression.test.ts` và `docs/learning/day-12.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `tests/inventory-regression.test.ts`
- `docs/test-plans/inventory-regression.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 12 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 12: AI-generated tests
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-11.md` đã duyệt
MỤC TIÊU: Nhờ Claude thêm tests cho DTO phân trang và inventory availability, dùng Nest testing utilities; test mock và integration tách bạch.

YÊU CẦU RIÊNG:
Từ RFC đã duyệt, viết unit tests cho validation và service, cùng integration test cho HTTP status. Tạo test matrix trước, không sửa logic production để làm tests pass. Chạy đúng scripts trong package.json và in exit code.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. tests/inventory-regression.test.ts
  2. docs/test-plans/inventory-regression.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Tests verify quantity=0 returns 400, insufficient stock returns 409
QUY TẮC QUYẾT ĐỊNH: A generated test should fail on an intentionally broken implementation
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Tests verify quantity=0 returns 400, insufficient stock returns 409.
- **Luận cứ để chọn thiết kế:** A generated test should fail on an intentionally broken implementation.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `AI sửa kỳ vọng test để khớp code sai thay vì sửa bug` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `AI sửa kỳ vọng test để khớp code sai thay vì sửa bug`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 13 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Test nào phát hiện over-reservation?

<details><summary>Xem đáp án</summary>

Concurrency test gửi requests đồng thời và kiểm tra tổng reserved không vượt quantity.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Tests verify quantity=0 returns 400, insufficient stock returns 409.
- [ ] Lỗi `AI sửa kỳ vọng test để khớp code sai thay vì sửa bug` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 12 đã được lưu.

<a id="day-13"></a>

### Ngày 13 — AI code review và phản biện

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Review độc lập phải có scope, severity, steps to reproduce và đề xuất test. Model disagreement giải quyết bằng evidence, không bỏ phiếu theo số model.

**Vì sao phải học:** Giao Claude tạo diff nhỏ trong catalog, dùng Codex (nếu có) review riêng, rồi phân loại finding thành confirmed/rejected/needs-info.

**Quy tắc phải tự giải thích được:** Disagreements between models require evidence, not voting. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Kết luận PR an toàn chỉ vì AI reviewer nói “LGTM”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-12.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Findings include reproducible scenarios, not generic suggestions. Cân nhắc trường hợp lỗi `Kết luận PR an toàn chỉ vì AI reviewer nói “LGTM”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reviews/order-review.md` và `docs/learning/day-13.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reviews/order-review.md`
- `docs/learning/day-13.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 13 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 13: AI code review và phản biện
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-12.md` đã duyệt
MỤC TIÊU: Giao Claude tạo diff nhỏ trong catalog, dùng Codex (nếu có) review riêng, rồi phân loại finding thành confirmed/rejected/needs-info.

YÊU CẦU RIÊNG:
Review diff trên branch `feat/catalog-filter` mà không đọc mô tả tự đánh giá của implementer. Tìm authorization bypass, invalid filters, unstable pagination, N+1, missing tests. Mỗi finding phải có file:line hoặc command tái hiện và mức độ ảnh hưởng. Không tự sửa.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reviews/order-review.md
  2. docs/learning/day-13.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Findings include reproducible scenarios, not generic suggestions
QUY TẮC QUYẾT ĐỊNH: Disagreements between models require evidence, not voting
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Findings include reproducible scenarios, not generic suggestions.
- **Luận cứ để chọn thiết kế:** Disagreements between models require evidence, not voting.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Kết luận PR an toàn chỉ vì AI reviewer nói “LGTM”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Kết luận PR an toàn chỉ vì AI reviewer nói “LGTM”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 14 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Cách xử lý hai model nhận định trái ngược?

<details><summary>Xem đáp án</summary>

Tái hiện bằng code, docs, acceptance criteria và tests độc lập.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Findings include reproducible scenarios, not generic suggestions.
- [ ] Lỗi `Kết luận PR an toàn chỉ vì AI reviewer nói “LGTM”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 13 đã được lưu.

<a id="day-14"></a>

### Ngày 14 — Lab tuần 2: PR hoàn chỉnh

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

PR là bằng chứng thay đổi được review: mô tả scope, compatibility, tests, security và rollback. Quality gate phải chạy trên branch thực, không chỉ ở chat.

**Vì sao phải học:** Cho Claude Code hoàn thành feature catalog filtering dựa trên RFC, reviewer thứ hai kiểm tra, mở PR nháp nếu được kết nối GitHub và người học cho phép.

**Quy tắc phải tự giải thích được:** Do not auto-merge based solely on AI review. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Feature “xong” nhưng PR làm hỏng các client cũ hoặc query performance không được xem xét. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-13.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Pull request includes diff, test commands, exit codes, unresolved risks. Cân nhắc trường hợp lỗi `Feature “xong” nhưng PR làm hỏng các client cũ hoặc query performance không được xem xét`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/prs/inventory-pr.md` và `docs/learning/day-14.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/prs/inventory-pr.md`
- `docs/learning/week-02-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 14 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 14: Lab tuần 2: PR hoàn chỉnh
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-13.md` đã duyệt
MỤC TIÊU: Cho Claude Code hoàn thành feature catalog filtering dựa trên RFC, reviewer thứ hai kiểm tra, mở PR nháp nếu được kết nối GitHub và người học cho phép.

YÊU CẦU RIÊNG:
Triển khai `GET /products?brandId=&categoryId=` theo patterns thực tế, validate DTO, giữ response cũ, thêm positive/negative tests. Không push nếu chưa được tôi chấp thuận. Chuẩn bị PR body: objective, files, tests, API examples, risks và rollback.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/prs/inventory-pr.md
  2. docs/learning/week-02-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Pull request includes diff, test commands, exit codes, unresolved risks
QUY TẮC QUYẾT ĐỊNH: Do not auto-merge based solely on AI review
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Pull request includes diff, test commands, exit codes, unresolved risks.
- **Luận cứ để chọn thiết kế:** Do not auto-merge based solely on AI review.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Feature “xong” nhưng PR làm hỏng các client cũ hoặc query performance không được xem xét` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Feature “xong” nhưng PR làm hỏng các client cũ hoặc query performance không được xem xét`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 15 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Những bằng chứng tối thiểu để merge feature?

<details><summary>Xem đáp án</summary>

Acceptance criteria, test commands+results, diff review, backward compatibility và rủi ro còn lại.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Pull request includes diff, test commands, exit codes, unresolved risks.
- [ ] Lỗi `Feature “xong” nhưng PR làm hỏng các client cũ hoặc query performance không được xem xét` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 14 đã được lưu.

<a id="week-03"></a>
