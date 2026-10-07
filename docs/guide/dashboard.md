# Triển khai giao diện Dashboard

## Chuẩn bị tài khoản

[Đăng ký Cloudflare](https://dash.cloudflare.com/) và thêm tên miền của bạn.

Nếu chưa biết cách trỏ tên miền, bạn có thể xem hướng dẫn: [Trỏ tên miền về Cloudflare](https://cloud.tencent.cn/developer/article/2518586?from=15425&policyId=undefined&traceId=&frompage=seopage)
<img src="../public/images/action/1.png" class="article-img">


## Tạo dự án
1. Fork kho lưu trữ về tài khoản GitHub của bạn [https://github.com/maillab/cloud-mail](https://github.com/maillab/cloud-mail)
<img src="../public/images/dashboard/0.png" class="article-img" />
2. Tạo dự án Worker trên Cloudflare
<img src="../public/images/dashboard/1.png" class="article-img" />
3. Chọn Import từ GitHub
<img src="../public/images/dashboard/2.png" class="article-img" />
4. Thiết lập thư mục gốc là `mail-worker` và tiến hành triển khai
<img src="../public/images/dashboard/3.png" class="article-img" />

## Cấu hình biến môi trường

| Tên biến | Bắt buộc | Mục đích sử dụng |
|---|:---:|---|
| domain | ✅ | Tên miền email, nhiều tên miền dùng mảng JSON (ví dụ `["example.com","example2.com"]`) |
| admin | ✅ | Địa chỉ email quản trị viên (ví dụ `admin@example.com`) |
| jwt_secret | ✅ | Chuỗi bí mật JWT, nhập một chuỗi ngẫu nhiên không chứa ký tự đặc biệt |

1. Cài đặt tên miền tùy chỉnh (Custom Domain) và thêm các biến môi trường
<img src="../public/images/dashboard/5.png" class="article-img" />

## Liên kết cơ sở dữ liệu
1. Tạo cơ sở dữ liệu KV và D1
<img src="../public/images/dashboard/4-4.png" class="article-img" />
2. Thêm binding, <span style="color: red" class="article-img">tên biến binding bắt buộc phải là `kv` và `db`</span>
<img src="../public/images/dashboard/4.png" class="article-img" />

## Cài đặt chuyển tiếp email
<img src="../public/images/dashboard/6.png" class="article-img" />
<img src="../public/images/dashboard/7.png" class="article-img" />
<img src="../public/images/dashboard/8.png" class="article-img" />

## Đăng nhập trang web
1. Mở trình duyệt và truy cập `https://<ten-mien-worker-cua-ban>/api/init/<jwt_secret_cua_ban>` để khởi tạo cơ sở dữ liệu
<img src="../public/images/dashboard/10.png" class="article-img" />

2. Mở trình duyệt truy cập tên miền tùy chỉnh, <span style="color: red" class="article-img">đăng ký tài khoản quản trị viên</span> và đăng nhập vào trang web
<img src="../public/images/dashboard/9.png" class="article-img" />