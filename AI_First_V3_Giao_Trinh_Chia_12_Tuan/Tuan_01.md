# TUẦN 01 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 01 — Claude Code Foundations
> **Gate:** Không cho agent ghi file trong bài khảo sát; đầu tiên tạo repo map và rules.  
> **Official docs:** https://code.claude.com/docs/en/overview
**Chọn ngày học:** [Ngày 01](#day-01) · [Ngày 02](#day-02) · [Ngày 03](#day-03) · [Ngày 04](#day-04) · [Ngày 05](#day-05) · [Ngày 06](#day-06) · [Ngày 07](#day-07)

<a id="day-01"></a>

### Ngày 01 — AI-first engineering và trách nhiệm kỹ thuật

> **75–120 phút · READ-ONLY · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Agent gồm model, runtime, tools, môi trường và lớp quyền; model sinh yêu cầu hành động còn runtime mới thực thi. Tiêu chuẩn hoàn thành là artifact và bằng chứng, không phải lời hứa “đã xong”.

**Vì sao phải học:** Dùng Claude Code chỉ đọc để lập sơ đồ các module NestJS hiện có, nhận diện dữ liệu nhạy cảm, operations ghi dữ liệu và các command có rủi ro. Không tạo file.

**Quy tắc phải tự giải thích được:** Never infer module names from an example project. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Nhận xét bảo mật chung chung mà không dẫn đến file/đoạn code cụ thể. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** repository thật + git status baseline; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** GET /catalog is VERIFIED only if a matching controller exists; unknown endpoints stay UNKNOWN. Cân nhắc trường hợp lỗi `Nhận xét bảo mật chung chung mà không dẫn đến file/đoạn code cụ thể`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/learning/day-01.md` và `docs/learning/day-01.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/learning/day-01.md`
- `docs/repo-map.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 01 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 01: AI-first engineering và trách nhiệm kỹ thuật
CÔNG CỤ: Claude Code | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: repository thật + git status baseline
MỤC TIÊU: Dùng Claude Code chỉ đọc để lập sơ đồ các module NestJS hiện có, nhận diện dữ liệu nhạy cảm, operations ghi dữ liệu và các command có rủi ro. Không tạo file.

YÊU CẦU RIÊNG:
Chỉ đọc repository đang mở. Tìm các module auth, catalog, cart, orders và infrastructure thực sự tồn tại. Với mỗi module, trích file path, trách nhiệm, endpoint và dependencies nếu xác minh được. Liệt kê 5 rủi ro có chứng cứ; không tự tưởng tượng Next.js/Kafka nếu repo chưa có. Không sửa hay chạy migration.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/learning/day-01.md
  2. docs/repo-map.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: GET /catalog is VERIFIED only if a matching controller exists; unknown endpoints stay UNKNOWN
QUY TẮC QUYẾT ĐỊNH: Never infer module names from an example project
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** GET /catalog is VERIFIED only if a matching controller exists; unknown endpoints stay UNKNOWN.
- **Luận cứ để chọn thiết kế:** Never infer module names from an example project.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Nhận xét bảo mật chung chung mà không dẫn đến file/đoạn code cụ thể` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Nhận xét bảo mật chung chung mà không dẫn đến file/đoạn code cụ thể`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 2 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Lý do báo cáo agent “tests passed” chưa đủ?

<details><summary>Xem đáp án</summary>

Vì phải biết test nào chạy, exit code, môi trường và coverage, đồng thời đối chiếu với yêu cầu.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] GET /catalog is VERIFIED only if a matching controller exists; unknown endpoints stay UNKNOWN.
- [ ] Lỗi `Nhận xét bảo mật chung chung mà không dẫn đến file/đoạn code cụ thể` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 01 đã được lưu.

<a id="day-02"></a>

### Ngày 02 — Cài đặt Claude Code và xác minh môi trường

> **75–120 phút · READ-ONLY · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

CLI là giao diện đến agent runtime; quyền, cwd và secrets ảnh hưởng trực tiếp đến mức rủi ro. Baseline là trạng thái code trước khi AI thay đổi, dùng để so sánh hồi quy.

**Vì sao phải học:** Đọc hướng dẫn cài đặt chính thức cho hệ điều hành hiện dùng, kiểm tra Node, npm, Git, `claude --version`; cấu hình repo sandbox và lưu kết quả baseline.

**Quy tắc phải tự giải thích được:** Do not install from an unverified shell script. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Copy lệnh cài cũ trên blog hoặc dùng quyền bypass chỉ để “chạy nhanh”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-01.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Record versions and git SHA; a missing Claude CLI is BLOCKED rather than PASS. Cân nhắc trường hợp lỗi `Copy lệnh cài cũ trên blog hoặc dùng quyền bypass chỉ để “chạy nhanh”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/learning/day-02.md` và `docs/learning/day-02.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/learning/day-02.md`
- `docs/environment-readiness.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 02 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 02: Cài đặt Claude Code và xác minh môi trường
CÔNG CỤ: Claude Code | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-01.md` đã duyệt
MỤC TIÊU: Đọc hướng dẫn cài đặt chính thức cho hệ điều hành hiện dùng, kiểm tra Node, npm, Git, `claude --version`; cấu hình repo sandbox và lưu kết quả baseline.

YÊU CẦU RIÊNG:
Tôi muốn chuẩn bị repo này để học AI-first. Trước tiên chỉ kiểm tra `pwd`, `git status`, scripts trong package.json và version runtime; không cài package/khởi động dịch vụ cho đến khi tôi đồng ý. Tạo bảng environment readiness và danh sách bước setup chính thức theo OS hiện tại.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/learning/day-02.md
  2. docs/environment-readiness.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Record versions and git SHA; a missing Claude CLI is BLOCKED rather than PASS
QUY TẮC QUYẾT ĐỊNH: Do not install from an unverified shell script
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Record versions and git SHA; a missing Claude CLI is BLOCKED rather than PASS.
- **Luận cứ để chọn thiết kế:** Do not install from an unverified shell script.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Copy lệnh cài cũ trên blog hoặc dùng quyền bypass chỉ để “chạy nhanh”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Copy lệnh cài cũ trên blog hoặc dùng quyền bypass chỉ để “chạy nhanh”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 3 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Baseline tốt phải lưu những thông tin gì?

<details><summary>Xem đáp án</summary>

Git commit/branch, versions, commands, exit codes và lỗi có sẵn trước thay đổi.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Record versions and git SHA; a missing Claude CLI is BLOCKED rather than PASS.
- [ ] Lỗi `Copy lệnh cài cũ trên blog hoặc dùng quyền bypass chỉ để “chạy nhanh”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 02 đã được lưu.

<a id="day-03"></a>

### Ngày 03 — Prompt contract chuyên nghiệp

> **75–120 phút · READ-ONLY · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Một task tốt cần goal, context có chứng cứ, scope, constraints, acceptance criteria, output format và approval gates. Prompt không thay thế tests nhưng định hướng rõ “definition of done”.

**Vì sao phải học:** Viết ba phiên bản prompt sửa phân trang catalog: mơ hồ, đủ yêu cầu, và có test matrix; chạy chế độ phân tích để đối chiếu câu trả lời agent.

**Quy tắc phải tự giải thích được:** Acceptance criteria must be measurable. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Cho agent quyền thay đổi API contract ngầm mà chưa xác minh clients. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-02.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** GET /products?page=1&limit=20; limit>100 must yield a validation error. Cân nhắc trường hợp lỗi `Cho agent quyền thay đổi API contract ngầm mà chưa xác minh clients`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/prompts/catalog-pagination.md` và `docs/learning/day-03.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/prompts/catalog-pagination.md`
- `docs/learning/day-03.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 03 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 03: Prompt contract chuyên nghiệp
CÔNG CỤ: Claude Code | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-02.md` đã duyệt
MỤC TIÊU: Viết ba phiên bản prompt sửa phân trang catalog: mơ hồ, đủ yêu cầu, và có test matrix; chạy chế độ phân tích để đối chiếu câu trả lời agent.

YÊU CẦU RIÊNG:
Phân tích yêu cầu thêm phân trang `GET /products` cho một API NestJS. Trước khi đề xuất code, kiểm tra route và DTO hiện có. Đưa ra input validation, backward compatibility, giới hạn `limit`, ordering ổn định, query examples, test cases và câu hỏi còn thiếu. Không sửa file.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/prompts/catalog-pagination.md
  2. docs/learning/day-03.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: GET /products?page=1&limit=20; limit>100 must yield a validation error
QUY TẮC QUYẾT ĐỊNH: Acceptance criteria must be measurable
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** GET /products?page=1&limit=20; limit>100 must yield a validation error.
- **Luận cứ để chọn thiết kế:** Acceptance criteria must be measurable.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Cho agent quyền thay đổi API contract ngầm mà chưa xác minh clients` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Cho agent quyền thay đổi API contract ngầm mà chưa xác minh clients`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 4 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Acceptance criteria khác lời mô tả feature thế nào?

<details><summary>Xem đáp án</summary>

Criteria là điều kiện quan sát/kiểm chứng được, không chỉ mong muốn chung.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] GET /products?page=1&limit=20; limit>100 must yield a validation error.
- [ ] Lỗi `Cho agent quyền thay đổi API contract ngầm mà chưa xác minh clients` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 03 đã được lưu.

<a id="day-04"></a>

### Ngày 04 — Explore trước khi sửa

> **75–120 phút · READ-ONLY · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Repo exploration dùng search → inspect → map dependencies → identify invariants. Search result là gợi ý tìm code, không tự chứng minh business rule; phải mở file nguồn.

**Vì sao phải học:** Cho Claude Code truy vết đường đi từ `POST /orders` qua validation, service, repository đến Kafka event; chỉ xuất sơ đồ và rủi ro.

**Quy tắc phải tự giải thích được:** Kafka event and SQL transaction are not automatically atomic. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Gộp việc tạo order và giữ hàng thành “atomic” mà chưa kiểm tra database + Kafka boundary. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-03.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ READ-ONLY:** Chỉ đọc, KHÔNG tạo/sửa file; xuất nguyên report để học viên tự lưu.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Sequence uses confirmed code paths and labels Kafka-outbox as UNKNOWN until checked. Cân nhắc trường hợp lỗi `Gộp việc tạo order và giữ hàng thành “atomic” mà chưa kiểm tra database + Kafka boundary`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/architecture/order-sequence.mmd` và `docs/learning/day-04.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/architecture/order-sequence.mmd`
- `docs/architecture/order-invariants.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 04 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 04: Explore trước khi sửa
CÔNG CỤ: Claude Code | CHẾ ĐỘ: READ-ONLY
INPUT CẦN KIỂM TRA: `docs/learning/day-03.md` đã duyệt
MỤC TIÊU: Cho Claude Code truy vết đường đi từ `POST /orders` qua validation, service, repository đến Kafka event; chỉ xuất sơ đồ và rủi ro.

YÊU CẦU RIÊNG:
Trace toàn bộ request flow tạo đơn hàng từ controller đến persistence và events trong repository hiện tại. Với mỗi bước chỉ ra file path, tên hàm và input/output; nêu thứ tự thao tác giữ hàng, transaction, compensation nếu có. Chỉ phân tích và dừng khi thiếu bằng chứng.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/architecture/order-sequence.mmd
  2. docs/architecture/order-invariants.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Sequence uses confirmed code paths and labels Kafka-outbox as UNKNOWN until checked
QUY TẮC QUYẾT ĐỊNH: Kafka event and SQL transaction are not automatically atomic
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Sequence uses confirmed code paths and labels Kafka-outbox as UNKNOWN until checked.
- **Luận cứ để chọn thiết kế:** Kafka event and SQL transaction are not automatically atomic.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Gộp việc tạo order và giữ hàng thành “atomic” mà chưa kiểm tra database + Kafka boundary` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Gộp việc tạo order và giữ hàng thành “atomic” mà chưa kiểm tra database + Kafka boundary`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 5 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Tại sao `SELECT stock` rồi `UPDATE stock` có thể sai?

<details><summary>Xem đáp án</summary>

Hai request đồng thời có thể cùng đọc tồn kho cũ và cùng giữ vượt giới hạn.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Sequence uses confirmed code paths and labels Kafka-outbox as UNKNOWN until checked.
- [ ] Lỗi `Gộp việc tạo order và giữ hàng thành “atomic” mà chưa kiểm tra database + Kafka boundary` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 04 đã được lưu.

<a id="day-05"></a>

### Ngày 05 — Plan Mode và Architecture Decision Record

> **90–150 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Plan Mode phục vụ tách quyết định thiết kế khỏi hành động sửa code. ADR ghi bối cảnh, lựa chọn, trade-offs, hậu quả; không được dùng ADR như bằng chứng kiến trúc đã đúng.

**Vì sao phải học:** Yêu cầu agent so sánh hai giải pháp idempotency cho create order: unique request key tại DB hay cache Redis; sau đó viết ADR chỉ khi được duyệt.

**Quy tắc phải tự giải thích được:** DB uniqueness is durable; Redis TTL alone is insufficient. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Nhầm “Redis lock” là bảo đảm tuyệt đối không trùng đơn khi TTL hết hoặc process crash. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-04.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Same key/same payload repeats one order; same key/different payload yields conflict. Cân nhắc trường hợp lỗi `Nhầm “Redis lock” là bảo đảm tuyệt đối không trùng đơn khi TTL hết hoặc process crash`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/adr/0001-order-idempotency.md` và `docs/learning/day-05.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/adr/0001-order-idempotency.md`
- `docs/learning/day-05.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 05 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 05: Plan Mode và Architecture Decision Record
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-04.md` đã duyệt
MỤC TIÊU: Yêu cầu agent so sánh hai giải pháp idempotency cho create order: unique request key tại DB hay cache Redis; sau đó viết ADR chỉ khi được duyệt.

YÊU CẦU RIÊNG:
Hãy thiết kế idempotency cho create order. Không code. So sánh phương án A unique constraint DB và B Redis `SET NX` về crash recovery, TTL, concurrent duplicate, audit và consistency. Chọn phương án khuyến nghị cho đúng hệ thống hiện tại; nêu giả định và test matrix. Đưa bản ADR để tôi duyệt.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/adr/0001-order-idempotency.md
  2. docs/learning/day-05.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Same key/same payload repeats one order; same key/different payload yields conflict
QUY TẮC QUYẾT ĐỊNH: DB uniqueness is durable; Redis TTL alone is insufficient
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Same key/same payload repeats one order; same key/different payload yields conflict.
- **Luận cứ để chọn thiết kế:** DB uniqueness is durable; Redis TTL alone is insufficient.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Nhầm “Redis lock” là bảo đảm tuyệt đối không trùng đơn khi TTL hết hoặc process crash` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Nhầm “Redis lock” là bảo đảm tuyệt đối không trùng đơn khi TTL hết hoặc process crash`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 6 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** ADR cần những phần nào?

<details><summary>Xem đáp án</summary>

Context, decision, alternatives, consequences và cách đo/kiểm chứng.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Same key/same payload repeats one order; same key/different payload yields conflict.
- [ ] Lỗi `Nhầm “Redis lock” là bảo đảm tuyệt đối không trùng đơn khi TTL hết hoặc process crash` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 05 đã được lưu.

<a id="day-06"></a>

### Ngày 06 — CLAUDE.md và quản lý context

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Context engineering chọn đúng lượng thông tin: instruction ổn định ở file dự án, facts có nguồn, summary đủ phục hồi; tránh nạp log dài không liên quan. `CLAUDE.md` không phải nơi chứa secrets hay mệnh lệnh vượt quyền.

**Vì sao phải học:** Nhờ Claude đọc thật repository, viết `CLAUDE.md` ngắn mô tả build/test, conventions, protected boundaries; đối chiếu trước khi duyệt.

**Quy tắc phải tự giải thích được:** Instructions must be short, stable, grounded. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Viết file quá dài và chứa hàng trăm instructions xung đột, gây mất context. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-05.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** List only scripts actually found in package.json; no secrets in instructions. Cân nhắc trường hợp lỗi `Viết file quá dài và chứa hàng trăm instructions xung đột, gây mất context`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `CLAUDE.md` và `docs/learning/day-06.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `CLAUDE.md`
- `docs/learning/day-06.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 06 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 06: CLAUDE.md và quản lý context
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-05.md` đã duyệt
MỤC TIÊU: Nhờ Claude đọc thật repository, viết `CLAUDE.md` ngắn mô tả build/test, conventions, protected boundaries; đối chiếu trước khi duyệt.

YÊU CẦU RIÊNG:
Khảo sát các source files và scripts hiện có rồi đề xuất `CLAUDE.md` tối đa khoảng 120 dòng. Chỉ ghi conventions có bằng chứng; phân chia Project overview, Quick commands, Architecture rules, Testing, Security/Permissions. Không lưu secrets hoặc copy .env. Trình bày diff đề xuất trước khi ghi.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. CLAUDE.md
  2. docs/learning/day-06.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: List only scripts actually found in package.json; no secrets in instructions
QUY TẮC QUYẾT ĐỊNH: Instructions must be short, stable, grounded
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** List only scripts actually found in package.json; no secrets in instructions.
- **Luận cứ để chọn thiết kế:** Instructions must be short, stable, grounded.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Viết file quá dài và chứa hàng trăm instructions xung đột, gây mất context` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Viết file quá dài và chứa hàng trăm instructions xung đột, gây mất context`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 7 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào đưa chỉ dẫn vào CLAUDE.md?

<details><summary>Xem đáp án</summary>

Khi quy tắc ổn định, dùng lại thường xuyên và đã xác minh đúng với repo.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] List only scripts actually found in package.json; no secrets in instructions.
- [ ] Lỗi `Viết file quá dài và chứa hàng trăm instructions xung đột, gây mất context` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 06 đã được lưu.

<a id="day-07"></a>

### Ngày 07 — Lab tuần 1: AI lập kế hoạch feature

> **120–180 phút · PLAN · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Feature readiness là tổng hợp hiểu nghiệp vụ, API contracts, test plan và rollout; không đồng nghĩa implement ngay. Bài này chỉ đạt khi có đủ điều kiện để agent khác triển khai mà không đoán.

**Vì sao phải học:** Hoàn thiện spec cho `GET /inventory/availability` gồm authorization, params, response, errors, data source và test plan.

**Quy tắc phải tự giải thích được:** API contract must pin error codes and authorization. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Quyết định sai multi-tenant/contract owner do agent không biết domain. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-06.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ PLAN:** Lập spec, xin duyệt trước khi ghi file; không sửa application code.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** GET /inventory/101 returns available=quantity-reservedQuantity. Cân nhắc trường hợp lỗi `Quyết định sai multi-tenant/contract owner do agent không biết domain`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/rfc/inventory-availability.md` và `docs/learning/day-07.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/rfc/inventory-availability.md`
- `docs/test-plans/inventory-availability.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 07 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 07: Lab tuần 1: AI lập kế hoạch feature
CÔNG CỤ: Claude Code | CHẾ ĐỘ: PLAN
INPUT CẦN KIỂM TRA: `docs/learning/day-06.md` đã duyệt
MỤC TIÊU: Hoàn thiện spec cho `GET /inventory/availability` gồm authorization, params, response, errors, data source và test plan.

YÊU CẦU RIÊNG:
Từ kết quả 6 ngày trước, viết RFC cho API tra tồn kho khả dụng theo productItemId. Dẫn source path của model và auth guard hiện có. Đưa API examples, SQL invariant, 8 tests và danh sách câu hỏi cần quyết định; không sửa code trước approval.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/rfc/inventory-availability.md
  2. docs/test-plans/inventory-availability.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: GET /inventory/101 returns available=quantity-reservedQuantity
QUY TẮC QUYẾT ĐỊNH: API contract must pin error codes and authorization
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** GET /inventory/101 returns available=quantity-reservedQuantity.
- **Luận cứ để chọn thiết kế:** API contract must pin error codes and authorization.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Quyết định sai multi-tenant/contract owner do agent không biết domain` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Quyết định sai multi-tenant/contract owner do agent không biết domain`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 8 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Điều kiện nào cần chốt trước khi code availability endpoint?

<details><summary>Xem đáp án</summary>

Auth scope, identifier, inventory source, response contract và xử lý dữ liệu bất thường.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] GET /inventory/101 returns available=quantity-reservedQuantity.
- [ ] Lỗi `Quyết định sai multi-tenant/contract owner do agent không biết domain` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 07 đã được lưu.

<a id="week-02"></a>
