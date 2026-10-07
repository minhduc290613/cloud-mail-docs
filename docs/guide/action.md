# Triển khai bằng GitHub Actions

## Tạo API Token

1. [Nhấp để tạo Token](https://dash.cloudflare.com/profile/api-tokens), chọn mẫu (template)
<img src="../public/images/action/4.png" class="article-img">

2. Thêm các quyền tương ứng
<img src="../public/images/action/5.png" class="article-img">

3. Sao chép Account ID và API Token
<img src="../public/images/action/6.png" class="article-img">

## Chuẩn bị môi trường

1. Fork kho lưu trữ [https://github.com/maillab/cloud-mail](https://github.com/maillab/cloud-mail)
<img src="../public/images/action/8.png" class="article-img">

2. Cấu hình Action Secrets hoặc Variables

| Tên biến | Bắt buộc | Mục đích sử dụng |
|---|:---:|---|
| CLOUDFLARE_API_TOKEN | ✅ | Cloudflare API Token |
| CLOUDFLARE_ACCOUNT_ID | ✅ | Cloudflare Account ID |
| CUSTOM_DOMAIN | ✅ | Tên miền tùy chỉnh dùng để truy cập trang web (ví dụ `mail.example.com`) |
| DOMAIN | ✅ | Tên miền email, nhiều tên miền dùng mảng JSON (ví dụ `["example.com","example2.com"]`) |
| ADMIN | ✅ | Địa chỉ email quản trị viên (ví dụ `admin@example.com`) |
| JWT_SECRET | ✅ | Chuỗi bí mật JWT, nhập một chuỗi ngẫu nhiên không chứa ký tự đặc biệt |
| NAME | ❌ | Tên dự án Worker, mặc định là cloud-mail |
| D1_DATABASE_ID | ❌ | D1 Database ID, mặc định sử dụng cơ sở dữ liệu cùng tên với Worker |
| KV_NAMESPACE_ID | ❌ | KV Namespace ID, mặc định sử dụng KV cùng tên với Worker |

<img src="../public/images/action/9.png" class="article-img" />

## Bắt đầu triển khai

1. Chạy workflow
<img src="../public/images/action/10.png" class="article-img">

2. Đợi quá trình chạy hoàn tất
<img src="../public/images/action/11.png" class="article-img">

## Cài đặt chuyển tiếp email
1. Tham khảo các bước [Cài đặt chuyển tiếp](dashboard.html#cai-dat-chuyen-tiep) trong phần Triển khai giao diện

2. Mở trình duyệt, nhập tên miền, <span style="color: red" class="article-img">đăng ký tài khoản quản trị viên</span> và đăng nhập vào trang web
<img src="../public/images/action/13.png" class="article-img" />

🎉**Triển khai hoàn tất**🎉
