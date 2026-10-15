# Kiểm định V3.0 — AI-First Software Engineering (2026-10-16)

> **Phạm vi:** 84 ngày học, tính nhất quán của Markdown, prompt contract, reference example và những gì đã được thực thi. Tài liệu này không phải chứng nhận toàn bộ capstone đã production-ready.

## Vòng 1 — Audit lại V2.0

Phát hiện: “lời giải” chủ yếu nhắc expected output; prompt chung lặp 84 lần; thiếu file manifest; không phân biệt live tests với expected results. Kết luận: chưa đủ để coi 10/10.

## Vòng 2 — Sửa cấu trúc V3.0

- Đưa chuẩn cấp quyền, workflow, cách sửa lỗi và **Full-file output contract** vào Phần A một lần.
- Thay prompts cũ bằng **84 prompt riêng**, mỗi prompt có role, file manifest, giới hạn hành động, expected outcome, test evidence và điều kiện dừng.
- Bổ sung đường dẫn output theo từng ngày và **mở rộng manifest cho 16 ngày kỹ thuật phức tạp**: NestJS scaffold, auth, inventory, orders, Next.js, LLM gateway, tools, MCP, agents, CI.
- Các bước review chéo chỉ bắt buộc ở các mốc có tác động rủi ro.

## Vòng 3 — Static structural review

| Tiêu chí | Bằng chứng | Kết quả |
|---|---|---|
| 12 tuần | 12 headings + anchors | PASS |
| 84 ngày | 84 headings + anchors | PASS |
| 84 prompts | 84 blocks khác nhau | PASS |
| Prompt yêu cầu output đầy đủ từng file | 84/84 gồm FILE MANIFEST + full-file contract | PASS |
| Markdown có headings và code fences parse được | markdown-it parser | PASS |
| 29 file reference đầy đủ | Nội dung MD từng file so byte với source folder | PASS |
| ZIP source | So byte với 29 file trên đĩa | PASS |
| JSON config / JSONL | Parse bằng json module | PASS |
| Unit tests offline | `npm test`, Node v22.16.0 | **11 PASS / 0 FAIL** |
| NestJS HTTP runtime | Cần npm dependencies, registry hiện không truy cập được | **NOT VERIFIED** |
| Real providers OpenAI/Anthropic/Gemini | Không có API keys/billing trong môi trường soạn | **NOT EXECUTED** |
| MySQL concurrency / end-to-end capstone | Không triển khai trong reference slice | **NOT IMPLEMENTED** |

## Chấm điểm theo từng phạm vi, không gộp để che giới hạn

**10/10 — Checklist cấu trúc và full-file examples:** đủ 12 tuần, 84 ngày, manifests + full-file contract, 29 full files và 11 unit tests.

**Chưa thể 10/10 — Độ sâu giáo trình/production:** 84 ngày hiện là các lab hướng dẫn AI tạo artifacts, chưa cung cấp **toàn bộ source code hoàn chỉnh của project lớn**. Nhiều ngày có lời giải định hướng và bài kiểm tra nhưng chưa có runtime evidence từ các tích hợp Next.js/MySQL/Kafka/RAG/MCP/cloud. Đây là hạn chế có chủ đích và cần nói rõ.

## Nguyên tắc nghiệm thu tiếp theo (để đạt 10/10 về capstone thực tế)

1. Tạo một repository tích hợp chính thức có lockfile và cơ chế dựng local/staging tái lập được.
2. Chạy build/lint/typecheck/unit/integration/e2e trên đúng repository đó.
3. Chạy MySQL concurrency/idempotency tests với ít nhất hai process và fault injection.
4. Kiểm chứng tool authorization, multi-tenant isolation, prompt injection, RAG citation grounding.
5. Test thật provider APIs với keys/quota được duyệt, chuẩn hóa cost và model routing.
6. Thực hiện staging smoke, rollback rehearsal, load tests và DR drills; đính kèm SHA/logs/traces.
7. Không tồn tại P0/P1 chưa xử lý; release có người phê duyệt.

**Không được ghi “10/10 production” trước khi toàn bộ bằng chứng trên tồn tại.**
