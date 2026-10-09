# Hướng dẫn triển khai bằng dòng lệnh

## Chuẩn bị triển khai

- Node.js v20.19.6 trở lên
- Tài khoản Cloudflare (đã liên kết tên miền)

**Sao chép mã nguồn về máy**
```shell
git clone https://github.com/minhduc290613/cloud-mail # Kéo mã nguồn
cd cloud-mail/mail-worker # Di chuyển vào thư mục worker
```

**Cài đặt các gói phụ thuộc**
```shell
pnpm i
```

## Cấu hình dự án 

Tệp `mail-worker/wrangler.toml`

```toml
[[d1_databases]]
binding = "db"			# Tên binding cơ sở dữ liệu D1 (mặc định không được sửa)
database_name = ""		# Tên cơ sở dữ liệu D1
database_id = ""		# ID cơ sở dữ liệu D1

[[kv_namespaces]]
binding = "kv"			# Tên binding KV (mặc định không được sửa)
id = ""			        # ID không gian tên KV


[[r2_buckets]]
binding = "r2"                  # Tên binding lưu trữ đối tượng R2 (mặc định không được sửa)
bucket_name = ""	        # Tên bucket lưu trữ đối tượng R2
	

[assets]
binding = "assets"		# Tên binding tài nguyên tĩnh (mặc định không được sửa)
directory = "./dist"	        # Thư mục chứa tài nguyên tĩnh đã build của dự án Vue, mặc định là dist

[triggers]
crons = ["0 16 * * *"]	# Cron job thực thi hàng ngày lúc 00:00 (Asia/Shanghai)

[vars]
orm_log = false
domain = []			# Danh sách tên miền email có thể cấu hình nhiều tên miền, ví dụ: ["example1.com","example2.com"]
admin = ""		        # Địa chỉ email của quản trị viên, ví dụ: "admin@example.com"
jwt_secret = ""			# Chuỗi bí mật JWT xác thực đăng nhập, nhập chuỗi ký tự bất kỳ

```

## Triển khai từ xa

1. Tạo cơ sở dữ liệu KV, D1 trên bảng điều khiển Cloudflare.
2. Cấu hình cơ sở dữ liệu và biến môi trường trong tệp `mail-worker/wrangler.toml`.
3. Chạy lệnh triển khai từ xa:

    ```shell
    pnpm run deploy 
    ```

4. Vào Cloudflare → Trang chủ tài khoản → Tên miền của bạn → Email → Định tuyến email (Email Routing) → Quy tắc định tuyến (Routing Rules) → Địa chỉ Catch-all, chỉnh sửa hành động gửi đến Worker.

5. Mở trình duyệt và truy cập `https://<ten-mien-tuy-chinh-worker>/api/init/<jwt_secret_cua_ban>` để khởi tạo hoặc cập nhật cơ sở dữ liệu.