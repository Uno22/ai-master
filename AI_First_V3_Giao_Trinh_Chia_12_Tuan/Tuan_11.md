# TUẦN 11 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 11 — DevOps and staged delivery
> **Gate:** CI staging evidence, không cho phép automation deploy production.  
> **Official docs:** https://docs.github.com/en/actions
**Chọn ngày học:** [Ngày 71](#day-71) · [Ngày 72](#day-72) · [Ngày 73](#day-73) · [Ngày 74](#day-74) · [Ngày 75](#day-75) · [Ngày 76](#day-76) · [Ngày 77](#day-77)

<a id="day-71"></a>

### Ngày 71 — Docker environments

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Docker local/staging/prod khác config/secrets/network; image reproducibility và health checks quan trọng. Không baking `.env` vào image.

**Vì sao phải học:** AI viết Dockerfile multistage cho api/web, docker-compose local deps, healthcheck và tài liệu chạy.

**Quy tắc phải tự giải thích được:** Never copy .env into an image. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Copy cả `.env` production vào Docker image vì “deploy nhanh”. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-70.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Compose config validates and containers use non-root where feasible. Cân nhắc trường hợp lỗi `Copy cả `.env` production vào Docker image vì “deploy nhanh”`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/Dockerfile` và `docs/learning/day-71.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/Dockerfile`
- `apps/web/Dockerfile`
- `infra/docker-compose.yml`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 71 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 71: Docker environments
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-70.md` đã duyệt
MỤC TIÊU: AI viết Dockerfile multistage cho api/web, docker-compose local deps, healthcheck và tài liệu chạy.

YÊU CẦU RIÊNG:
Xây Dockerfiles cho NestJS và Next.js cùng compose local MySQL/Redis/Kafka (nếu cần theo repo). Non-root runtime, health checks, resource limits tham khảo, .dockerignore bảo vệ secrets. Không dùng production credentials.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/Dockerfile
  2. apps/web/Dockerfile
  3. infra/docker-compose.yml

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Compose config validates and containers use non-root where feasible
QUY TẮC QUYẾT ĐỊNH: Never copy .env into an image
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Compose config validates and containers use non-root where feasible.
- **Luận cứ để chọn thiết kế:** Never copy .env into an image.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Copy cả `.env` production vào Docker image vì “deploy nhanh”` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Copy cả `.env` production vào Docker image vì “deploy nhanh”`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 72 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Build reproducible giúp gì?

<details><summary>Xem đáp án</summary>

Tái tạo artifact cùng dependency lock và cấu hình rõ hơn.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Compose config validates and containers use non-root where feasible.
- [ ] Lỗi `Copy cả `.env` production vào Docker image vì “deploy nhanh”` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 71 đã được lưu.

<a id="day-72"></a>

### Ngày 72 — CI/CD pipeline

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

CI/CD cần gate theo PR, build artifact có provenance, promotion có approval; production deployment không tự động theo prompt.

**Vì sao phải học:** Claude tạo GitHub Actions test/build/scan, staging deploy có manual trigger, store artifacts và rollback info.

**Quy tắc phải tự giải thích được:** Use least-privilege GitHub permissions. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** `continue-on-error: true` cho security gate để bỏ qua lỗi. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-71.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Failing test blocks PR; staging deploy requires approval. Cân nhắc trường hợp lỗi ``continue-on-error: true` cho security gate để bỏ qua lỗi`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `.github/workflows/pr.yml` và `docs/learning/day-72.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `.github/workflows/pr.yml`
- `.github/workflows/staging.yml`
- `docs/ci/verification-matrix.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 72 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 72: CI/CD pipeline
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-71.md` đã duyệt
MỤC TIÊU: Claude tạo GitHub Actions test/build/scan, staging deploy có manual trigger, store artifacts và rollback info.

YÊU CẦU RIÊNG:
Hãy tạo workflows PR: npm ci→lint→typecheck→unit/integration→build→security. Release: build image pinned digest và deploy staging sau approval. Không thêm production credentials vào YAML; dùng platform secrets/OIDC theo policy.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. .github/workflows/pr.yml
  2. .github/workflows/staging.yml
  3. docs/ci/verification-matrix.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Failing test blocks PR; staging deploy requires approval
QUY TẮC QUYẾT ĐỊNH: Use least-privilege GitHub permissions
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Failing test blocks PR; staging deploy requires approval.
- **Luận cứ để chọn thiết kế:** Use least-privilege GitHub permissions.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp ``continue-on-error: true` cho security gate để bỏ qua lỗi` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống ``continue-on-error: true` cho security gate để bỏ qua lỗi`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 73 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao tách build và deploy?

<details><summary>Xem đáp án</summary>

Một artifact được kiểm chứng có thể promotion giữa environments và audit rõ.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Failing test blocks PR; staging deploy requires approval.
- [ ] Lỗi ``continue-on-error: true` cho security gate để bỏ qua lỗi` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 72 đã được lưu.

<a id="day-73"></a>

### Ngày 73 — Infrastructure as code

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

IaC dùng declarative desired state và plan/apply review; drift/rollback/state handling có thể gây hỏng hạ tầng. Cloud costs cần budget.

**Vì sao phải học:** Nhờ Claude đề xuất Terraform/OpenTofu staging infrastructure tối giản gồm app, DB, cache, network, logs; chỉ plan không apply.

**Quy tắc phải tự giải thích được:** Do not terraform apply without explicit approval. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** AI chạy `terraform destroy` khi gặp lỗi state. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-72.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Terraform plan has private DB, IAM review and budget. Cân nhắc trường hợp lỗi `AI chạy `terraform destroy` khi gặp lỗi state`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `infra/terraform/main.tf` và `docs/learning/day-73.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `infra/terraform/main.tf`
- `infra/terraform/variables.tf`
- `docs/infra/plan-review.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 73 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 73: Infrastructure as code
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-72.md` đã duyệt
MỤC TIÊU: Nhờ Claude đề xuất Terraform/OpenTofu staging infrastructure tối giản gồm app, DB, cache, network, logs; chỉ plan không apply.

YÊU CẦU RIÊNG:
Thiết kế IaC staging theo AWS account sandbox có budget constraints. Modules network/compute/database/secrets/monitoring, private DB subnets, IAM least privilege, remote state protection. Xuất plan và cost estimate để review; không chạy apply.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. infra/terraform/main.tf
  2. infra/terraform/variables.tf
  3. docs/infra/plan-review.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Terraform plan has private DB, IAM review and budget
QUY TẮC QUYẾT ĐỊNH: Do not terraform apply without explicit approval
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Terraform plan has private DB, IAM review and budget.
- **Luận cứ để chọn thiết kế:** Do not terraform apply without explicit approval.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `AI chạy `terraform destroy` khi gặp lỗi state` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `AI chạy `terraform destroy` khi gặp lỗi state`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 74 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao phải review plan?

<details><summary>Xem đáp án</summary>

Plan thể hiện tài nguyên thực sẽ tạo/xóa/sửa và ảnh hưởng chi phí/bảo mật.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Terraform plan has private DB, IAM review and budget.
- [ ] Lỗi `AI chạy `terraform destroy` khi gặp lỗi state` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 73 đã được lưu.

<a id="day-74"></a>

### Ngày 74 — Secrets và config

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Secret lifecycle gồm provision, rotate, revoke, audit; environment configs cần validation và không in secrets. AI gateway keys phải nằm ở backend.

**Vì sao phải học:** Agent tạo config schema NestJS, env validation, secret placeholders, secret rotation runbook; thử missing key error an toàn.

**Quy tắc phải tự giải thích được:** Keep provider keys server-side. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Log toàn bộ `process.env` khi startup failed. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-73.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Missing required config produces a safe message without printing secrets. Cân nhắc trường hợp lỗi `Log toàn bộ `process.env` khi startup failed`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/api/src/config/config.schema.ts` và `docs/learning/day-74.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/api/src/config/config.schema.ts`
- `docs/runbooks/secrets-rotation.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 74 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 74: Secrets và config
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-73.md` đã duyệt
MỤC TIÊU: Agent tạo config schema NestJS, env validation, secret placeholders, secret rotation runbook; thử missing key error an toàn.

YÊU CẦU RIÊNG:
Thiết kế `ConfigModule` schema cho DATABASE_URL, REDIS_URL, provider keys, allowed models; tách optional providers. Không in values khi validate fail. Viết runbook rotate key và verify clients restart/rollout.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/api/src/config/config.schema.ts
  2. docs/runbooks/secrets-rotation.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Missing required config produces a safe message without printing secrets
QUY TẮC QUYẾT ĐỊNH: Keep provider keys server-side
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Missing required config produces a safe message without printing secrets.
- **Luận cứ để chọn thiết kế:** Keep provider keys server-side.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Log toàn bộ `process.env` khi startup failed` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Log toàn bộ `process.env` khi startup failed`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 75 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Fail-fast có ích thế nào?

<details><summary>Xem đáp án</summary>

Tránh ứng dụng chạy trong trạng thái cấu hình sai không được biết trước.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Missing required config produces a safe message without printing secrets.
- [ ] Lỗi `Log toàn bộ `process.env` khi startup failed` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 74 đã được lưu.

<a id="day-75"></a>

### Ngày 75 — Monitoring & alerting

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Alerts cần actionable signals và SLO-based thresholds; quá nhiều cảnh báo gây fatigue. AI usage spikes và external provider outages khác HTTP app outages.

**Vì sao phải học:** Nhờ AI tạo Prometheus alert rules cho 5xx, p95, queue lag, failed orders, token spend anomalies; runbook links.

**Quy tắc phải tự giải thích được:** Alert thresholds need an owner and response playbook. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chỉ báo CPU 80% mà không biết user impact. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-74.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** AI provider 429 and checkout 5xx alert separately. Cân nhắc trường hợp lỗi `Chỉ báo CPU 80% mà không biết user impact`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `infra/monitoring/alerts.yml` và `docs/learning/day-75.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `infra/monitoring/alerts.yml`
- `docs/runbooks/incident-ai-provider.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 75 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 75: Monitoring & alerting
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-74.md` đã duyệt
MỤC TIÊU: Nhờ AI tạo Prometheus alert rules cho 5xx, p95, queue lag, failed orders, token spend anomalies; runbook links.

YÊU CẦU RIÊNG:
Từ metrics thực tế định nghĩa SLO catalog/checkout/AI FAQ; tạo alert rules có windows, severity, dashboards và first-response runbooks. Phân biệt “pages” vs tickets.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. infra/monitoring/alerts.yml
  2. docs/runbooks/incident-ai-provider.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: AI provider 429 and checkout 5xx alert separately
QUY TẮC QUYẾT ĐỊNH: Alert thresholds need an owner and response playbook
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** AI provider 429 and checkout 5xx alert separately.
- **Luận cứ để chọn thiết kế:** Alert thresholds need an owner and response playbook.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chỉ báo CPU 80% mà không biết user impact` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chỉ báo CPU 80% mà không biết user impact`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 76 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Alert tốt cần gì?

<details><summary>Xem đáp án</summary>

Mức ảnh hưởng, thời gian, owner và hành động phản ứng có thể thực hiện.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] AI provider 429 and checkout 5xx alert separately.
- [ ] Lỗi `Chỉ báo CPU 80% mà không biết user impact` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 75 đã được lưu.

<a id="day-76"></a>

### Ngày 76 — Disaster recovery

> **120–180 phút · IMPLEMENT · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

DR gồm RPO/RTO, backup validation, restore drills, failover và consistency của outbox/events; snapshot không chứng minh restore được.

**Vì sao phải học:** AI viết runbook backup/restore MySQL, Redis cache rebuilding, Kafka replay guardrails; diễn tập staging không dữ liệu thật.

**Quy tắc phải tự giải thích được:** Backup existence does not prove restore success. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tuyên bố DR ready chỉ vì cron backup chạy. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-75.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Restore drill includes order reconciliation and RPO/RTO evidence. Cân nhắc trường hợp lỗi `Tuyên bố DR ready chỉ vì cron backup chạy`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/runbooks/restore-mysql.md` và `docs/learning/day-76.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/runbooks/restore-mysql.md`
- `docs/reports/dr-drill.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 76 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 76: Disaster recovery
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-75.md` đã duyệt
MỤC TIÊU: AI viết runbook backup/restore MySQL, Redis cache rebuilding, Kafka replay guardrails; diễn tập staging không dữ liệu thật.

YÊU CẦU RIÊNG:
Đề xuất RPO/RTO theo product requirements, backup schedule, encryption/access, restore test và order reconciliation after restore. Simulation chỉ trên staging; kiểm tra outbox duplicate replay.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/runbooks/restore-mysql.md
  2. docs/reports/dr-drill.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Restore drill includes order reconciliation and RPO/RTO evidence
QUY TẮC QUYẾT ĐỊNH: Backup existence does not prove restore success
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Restore drill includes order reconciliation and RPO/RTO evidence.
- **Luận cứ để chọn thiết kế:** Backup existence does not prove restore success.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tuyên bố DR ready chỉ vì cron backup chạy` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tuyên bố DR ready chỉ vì cron backup chạy`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 77 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao restore drill quan trọng?

<details><summary>Xem đáp án</summary>

Backup có thể không phục hồi được hoặc phục hồi thiếu nhất quán.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Restore drill includes order reconciliation and RPO/RTO evidence.
- [ ] Lỗi `Tuyên bố DR ready chỉ vì cron backup chạy` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 76 đã được lưu.

<a id="day-77"></a>

### Ngày 77 — Staging release gate

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Staging gate xác minh config, migrations, smoke, synthetic transaction, security, rollback trước khi có quyền promote. Canary hoặc blue/green phụ thuộc infra.

**Vì sao phải học:** Claude phối hợp checklist staging deployment, cung cấp commands/docs theo môi trường thực tế và manual approvals; không deploy prod.

**Quy tắc phải tự giải thích được:** Staging success is not production approval. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chuyển sang production theo yêu cầu agent mà chưa có signed approval. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-76.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Staging release records commit SHA and image digest. Cân nhắc trường hợp lỗi `Chuyển sang production theo yêu cầu agent mà chưa có signed approval`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/release/staging-checklist.md` và `docs/learning/day-77.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/release/staging-checklist.md`
- `docs/reports/staging-smoke.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 77 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 77: Staging release gate
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-76.md` đã duyệt
MỤC TIÊU: Claude phối hợp checklist staging deployment, cung cấp commands/docs theo môi trường thực tế và manual approvals; không deploy prod.

YÊU CẦU RIÊNG:
Chuẩn bị staging release candidate từ commit SHA. Generate release notes, migration plan dry-run, smoke tests catalog→checkout COD→AI FAQ, rollback plan và go/no-go checklist. Không tự thực thi production release.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/release/staging-checklist.md
  2. docs/reports/staging-smoke.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Staging release records commit SHA and image digest
QUY TẮC QUYẾT ĐỊNH: Staging success is not production approval
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Staging release records commit SHA and image digest.
- **Luận cứ để chọn thiết kế:** Staging success is not production approval.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chuyển sang production theo yêu cầu agent mà chưa có signed approval` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chuyển sang production theo yêu cầu agent mà chưa có signed approval`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 78 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Trước release cần snapshot nào?

<details><summary>Xem đáp án</summary>

Code SHA, image digest, schema/migration state, config version và backup checkpoint.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Staging release records commit SHA and image digest.
- [ ] Lỗi `Chuyển sang production theo yêu cầu agent mà chưa có signed approval` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 77 đã được lưu.

<a id="week-12"></a>
