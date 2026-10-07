# Cập nhật dự án

## Cập nhật triển khai Action
Đồng bộ mã nguồn kho lưu trữ lên bản mới nhất, GitHub Actions sẽ tự động chạy và triển khai bản cập nhật.

## Cập nhật triển khai giao diện Dashboard
1. Sau khi đồng bộ mã nguồn, Worker sẽ tự động cập nhật.
2. Các liên kết cơ sở dữ liệu có thể bị mất, cần kiểm tra và liên kết lại cơ sở dữ liệu `d1`, `kv`.
3. Truy cập `https://<ten-mien-tuy-chinh-worker>/api/init/<jwt_secret_cua_ban>` để cập nhật cấu trúc cơ sở dữ liệu (thao tác này chỉ cập nhật/bổ sung, không làm mất hoặc ghi đè dữ liệu hiện có).
