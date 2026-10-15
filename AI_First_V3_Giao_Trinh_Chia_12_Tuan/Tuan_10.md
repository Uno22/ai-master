# TUẦN 10 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 10 — Evals, Security, Quality
> **Gate:** P0/P1 blocking, quality measurement có nguồn/định nghĩa.  
> **Official docs:** https://owasp.org/www-project-top-10-for-large-language-model-applications/
**Chọn ngày học:** [Ngày 64](#day-64) · [Ngày 65](#day-65) · [Ngày 66](#day-66) · [Ngày 67](#day-67) · [Ngày 68](#day-68) · [Ngày 69](#day-69) · [Ngày 70](#day-70)

<a id="day-64"></a>

### Ngày 64 — Evaluation design

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Eval xác định dataset, ground truth, rubric, stratification, pass thresholds và regression policy. LLM-as-judge là tín hiệu hỗ trợ, không là nguồn sự thật tuyệt đối.

**Vì sao phải học:** Dùng AI dựng 50 golden cases chia extraction, RAG, tool selection, refusals và multi-turn; định nghĩa metrics.

**Quy tắc phải tự giải thích được:** Hold out a test set to limit evaluator overfitting. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng 5 prompt đẹp để tuyên bố production quality. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-63.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Cases have caseId, input, expected criteria, severity and source. Cân nhắc trường hợp lỗi `Dùng 5 prompt đẹp để tuyên bố production quality`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `evals/golden-cases.jsonl` và `docs/learning/day-64.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `evals/golden-cases.jsonl`
- `evals/README.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 64 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 64: Evaluation design
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-63.md` đã duyệt
MỤC TIÊU: Dùng AI dựng 50 golden cases chia extraction, RAG, tool selection, refusals và multi-turn; định nghĩa metrics.

YÊU CẦU RIÊNG:
Tạo `packages/evals/dataset.jsonl` 50 cases có id/input/expectedType/groundTruth/sourceRef/riskTag; dựng metric schemaValidity, factuality, toolCorrectness, unauthorizedAccess. Đề xuất thresholds trước khi chạy model.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. evals/golden-cases.jsonl
  2. evals/README.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Cases have caseId, input, expected criteria, severity and source
QUY TẮC QUYẾT ĐỊNH: Hold out a test set to limit evaluator overfitting
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Cases have caseId, input, expected criteria, severity and source.
- **Luận cứ để chọn thiết kế:** Hold out a test set to limit evaluator overfitting.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng 5 prompt đẹp để tuyên bố production quality` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng 5 prompt đẹp để tuyên bố production quality`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 65 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao phải đặt threshold trước khi run?

<details><summary>Xem đáp án</summary>

Tránh chỉnh mục tiêu sau khi nhìn kết quả để tạo điểm ảo.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Cases have caseId, input, expected criteria, severity and source.
- [ ] Lỗi `Dùng 5 prompt đẹp để tuyên bố production quality` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 64 đã được lưu.

<a id="day-65"></a>

### Ngày 65 — Model response grading

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Evaluation phải kết hợp deterministic rules (schema, ids, authorization) và review ngữ nghĩa; judge model có bias và variance.

**Vì sao phải học:** Nhờ AI triển khai deterministic graders, manual sampling và optional LLM judge với calibration set.

**Quy tắc phải tự giải thích được:** LLM-as-judge should be calibrated against human labels. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Judge chỉ hỏi “answer có tốt không?” không có rubric/source. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-64.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Schema pass and tool accuracy are scored separately. Cân nhắc trường hợp lỗi `Judge chỉ hỏi “answer có tốt không?” không có rubric/source`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `evals/graders/schema-grader.ts` và `docs/learning/day-65.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `evals/graders/schema-grader.ts`
- `evals/graders/tool-grader.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 65 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 65: Model response grading
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-64.md` đã duyệt
MỤC TIÊU: Nhờ AI triển khai deterministic graders, manual sampling và optional LLM judge với calibration set.

YÊU CẦU RIÊNG:
Xây evaluators: JSON schema validity, citation ID existence, expected tool name, forbidden data leakage. Với câu trả lời tự nhiên, dùng rubric 0–4 và human calibration 10 samples; ghi disagreements.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. evals/graders/schema-grader.ts
  2. evals/graders/tool-grader.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Schema pass and tool accuracy are scored separately
QUY TẮC QUYẾT ĐỊNH: LLM-as-judge should be calibrated against human labels
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Schema pass and tool accuracy are scored separately.
- **Luận cứ để chọn thiết kế:** LLM-as-judge should be calibrated against human labels.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Judge chỉ hỏi “answer có tốt không?” không có rubric/source` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Judge chỉ hỏi “answer có tốt không?” không có rubric/source`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 66 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào cần human adjudication?

<details><summary>Xem đáp án</summary>

Khi judge không nhất quán, case rủi ro cao hoặc lỗi factuality khó tự động xác minh.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Schema pass and tool accuracy are scored separately.
- [ ] Lỗi `Judge chỉ hỏi “answer có tốt không?” không có rubric/source` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 65 đã được lưu.

<a id="day-66"></a>

### Ngày 66 — Adversarial testing

> **75–120 phút · IMPLEMENT · AI: Claude Code + independent security reviewer · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Untrusted RAG pages, tool results và user input có thể cố chỉ dẫn agent bỏ qua policy; quyền thật phải enforce ngoài model.

**Vì sao phải học:** Nhờ agent tạo 30 attack prompts đối với RAG/MCP, chạy sandbox và phân loại exploit success/fail.

**Quy tắc phải tự giải thích được:** Injected instructions are data, not higher-priority commands. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng prompt rules thay thế auth guard của tool executor. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-65.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + independent security reviewer. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Untrusted FAQ text cannot override tool authorization. Cân nhắc trường hợp lỗi `Dùng prompt rules thay thế auth guard của tool executor`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `evals/adversarial/prompt-injection.jsonl` và `docs/learning/day-66.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `evals/adversarial/prompt-injection.jsonl`
- `evals/adversarial/README.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 66 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 66: Adversarial testing
CÔNG CỤ: Claude Code + independent security reviewer | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-65.md` đã duyệt
MỤC TIÊU: Nhờ agent tạo 30 attack prompts đối với RAG/MCP, chạy sandbox và phân loại exploit success/fail.

YÊU CẦU RIÊNG:
Tạo attack dataset: ignore instructions, exfiltrate keys, forged tool outputs, cross-tenant order, role spoofing, HTML/markdown injection. Không chứa secrets thật. Định nghĩa success conditions và safe responses, chạy với mocks/fixture accounts.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. evals/adversarial/prompt-injection.jsonl
  2. evals/adversarial/README.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Untrusted FAQ text cannot override tool authorization
QUY TẮC QUYẾT ĐỊNH: Injected instructions are data, not higher-priority commands
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Untrusted FAQ text cannot override tool authorization.
- **Luận cứ để chọn thiết kế:** Injected instructions are data, not higher-priority commands.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng prompt rules thay thế auth guard của tool executor` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng prompt rules thay thế auth guard của tool executor`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 67 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** RAG tài liệu độc hại là loại input gì?

<details><summary>Xem đáp án</summary>

Untrusted content, không được nâng thành instruction ưu tiên cao.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Untrusted FAQ text cannot override tool authorization.
- [ ] Lỗi `Dùng prompt rules thay thế auth guard của tool executor` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 66 đã được lưu.

<a id="day-67"></a>

### Ngày 67 — Security scanning

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

SAST/secret/dependency scans tìm những lớp rủi ro khác nhau; scan green không thay human security review. Có thể cần SBOM và lockfile review.

**Vì sao phải học:** Claude cấu hình GitHub Actions chạy lint, tests, dependency/secret scan, cảnh báo CVE; giải thích false positives.

**Quy tắc phải tự giải thích được:** Security scanner findings still need triage. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Bỏ qua failing security checks để “CI xanh”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-66.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** CI rejects known critical leak and records false positives. Cân nhắc trường hợp lỗi `Bỏ qua failing security checks để “CI xanh”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `.github/workflows/security.yml` và `docs/learning/day-67.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `.github/workflows/security.yml`
- `docs/security/security-results.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 67 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 67: Security scanning
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-66.md` đã duyệt
MỤC TIÊU: Claude cấu hình GitHub Actions chạy lint, tests, dependency/secret scan, cảnh báo CVE; giải thích false positives.

YÊU CẦU RIÊNG:
Đề xuất scanning pipeline cho TS monorepo: dependency audit, secret scan, SAST/CodeQL nếu có quyền, container scan, license policy. Tạo PR với workflow config, không tự merge hoặc disable failing checks.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. .github/workflows/security.yml
  2. docs/security/security-results.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: CI rejects known critical leak and records false positives
QUY TẮC QUYẾT ĐỊNH: Security scanner findings still need triage
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** CI rejects known critical leak and records false positives.
- **Luận cứ để chọn thiết kế:** Security scanner findings still need triage.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Bỏ qua failing security checks để “CI xanh”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Bỏ qua failing security checks để “CI xanh”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 68 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Secret scanning phát hiện hết secret không?

<details><summary>Xem đáp án</summary>

Không; cần secret management và kiểm tra quyền ngoài detection.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] CI rejects known critical leak and records false positives.
- [ ] Lỗi `Bỏ qua failing security checks để “CI xanh”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 67 đã được lưu.

<a id="day-68"></a>

### Ngày 68 — Load testing

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Load test phải có workload model, realistic data, SLO, arrival patterns và hạ tầng; “1 triệu concurrency” cần định nghĩa rõ. LLM provider quotas/latency là bottleneck độc lập.

**Vì sao phải học:** Dùng k6 hoặc Artillery đo read catalog, checkout COD mock và AI FAQ có mock provider; so p50/p95/error.

**Quy tắc phải tự giải thích được:** Virtual users are not equivalent to concurrent request count. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Đánh đồng 200 VUs với khả năng 200 requests/second hoặc 1 triệu concurrent users. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-67.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Report workload mix, throughput, p95 and error rate on staging. Cân nhắc trường hợp lỗi `Đánh đồng 200 VUs với khả năng 200 requests/second hoặc 1 triệu concurrent users`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `infra/load/catalog-checkout.js` và `docs/learning/day-68.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `infra/load/catalog-checkout.js`
- `docs/reports/load-results.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 68 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 68: Load testing
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-67.md` đã duyệt
MỤC TIÊU: Dùng k6 hoặc Artillery đo read catalog, checkout COD mock và AI FAQ có mock provider; so p50/p95/error.

YÊU CẦU RIÊNG:
Thiết kế 3 workloads (catalog 80%, checkout 15%, AI FAQ 5% ví dụ giả định để điều chỉnh), 50→100→200 VUs trên staging nhỏ, stop thresholds p95/error rate. Tuyệt đối không tạo tải trên prod hay API tính phí khi chưa duyệt.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. infra/load/catalog-checkout.js
  2. docs/reports/load-results.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Report workload mix, throughput, p95 and error rate on staging
QUY TẮC QUYẾT ĐỊNH: Virtual users are not equivalent to concurrent request count
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Report workload mix, throughput, p95 and error rate on staging.
- **Luận cứ để chọn thiết kế:** Virtual users are not equivalent to concurrent request count.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Đánh đồng 200 VUs với khả năng 200 requests/second hoặc 1 triệu concurrent users` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Đánh đồng 200 VUs với khả năng 200 requests/second hoặc 1 triệu concurrent users`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 69 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** VUs khác RPS thế nào?

<details><summary>Xem đáp án</summary>

Virtual users mô phỏng clients; RPS là thông lượng requests thực.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Report workload mix, throughput, p95 and error rate on staging.
- [ ] Lỗi `Đánh đồng 200 VUs với khả năng 200 requests/second hoặc 1 triệu concurrent users` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 68 đã được lưu.

<a id="day-69"></a>

### Ngày 69 — Observability

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Observability AI cần requestId/traceId, prompt version, model usage, tool spans, cost và errors; bảo vệ nội dung nhạy cảm. Metrics không thay traces/logs.

**Vì sao phải học:** Nhờ AI instrument gateway + agents với OpenTelemetry, Prometheus counters, Grafana dashboards và redaction.

**Quy tắc phải tự giải thích được:** Avoid high-cardinality labels such as user IDs. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng raw prompt và userId làm Prometheus label gây rò data/cardinality explosion. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-68.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Trace includes provider/tool spans but never raw prompts or keys. Cân nhắc trường hợp lỗi `Dùng raw prompt và userId làm Prometheus label gây rò data/cardinality explosion`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/observability/observability.module.ts` và `docs/learning/day-69.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/observability/observability.module.ts`
- `docs/observability/dashboards.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 69 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 69: Observability
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-68.md` đã duyệt
MỤC TIÊU: Nhờ AI instrument gateway + agents với OpenTelemetry, Prometheus counters, Grafana dashboards và redaction.

YÊU CẦU RIÊNG:
Instrument spans cho gateway→provider, RAG retrieve/rerank, MCP tool và agent state transitions. Expose metrics latency/error/usage; log metadata tối thiểu không raw prompts/keys. Thiết kế 3 Grafana panels p95 by route, error by provider, estimated spend.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/observability/observability.module.ts
  2. docs/observability/dashboards.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Trace includes provider/tool spans but never raw prompts or keys
QUY TẮC QUYẾT ĐỊNH: Avoid high-cardinality labels such as user IDs
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Trace includes provider/tool spans but never raw prompts or keys.
- **Luận cứ để chọn thiết kế:** Avoid high-cardinality labels such as user IDs.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng raw prompt và userId làm Prometheus label gây rò data/cardinality explosion` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng raw prompt và userId làm Prometheus label gây rò data/cardinality explosion`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 70 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao không dùng prompt làm metric label?

<details><summary>Xem đáp án</summary>

Sensitive/high-cardinality làm tăng chi phí và rủi ro dữ liệu.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Trace includes provider/tool spans but never raw prompts or keys.
- [ ] Lỗi `Dùng raw prompt và userId làm Prometheus label gây rò data/cardinality explosion` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 69 đã được lưu.

<a id="day-70"></a>

### Ngày 70 — Quality gate

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

CI gates cần quy định P0/P1 blocking, eval thresholds, security leaks=0, regression budgets và known limitations. Không nên dùng một overall score che security critical.

**Vì sao phải học:** Dùng AI tổng hợp kết quả 9–10 tuần trước thành quality scorecard; yêu cầu reviewer độc lập xác nhận bằng artifact.

**Quy tắc phải tự giải thích được:** P0 data leakage cannot be offset by a high aggregate score. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chấp nhận phát hiện cross-tenant leak vì score 92/100. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-69.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Explicit GO/NO-GO with thresholds and owner. Cân nhắc trường hợp lỗi `Chấp nhận phát hiện cross-tenant leak vì score 92/100`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/release-quality-gate.md` và `docs/learning/day-70.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/release-quality-gate.md`
- `docs/learning/week-10-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 70 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 70: Quality gate
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-69.md` đã duyệt
MỤC TIÊU: Dùng AI tổng hợp kết quả 9–10 tuần trước thành quality scorecard; yêu cầu reviewer độc lập xác nhận bằng artifact.

YÊU CẦU RIÊNG:
Lập `docs/release-quality-gate.md` gồm tests/coverage, eval metrics, security, p95, error budget, data integrity, DR readiness. Với mỗi gate: threshold, command/dashboard evidence, owner và disposition. Không khai “approved” nếu thiếu dữ liệu.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/release-quality-gate.md
  2. docs/learning/week-10-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Explicit GO/NO-GO with thresholds and owner
QUY TẮC QUYẾT ĐỊNH: P0 data leakage cannot be offset by a high aggregate score
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Explicit GO/NO-GO with thresholds and owner.
- **Luận cứ để chọn thiết kế:** P0 data leakage cannot be offset by a high aggregate score.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chấp nhận phát hiện cross-tenant leak vì score 92/100` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chấp nhận phát hiện cross-tenant leak vì score 92/100`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 71 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Loại lỗi nào không thể bù bằng điểm trung bình?

<details><summary>Xem đáp án</summary>

Data leakage, auth bypass và lỗ hổng nghiêm trọng theo policy.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Explicit GO/NO-GO with thresholds and owner.
- [ ] Lỗi `Chấp nhận phát hiện cross-tenant leak vì score 92/100` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 70 đã được lưu.

<a id="week-11"></a>
