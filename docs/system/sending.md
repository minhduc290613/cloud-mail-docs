# Gửi email

:::warning
Cloudflare hiện không hỗ trợ gửi thư trực tiếp (chặn cổng 25), vì vậy phải sử dụng dịch vụ của bên thứ ba (như Resend).
:::

1. [Đăng ký tài khoản Resend](https://resend.com/login), thêm tên miền và hoàn tất xác thực DNS
<img src="../public/images/send/1.png" class="article-img">

2. Tạo API Key và sao chép
<img src="../public/images/send/3.png" class="article-img">

3. Cài đặt Webhook nhận trạng thái gửi thư: `https://<ten-mien-tuy-chinh-worker>/api/webhooks`
<img src="../public/images/send/2.png" class="article-img">

4. Chọn các sự kiện tương ứng
<img src="../public/images/send/4.png" class="article-img">

5. Cài đặt trong hệ thống Cloud Mail
<img src="../public/images/send/5.png" class="article-img">