# Lưu trữ đối tượng (Object Storage)

:::warning
Tệp đính kèm email mặc định sử dụng lưu trữ KV, bạn có thể chuyển sang sử dụng R2 hoặc bất kỳ dịch vụ lưu trữ nào tương thích giao thức S3.
:::

1. Tạo bucket lưu trữ đối tượng R2
<img src="../public/images/r2/1.png" class="article-img">

2. Cài đặt tên miền tùy chỉnh (Custom Domain)
<img src="../public/images/r2/2.png" class="article-img">

3. Thêm vào Action Secret hoặc Worker <span style='color: red'>Binding</span>

| Tên Worker Binding | Action Secret | Bắt buộc | Mục đích sử dụng |
|---|---|:---:|---|
| r2 | R2_BUCKET_NAME | ✅ | Tên bucket R2 |

4. Cài đặt hệ thống
<img src="../public/images/r2/3.png" class="article-img">