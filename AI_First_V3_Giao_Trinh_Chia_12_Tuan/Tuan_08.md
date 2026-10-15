# TUẦN 08 — GIÁO TRÌNH AI-FIRST

> Đọc [Quy trình và Full-file contract](00-HUONG-DAN-VA-QUY-TAC-FULL-FILE.md) trước khi thực hành.

## Tuần 08 — RAG, MCP and access control
> **Gate:** Nguồn, quyền tenant và provenance kiểm tra trước trả lời.  
> **Official docs:** https://modelcontextprotocol.io/docs/getting-started/intro
**Chọn ngày học:** [Ngày 50](#day-50) · [Ngày 51](#day-51) · [Ngày 52](#day-52) · [Ngày 53](#day-53) · [Ngày 54](#day-54) · [Ngày 55](#day-55) · [Ngày 56](#day-56)

<a id="day-50"></a>

### Ngày 50 — Document ingestion

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Ingestion pipeline cần parser, normalization, metadata, ACL, source provenance và re-index; tài liệu có thể chứa chỉ dẫn ác ý.

**Vì sao phải học:** Nhờ AI xây pipeline nhập markdown/pdf tài liệu sản phẩm giả, deduplicate theo checksum, gắn tenant/docId/version.

**Quy tắc phải tự giải thích được:** Chunk provenance is necessary for valid citations. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Vứt source metadata nên chatbot không thể trích dẫn bằng chứng. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-49.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Source ingestion stores URI, version/hash and access label. Cân nhắc trường hợp lỗi `Vứt source metadata nên chatbot không thể trích dẫn bằng chứng`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/knowledge/ingest.ts` và `docs/learning/day-50.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/knowledge/ingest.ts`
- `packages/knowledge/document-schema.ts`
- `packages/knowledge/access-policy.ts`
- `packages/knowledge/tests/ingest.test.ts`
- `docs/rag/source-policy.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 50 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 50: Document ingestion
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-49.md` đã duyệt
MỤC TIÊU: Nhờ AI xây pipeline nhập markdown/pdf tài liệu sản phẩm giả, deduplicate theo checksum, gắn tenant/docId/version.

YÊU CẦU RIÊNG:
Thiết kế ingestion cho `docs/knowledge/*.md` và PDF thử nghiệm không có dữ liệu thật. Sinh normalized text, source spans, ACL scope, document checksum, version và status. Không index file secrets. Xử lý parse failures có quarantine.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/knowledge/ingest.ts
  2. packages/knowledge/document-schema.ts
  3. packages/knowledge/access-policy.ts
  4. packages/knowledge/tests/ingest.test.ts
  5. docs/rag/source-policy.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Source ingestion stores URI, version/hash and access label
QUY TẮC QUYẾT ĐỊNH: Chunk provenance is necessary for valid citations
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Source ingestion stores URI, version/hash and access label.
- **Luận cứ để chọn thiết kế:** Chunk provenance is necessary for valid citations.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Vứt source metadata nên chatbot không thể trích dẫn bằng chứng` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Vứt source metadata nên chatbot không thể trích dẫn bằng chứng`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 51 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao checksum hữu ích?

<details><summary>Xem đáp án</summary>

Phát hiện nội dung trùng/thay đổi và hỗ trợ re-index có kiểm soát.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Source ingestion stores URI, version/hash and access label.
- [ ] Lỗi `Vứt source metadata nên chatbot không thể trích dẫn bằng chứng` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 50 đã được lưu.

<a id="day-51"></a>

### Ngày 51 — Chunking và embeddings

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Chunk size/overlap ảnh hưởng context, recall và cost; embedding model/version là một phần chỉ mục, không được trộn dimensions tùy ý.

**Vì sao phải học:** AI thử 3 strategies chunking sản phẩm/chính sách, tạo embeddings bằng provider được phép hoặc fake vectors cho tests.

**Quy tắc phải tự giải thích được:** Chunking must be evaluated by retrieval success, not size alone. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Chọn chunk size chỉ vì “best practice” mà không đo retrieval. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-50.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Chunk overlaps preserve headings and record source IDs. Cân nhắc trường hợp lỗi `Chọn chunk size chỉ vì “best practice” mà không đo retrieval`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/knowledge/chunk.ts` và `docs/learning/day-51.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/knowledge/chunk.ts`
- `packages/knowledge/embed.ts`
- `packages/knowledge/tests/chunk.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 51 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 51: Chunking và embeddings
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-50.md` đã duyệt
MỤC TIÊU: AI thử 3 strategies chunking sản phẩm/chính sách, tạo embeddings bằng provider được phép hoặc fake vectors cho tests.

YÊU CẦU RIÊNG:
Thiết kế chunker theo headings và token budget, so sánh 300/600/900 tokens (đề xuất, không áp đặt). Metadata giữ section và offsets; embedding adapter cấu hình model/dimension. Báo cáo trade-off số chunks/cost/recall trên 10 queries.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/knowledge/chunk.ts
  2. packages/knowledge/embed.ts
  3. packages/knowledge/tests/chunk.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Chunk overlaps preserve headings and record source IDs
QUY TẮC QUYẾT ĐỊNH: Chunking must be evaluated by retrieval success, not size alone
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Chunk overlaps preserve headings and record source IDs.
- **Luận cứ để chọn thiết kế:** Chunking must be evaluated by retrieval success, not size alone.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Chọn chunk size chỉ vì “best practice” mà không đo retrieval` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Chọn chunk size chỉ vì “best practice” mà không đo retrieval`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 52 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao không trộn embeddings khác model vào một index?

<details><summary>Xem đáp án</summary>

Vector spaces/dimensions có thể không tương thích, kết quả similarity vô nghĩa.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Chunk overlaps preserve headings and record source IDs.
- [ ] Lỗi `Chọn chunk size chỉ vì “best practice” mà không đo retrieval` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 51 đã được lưu.

<a id="day-52"></a>

### Ngày 52 — Vector retrieval

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Vector search kết hợp metadata filtering và hybrid lexical search; không bảo đảm semantic search nhớ chính xác mã sản phẩm. ACL phải filter trước khi dùng kết quả trong answer.

**Vì sao phải học:** Cho AI xây `searchKnowledge(query,userContext)` với vector+keyword option và tenant-safe filters.

**Quy tắc phải tự giải thích được:** Cosine similarity is not authorization. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng vector similarity như authorization quyết định ai được xem chunk. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-51.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Search enforces tenant filter before returning any chunk. Cân nhắc trường hợp lỗi `Dùng vector similarity như authorization quyết định ai được xem chunk`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/knowledge/retriever.ts` và `docs/learning/day-52.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/knowledge/retriever.ts`
- `packages/knowledge/tests/retrieval.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 52 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 52: Vector retrieval
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-51.md` đã duyệt
MỤC TIÊU: Cho AI xây `searchKnowledge(query,userContext)` với vector+keyword option và tenant-safe filters.

YÊU CẦU RIÊNG:
Implement retrieval trên store được chọn (pgvector/Qdrant/compatible) sau so sánh với hạ tầng hiện có. Trả `chunkId, score, source, excerpt`, áp ACL server-side; benchmark 10 queries gồm exact SKU, policy paraphrase và denied docs.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/knowledge/retriever.ts
  2. packages/knowledge/tests/retrieval.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Search enforces tenant filter before returning any chunk
QUY TẮC QUYẾT ĐỊNH: Cosine similarity is not authorization
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Search enforces tenant filter before returning any chunk.
- **Luận cứ để chọn thiết kế:** Cosine similarity is not authorization.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng vector similarity như authorization quyết định ai được xem chunk` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng vector similarity như authorization quyết định ai được xem chunk`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 53 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Vì sao hybrid có ích?

<details><summary>Xem đáp án</summary>

Exact IDs/keywords cần lexical matching, còn paraphrase cần semantic similarity.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Search enforces tenant filter before returning any chunk.
- [ ] Lỗi `Dùng vector similarity như authorization quyết định ai được xem chunk` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 52 đã được lưu.

<a id="day-53"></a>

### Ngày 53 — Reranking và citations

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

Reranker phân loại lại candidates để tăng precision; citations phải trỏ tới source span thật, không nhận mọi URL model bịa ra. Nên có abstention khi thiếu evidence.

**Vì sao phải học:** Agent triển khai retrieve→rerank→answer pipeline có citations kiểm chứng được; dùng 15 QA fixtures.

**Quy tắc phải tự giải thích được:** Citation generation is not citation correctness. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Model tự thêm “theo tài liệu A” dù A không xuất hiện trong retrieved candidates. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-52.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Answer cites retrieved passages; missing evidence yields uncertainty. Cân nhắc trường hợp lỗi `Model tự thêm “theo tài liệu A” dù A không xuất hiện trong retrieved candidates`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `packages/knowledge/rerank.ts` và `docs/learning/day-53.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `packages/knowledge/rerank.ts`
- `evals/rag-citation-cases.jsonl`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 53 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 53: Reranking và citations
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-52.md` đã duyệt
MỤC TIÊU: Agent triển khai retrieve→rerank→answer pipeline có citations kiểm chứng được; dùng 15 QA fixtures.

YÊU CẦU RIÊNG:
Xây answer pipeline lấy topK retrieval, rerank theo query nếu model/cost cho phép, assemble nguồn đánh số, yêu cầu answer chỉ dẫn citations có trong returned chunks. Nếu không có evidence, trả “không đủ dữ liệu”.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. packages/knowledge/rerank.ts
  2. evals/rag-citation-cases.jsonl

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Answer cites retrieved passages; missing evidence yields uncertainty
QUY TẮC QUYẾT ĐỊNH: Citation generation is not citation correctness
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Answer cites retrieved passages; missing evidence yields uncertainty.
- **Luận cứ để chọn thiết kế:** Citation generation is not citation correctness.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Model tự thêm “theo tài liệu A” dù A không xuất hiện trong retrieved candidates` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Model tự thêm “theo tài liệu A” dù A không xuất hiện trong retrieved candidates`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 54 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khác faithfulness và correctness?

<details><summary>Xem đáp án</summary>

Faithfulness đo answer bám nguồn; correctness đo có đúng thực tế/golden answer.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Answer cites retrieved passages; missing evidence yields uncertainty.
- [ ] Lỗi `Model tự thêm “theo tài liệu A” dù A không xuất hiện trong retrieved candidates` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 53 đã được lưu.

<a id="day-54"></a>

### Ngày 54 — MCP server fundamentals

> **75–120 phút · IMPLEMENT · AI: Claude Code · Review chéo: KHÔNG bắt buộc**

#### Lý thuyết và quyết định kỹ thuật

MCP là protocol kết nối tool/data capabilities; transport, tool schemas và server trust không tự cấp quyền doanh nghiệp. Dùng SDK chính thức và công cụ test để chứng minh discovery/call.

**Vì sao phải học:** Cho Claude làm MCP server TypeScript read-only expose getProduct + getOrderStatus test fixture (không dữ liệu nhạy cảm).

**Quy tắc phải tự giải thích được:** MCP server deployment must be configured explicitly. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Xem MCP server như “tool chạy được mọi quyền” mà không có backend auth. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-53.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Read-only stock tool uses explicit schema and stable tool name. Cân nhắc trường hợp lỗi `Xem MCP server như “tool chạy được mọi quyền” mà không có backend auth`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/mcp/package.json` và `docs/learning/day-54.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/mcp/package.json`
- `apps/mcp/tsconfig.json`
- `apps/mcp/src/server.ts`
- `apps/mcp/src/tools/product.ts`
- `apps/mcp/src/tool-registry.ts`
- `apps/mcp/tests/product-tool.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 54 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 54: MCP server fundamentals
CÔNG CỤ: Claude Code | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-53.md` đã duyệt
MỤC TIÊU: Cho Claude làm MCP server TypeScript read-only expose getProduct + getOrderStatus test fixture (không dữ liệu nhạy cảm).

YÊU CẦU RIÊNG:
Đọc docs MCP TypeScript SDK đúng version rồi tạo stdio MCP server cung cấp `get_product` và `get_order_status` với Zod args. Không mở write/delete tools. Kết nối client thử nghiệm, kiểm tra list tools và call results.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/mcp/package.json
  2. apps/mcp/tsconfig.json
  3. apps/mcp/src/server.ts
  4. apps/mcp/src/tools/product.ts
  5. apps/mcp/src/tool-registry.ts
  6. apps/mcp/tests/product-tool.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Read-only stock tool uses explicit schema and stable tool name
QUY TẮC QUYẾT ĐỊNH: MCP server deployment must be configured explicitly
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Read-only stock tool uses explicit schema and stable tool name.
- **Luận cứ để chọn thiết kế:** MCP server deployment must be configured explicitly.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Xem MCP server như “tool chạy được mọi quyền” mà không có backend auth` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Xem MCP server như “tool chạy được mọi quyền” mà không có backend auth`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 55 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** MCP thay thế authorization của API không?

<details><summary>Xem đáp án</summary>

Không; server và nguồn dữ liệu phải tự enforce quyền.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Read-only stock tool uses explicit schema and stable tool name.
- [ ] Lỗi `Xem MCP server như “tool chạy được mọi quyền” mà không có backend auth` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 54 đã được lưu.

<a id="day-55"></a>

### Ngày 55 — MCP permissions và hardening

> **120–180 phút · IMPLEMENT · AI: Claude Code + Codex security review · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Trust boundaries qua MCP: tool input, server identity, tokens, prompts và returned content. Least privilege, tool allowlist, approval và auditing cần enforce ở runtime.

**Vì sao phải học:** Thiết kế auth context cho tool getOrderStatus, chặn truy cập đơn khác user và thử injection trong tool output.

**Quy tắc phải tự giải thích được:** MCP tool permissions cannot trust agent arguments. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Tool schema hợp lệ nhưng app dùng credential admin đọc tất cả data. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-54.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code + Codex security review. **Chế độ IMPLEMENT:** Tạo/sửa đủ file trong worktree sau approval; không push/merge/deploy.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** Cross-tenant tool request denied; tokens are not logged. Cân nhắc trường hợp lỗi `Tool schema hợp lệ nhưng app dùng credential admin đọc tất cả data`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `apps/mcp/src/authz.ts` và `docs/learning/day-55.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `apps/mcp/src/authz.ts`
- `apps/mcp/src/context.ts`
- `apps/mcp/tests/tenant-isolation.test.ts`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 55 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 55: MCP permissions và hardening
CÔNG CỤ: Claude Code + Codex security review | CHẾ ĐỘ: IMPLEMENT
INPUT CẦN KIỂM TRA: `docs/learning/day-54.md` đã duyệt
MỤC TIÊU: Thiết kế auth context cho tool getOrderStatus, chặn truy cập đơn khác user và thử injection trong tool output.

YÊU CẦU RIÊNG:
Tạo threat model MCP: credential handling, tenant isolation, tool name confusion, SSRF/exfiltration và untrusted tool text. Implement fake user context injection tại API gateway, verify IDOR test. Không dùng global admin token.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. apps/mcp/src/authz.ts
  2. apps/mcp/src/context.ts
  3. apps/mcp/tests/tenant-isolation.test.ts

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: Cross-tenant tool request denied; tokens are not logged
QUY TẮC QUYẾT ĐỊNH: MCP tool permissions cannot trust agent arguments
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** Cross-tenant tool request denied; tokens are not logged.
- **Luận cứ để chọn thiết kế:** MCP tool permissions cannot trust agent arguments.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Tool schema hợp lệ nhưng app dùng credential admin đọc tất cả data` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Tool schema hợp lệ nhưng app dùng credential admin đọc tất cả data`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 56 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Ai quyết định quyền truy cập tool?

<details><summary>Xem đáp án</summary>

Backend/service boundary với principal thật, không dựa vào model.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] Cross-tenant tool request denied; tokens are not logged.
- [ ] Lỗi `Tool schema hợp lệ nhưng app dùng credential admin đọc tất cả data` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 55 đã được lưu.

<a id="day-56"></a>

### Ngày 56 — RAG+MCP integration

> **120–180 phút · GATE · AI: Claude Code · Review chéo: BẮT BUỘC**

#### Lý thuyết và quyết định kỹ thuật

Phân biệt RAG là context retrieval, MCP là tool interface; chatbot có thể dùng cả hai nhưng không nên gọi tools vô cớ. Eval phải kiểm citations lẫn authorization.

**Vì sao phải học:** Cho AI dựng support assistant: hỏi chính sách trả từ RAG, hỏi trạng thái order chỉ gọi MCP read-only khi user authorized.

**Quy tắc phải tự giải thích được:** Prompt-injected document cannot cause unauthorized tool call. Khi so sánh nhiều phương án, cần chỉ ra bất biến, ranh giới tin cậy, cost hoặc failure mode phù hợp với chủ đề ngày học.

**Phản ví dụ:** Dùng RAG document để trả trạng thái đơn hàng realtime dù stale. Hãy mô tả đầu vào tạo lỗi này và bằng chứng nào xác định lỗi có thật.

#### Thực hành — thao tác đúng thứ tự

1. **Kiểm tra đầu vào:** `docs/learning/day-55.md` đã duyệt; xác minh nguồn file, branch, SHA và quyền dữ liệu trước khi chuyển thông tin cho model.
2. **Mở công cụ:** Claude Code. **Chế độ GATE:** Đối chiếu evidence, phân loại PASS/FAIL/NOT VERIFIED; không thay đổi production.
3. **Dán prompt bên dưới;** yêu cầu duyệt plan trước thao tác ghi. Nếu project hiện tại có cấu trúc khác, yêu cầu agent đề xuất mapping thay vì tạo file trùng.
4. **Kiểm chứng riêng:** FAQ answer cites source and an authorized order lookup works. Cân nhắc trường hợp lỗi `Dùng RAG document để trả trạng thái đơn hàng realtime dù stale`; đòi bằng chứng chứ không nhận câu kết luận chung.
5. **Bàn giao:** lưu `docs/reports/rag-mcp-integration.md` và `docs/learning/day-56.md` nếu được phép; kèm decision, test evidence và blockers.

#### File manifest phải nhận — các file đều có nội dung đầy đủ

- `docs/reports/rag-mcp-integration.md`
- `docs/learning/week-08-gate.md`

**Chú ý:** Đây là *danh sách file mục tiêu*, không phải bằng chứng file đã tồn tại. AI phải kiểm tra import/dependency graph và bổ sung file cần thiết vào manifest trước khi bạn duyệt. Bản file hoàn chỉnh minh họa nằm ở Phần D; không coi đoạn minh họa là implementation của toàn bộ capstone.

#### Prompt riêng cho ngày 56 — copy nguyên khối

```text
NHIỆM VỤ NGÀY 56: RAG+MCP integration
CÔNG CỤ: Claude Code | CHẾ ĐỘ: GATE
INPUT CẦN KIỂM TRA: `docs/learning/day-55.md` đã duyệt
MỤC TIÊU: Cho AI dựng support assistant: hỏi chính sách trả từ RAG, hỏi trạng thái order chỉ gọi MCP read-only khi user authorized.

YÊU CẦU RIÊNG:
Implement assistant router: policy questions→knowledge retrieval with citations; current order status→MCP get_order_status with authorization. Fallback “unknown” khi nguồn thiếu. Viết 20 eval scenarios gồm policy/out-of-domain/cross-account.

FILE MANIFEST (TẤT CẢ FILE PHẢI ĐƯỢC LIỆT KÊ; nếu repo khác thì map và hỏi trước):
  1. docs/reports/rag-mcp-integration.md
  2. docs/learning/week-08-gate.md

YÊU CẦU NỘI DUNG TỪNG FILE:
- Theo Full-file contract A3: mỗi file CREATE/MODIFY phải có nội dung cuối cùng HOÀN CHỈNH từ dòng đầu đến dòng cuối, gồm toàn bộ imports, configuration, implementation, tests, docs liên quan; không dùng TODO, dấu ..., "same as above" hay bỏ qua code.
- Cần thêm một file để chạy được? Đề xuất path và lý do, xin approve trước khi tạo.
- Nếu READ-ONLY: gửi report đầy đủ, không ghi file.

VÍ DỤ KẾT QUẢ ĐÚNG: FAQ answer cites source and an authorized order lookup works
QUY TẮC QUYẾT ĐỊNH: Prompt-injected document cannot cause unauthorized tool call
KIỂM CHỨNG: ghi paths thực, commands + exit codes, observed outputs, skipped tests và git diff; không bịa.
HÀNH ĐỘNG BỊ CẤM: production/secret access, destructive migrations, tự push, tự merge.
GATE: nếu thiếu dependency, evidence hoặc approval thì STOP và ghi NOT VERIFIED.
```

#### Lời giải, đối chiếu và dấu hiệu sai

- **Lời giải hướng đi:** FAQ answer cites source and an authorized order lookup works.
- **Luận cứ để chọn thiết kế:** Prompt-injected document cannot cause unauthorized tool call.
- **Bài kiểm thử đối kháng:** cố tình tái hiện trường hợp `Dùng RAG document để trả trạng thái đơn hàng realtime dù stale` và yêu cầu AI giải thích cách biết test sẽ fail trên phiên bản sai.
- **Không đạt nếu:** chỉ có lời mô tả, thiếu file/contract/test thật; khác biệt phải được kiểm tra trên source hoặc qua test đúng loại. Mọi test chưa chạy ghi `NOT VERIFIED`.

#### Recovery nếu thất bại

Đóng băng phạm vi; lấy stderr, exit code và changed files. Với tình huống `Dùng RAG document để trả trạng thái đơn hàng realtime dù stale`, yêu cầu AI xác định nguyên nhân từ file cụ thể, đề xuất một sửa đổi nhỏ có regression test, rồi chạy lại lệnh đã fail. Không tự tiếp tục sang ngày 57 trước khi xử lý blocker.

#### Quiz và tiêu chí nghiệm thu

**Quiz:** Khi nào chọn tool thay vì RAG?

<details><summary>Xem đáp án</summary>

Khi cần dữ liệu động hoặc action có kiểm soát, không phải nội dung tài liệu tĩnh.

</details>

- [ ] Mọi đường dẫn trong manifest được xác minh hoặc có quyết định mapping được duyệt.
- [ ] FAQ answer cites source and an authorized order lookup works.
- [ ] Lỗi `Dùng RAG document để trả trạng thái đơn hàng realtime dù stale` đã được đánh giá; có chứng cứ hoặc ghi chưa kiểm chứng.
- [ ] Bằng chứng và handoff của ngày 56 đã được lưu.

<a id="week-09"></a>
