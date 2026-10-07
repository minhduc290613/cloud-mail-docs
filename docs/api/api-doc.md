# Tài liệu API

::: tip
Ngoại trừ API「Đăng nhập」, các API còn lại đều yêu cầu truyền token xác thực nhận được sau khi đăng nhập vào header `Authorization` (không thêm tiền tố Bearer). Các API quản trị yêu cầu quyền tương ứng, tài khoản quản trị viên không bị giới hạn.
:::

## API Đăng nhập

### Đăng nhập

**Mô tả API**: Đăng nhập bằng email và mật khẩu, trả về token xác thực

**Đường dẫn API**: `POST /api/login`

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------ | --- | --- | ----------------------------- |
| email | string | | Có | Địa chỉ email đầy đủ, ví dụ `admin@example.com` |
| password | string | | Có | Mật khẩu email |

#### Ví dụ yêu cầu

```bash
curl -X POST "https://mail.protechvn.io.vn/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Thông tin người dùng hiện tại

**Mô tả API**: Lấy thông tin tài khoản, vai trò và danh sách quyền hạn của người dùng đang đăng nhập

**Đường dẫn API**: `GET /api/my/loginUserInfo`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/my/loginUserInfo" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
      "userId": 1,                          // ID người dùng
      "email": "admin@example.com",         // Email người dùng
      "name": "admin",                      // Tên người dùng
      "type": 0,                            // ID vai trò quyền hạn (quản trị viên là 0)
      "sendCount": 0,                       // Số lượt thư đã gửi
      "permKeys": ["*"],                    // Danh sách quyền hạn, quản trị viên là ["*"]
      "account": {
          "accountId": 1,                   // ID hộp thư email
          "email": "admin@example.com",
          "name": "admin"
      },
      "role": {
          "name": "admin",                  // Tên vai trò
          "sendCount": 0,                   // Giới hạn lượt gửi, 0 là không giới hạn
          "sendType": "count",              // Loại giới hạn gửi (count: tổng số, day: hàng ngày)
          "accountCount": 0                 // Số lượng hộp thư có thể thêm, 0 là không giới hạn
      }
  }
}
```

## Người dùng - Email

### Danh sách email

**Mô tả API**: Truy vấn email của người dùng hiện tại, sử dụng phân trang con trỏ `emailId`

**Đường dẫn API**: `GET /api/email/list`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ---------- | ------- | --- | --- | -------------------------------------------------- |
| accountId | integer | | Có | ID hộp thư email |
| type | integer | 0 | Không | Loại email (0: hộp thư đến, 1: đã gửi) |
| emailId | integer | | Không | ID email con trỏ, truy vấn lần đầu có thể bỏ qua. Khi `timeSort` = 0 sẽ lấy email cũ hơn, khi = 1 sẽ lấy email mới hơn |
| size | integer | 10 | Không | Số lượng mỗi trang, tối đa 50 |
| timeSort | integer | | Không | Sắp xếp thời gian (0: mới nhất, 1: cũ nhất) |
| allReceive | integer | | Không | Có truy vấn tất cả hộp thư của người dùng hay không (0: không, 1: có). Mặc định dùng cài đặt nhận toàn bộ của hộp thư |
| full | integer | 1 | Không | Có trả về đầy đủ các trường hay không (0: tóm tắt, 1: đầy đủ nội dung và tệp đính kèm) |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/email/list?accountId=1&size=10" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 1,
    "latestEmail": {
      "emailId": 999,
      "accountId": 1,
      "userId": 1
    },
    "list": [
      {
        "emailId": 999,                       // ID email
        "sendEmail": "hello@example.com",     // Email người gửi
        "name": "hello",                      // Tên người gửi
        "subject": "Hello word",              // Tiêu đề email
        "toEmail": "admin@example.com",       // Email người nhận
        "accountId": 1,                       // ID hộp thư email
        "type": 0,                            // Loại email (0: nhận, 1: gửi)
        "status": 0,                          // Trạng thái email (0: nhận, 1: đã gửi, 2: đã chuyển giao, 3: bị trả lại, 4: khiếu nại, 5: trễ, 6: đang lưu, 7: không người nhận, 8: thất bại)
        "unread": 0,                          // Trạng thái đọc (0: chưa đọc, 1: đã đọc)
        "isDel": 0,                           // Trạng thái xóa (0: bình thường, 1: đã xóa)
        "isStar": 0,                          // Gắn sao (0: không, 1: có)
        "content": "<div>Hello word</div>",   // Nội dung HTML email, trả về khi full=1
        "text": "Hello word",                 // Nội dung văn bản thuần của email
        "createTime": "2099-12-30 23:59:59",  // Thời gian nhận hoặc gửi (UTC)
        "attList": [                          // Danh sách tệp đính kèm, trả về khi full=1
          {
            "attId": 1,
            "filename": "file.txt",
            "mimeType": "text/plain",
            "size": 1024
          }
        ]
      }
    ]
  }
}
```

### Gửi email

**Mô tả API**: Gửi email bằng tài khoản hộp thư của người dùng hiện tại. Tối đa 10 tệp đính kèm, tối đa 10 hình ảnh nhúng trong nội dung

**Đường dẫn API**: `POST /api/email/send`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------------- | -------------------- | --- | --- | ----------------------------------- |
| accountId | integer | | Có | ID hộp thư người gửi |
| receiveEmail | array &lt;string&gt; | | Có | Danh sách email người nhận |
| subject | string | | Có | Tiêu đề email |
| content | string | | Có | Nội dung HTML email |
| text | string | | Không | Văn bản thuần của email |
| name | string | | Không | Tên người gửi, để trống sẽ tự lấy tiền tố email |
| sendType | string | | Không | Loại gửi thư (để trống: thư mới, `reply`: trả lời, `forward`: chuyển tiếp) |
| emailId | integer | | Không | ID email gốc, bắt buộc khi `sendType` là `reply` |
| attachments | array &lt;object&gt; | | Không | Danh sách tệp đính kèm |
| └─ filename | string | | Có | Tên tệp tin |
| └─ content | string | | Có | Nội dung tệp tin (chuỗi Base64) |
| └─ contentType | string | | Không | Kiểu MIME của tệp tin |
| └─ size | integer | | Không | Kích thước tệp tin |

#### Ví dụ yêu cầu

```bash
curl -X POST "https://skymail.ink/api/email/send" \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 1,
    "name": "admin",
    "receiveEmail": ["hello@example.com"],
    "subject": "Hello word",
    "content": "<div>Hello word</div>",
    "text": "Hello word",
    "sendType": "",
    "attachments": [
      {
        "filename": "file.txt",
        "contentType": "text/plain",
        "content": "SGVsbG8gd29yZA=="
      }
    ]
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "emailId": 999,                         // ID email
      "sendEmail": "admin@example.com",       // Email người gửi
      "name": "admin",                        // Tên người gửi
      "subject": "Hello word",                // Tiêu đề email
      "content": "<div>Hello word</div>",     // Nội dung HTML email
      "text": "Hello word",                   // Văn bản thuần email
      "type": 1,                              // Loại email (1: đã gửi)
      "status": 1,                            // Trạng thái email (1: đã gửi, 2: đã chuyển giao)
      "accountId": 1,
      "userId": 1,
      "createTime": "2099-12-30 23:59:59",
      "attList": []
    }
  ]
}
```

### Xóa email

**Mô tả API**: Xóa email của người dùng hiện tại. Mặc định là đánh dấu đã xóa; khi hệ thống bật xóa đồng bộ sẽ là xóa vĩnh viễn

**Đường dẫn API**: `DELETE /api/email/delete`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------ | --- | --- | --------------- |
| emailIds | string | | Có | ID email, nhiều ID phân cách bằng dấu phẩy |

#### Ví dụ yêu cầu

```bash
curl -X DELETE "https://skymail.ink/api/email/delete?emailIds=1,2" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## Người dùng - Hộp thư

### Danh sách hộp thư

**Mô tả API**: Truy vấn danh sách hộp thư của người dùng hiện tại, phân trang theo thứ tự ghim/sắp xếp

**Đường dẫn API**: `GET /api/account/list`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| --------- | ------- | --- | --- | ------------------------------------------------ |
| size | integer | | Không | Số lượng mỗi trang, tối đa 30 |
| accountId | integer | | Không | ID hộp thư con trỏ, truy vấn lần đầu có thể bỏ qua |
| lastSort | integer | | Không | Giá trị sắp xếp con trỏ, truy vấn lần đầu có thể bỏ qua. Trang tiếp theo truyền `sort` và `accountId` của mục cuối trang trước |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/account/list?size=15" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "accountId": 1,                         // ID hộp thư
      "email": "admin@example.com",           // Địa chỉ email
      "name": "admin",                        // Tên hộp thư
      "userId": 1,                            // ID người dùng sở hữu
      "allReceive": 0,                        // Nhận toàn bộ (0: không, 1: có)
      "sort": 0,                              // Thứ tự sắp xếp, số càng lớn càng ưu tiên hiển thị trước
      "isDel": 0,                             // Trạng thái xóa (0: bình thường, 1: đã xóa)
      "createTime": "2099-12-30 23:59:59"     // Thời gian tạo
    }
  ]
}
```

### Thêm hộp thư

**Mô tả API**: Thêm địa chỉ hộp thư cho người dùng hiện tại. Tên miền email phải nằm trong danh sách đã cấu hình, không thể thêm địa chỉ đã tồn tại hoặc đã hủy

**Đường dẫn API**: `POST /api/account/add`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ----- | ------ | --- | --- | ----------------------------- |
| email | string | | Có | Địa chỉ email đầy đủ, ví dụ `hello@example.com` |
| token | string | | Không | Token xác minh người máy, bắt buộc khi hệ thống bật tính năng xác minh thêm hộp thư |

#### Ví dụ yêu cầu

```bash
curl -X POST "https://skymail.ink/api/account/add" \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hello@example.com"
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "accountId": 2,                           // ID hộp thư
    "email": "hello@example.com",             // Địa chỉ email
    "name": "hello",                          // Tên hộp thư, tự động cắt theo tiền tố email
    "userId": 1,
    "allReceive": 0,
    "sort": 0,
    "isDel": 0,
    "createTime": "2099-12-30 23:59:59",
    "addVerifyOpen": false                    // Lần thêm tiếp theo có cần xác minh người máy không
  }
}
```

### Xóa hộp thư

**Mô tả API**: Xóa hộp thư của người dùng hiện tại. Không thể xóa hộp thư chính đăng nhập. Mặc định là đánh dấu đã xóa; khi hệ thống bật xóa đồng bộ sẽ là xóa vĩnh viễn

**Đường dẫn API**: `DELETE /api/account/delete`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| --------- | ------- | --- | --- | ------- |
| accountId | integer | | Có | ID hộp thư |

#### Ví dụ yêu cầu

```bash
curl -X DELETE "https://skymail.ink/api/account/delete?accountId=2" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## Quản trị viên - Quản lý người dùng

### Danh sách người dùng

**Mô tả API**: Truy vấn danh sách người dùng theo phân trang, có thể lọc theo email, trạng thái, trạng thái xóa

**Đường dẫn API**: `GET /api/user/list`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------- | ----- | --- | ----------------------------------------------- |
| num | integer | 1 | Không | Số trang |
| size | integer | 50 | Không | Số lượng mỗi trang, tối đa 50 |
| email | string | | Không | Email, tìm kiếm mờ theo tiền tố |
| timeSort | integer | | Không | Sắp xếp theo thời gian (0: mới nhất, 1: cũ nhất) |
| status | integer | | Không | Trạng thái người dùng (0: bình thường, 1: bị khóa). Truyền 0 hoặc 1 chỉ trả về người dùng chưa bị xóa, không truyền hoặc -1 không lọc theo trạng thái |
| isDel | integer | | Không | Trạng thái xóa (0: bình thường, 1: đã xóa) |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/user/list?num=1&size=50" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 1,
    "list": [
      {
        "userId": 1,                          // ID người dùng
        "email": "admin@example.com",         // Email người dùng
        "type": 0,                            // ID vai trò quyền hạn (quản trị viên là 0)
        "status": 0,                          // Trạng thái người dùng (0: bình thường, 1: bị khóa)
        "isDel": 0,                           // Trạng thái xóa (0: bình thường, 1: đã xóa)
        "sendCount": 0,                       // Số lượt thư đã gửi
        "createTime": "2099-12-30 23:59:59",  // Thời gian đăng ký
        "activeTime": "2099-12-30 23:59:59",  // Hoạt động gần nhất
        "createIp": "127.0.0.1",              // IP đăng ký
        "activeIp": "127.0.0.1",              // IP hoạt động gần nhất
        "os": "Windows",                      // Hệ điều hành
        "browser": "Chrome",                  // Trình duyệt
        "device": "Desktop",                  // Thiết bị
        "receiveEmailCount": 10,              // Số thư đã nhận
        "sendEmailCount": 2,                  // Số thư đã gửi
        "accountCount": 1,                    // Số lượng hộp thư
        "delReceiveEmailCount": 0,            // Số thư nhận đã xóa
        "delSendEmailCount": 0,               // Số thư gửi đã xóa
        "delAccountCount": 0,                 // Số lượng hộp thư đã xóa
        "username": null,                     // Tên người dùng đăng nhập bên thứ ba
        "name": null,                         // Biệt danh đăng nhập bên thứ ba
        "avatar": null,                       // Ảnh đại diện đăng nhập bên thứ ba
        "platform": null,                     // Nền tảng đăng nhập bên thứ ba
        "trustLevel": null,                   // Cấp độ tin cậy đăng nhập bên thứ ba
        "sendAction": {
          "hasPerm": true,                    // Có quyền gửi thư không
          "sendType": "count",                // Loại giới hạn gửi (count: tổng số, day: hàng ngày)
          "sendCount": 0                      // Giới hạn lượt gửi, 0 là không giới hạn
        }
      }
    ]
  }
}
```

### Thêm người dùng

**Mô tả API**: Quản trị viên thêm người dùng, tên miền email phải là tên miền đã cấu hình, mật khẩu tối thiểu 6 ký tự

**Đường dẫn API**: `POST /api/user/add`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------- | --- | --- | ---------------------------- |
| email | string | | Có | Địa chỉ email đầy đủ, ví dụ `user@example.com` |
| password | string | | Có | Mật khẩu, tối thiểu 6 ký tự |

#### Ví dụ yêu cầu

```bash
curl -X POST "https://skymail.ink/api/user/add" \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### Đổi trạng thái

**Mô tả API**: Bật hoặc khóa người dùng; sau khi khóa, toàn bộ phiên đăng nhập của người dùng sẽ bị vô hiệu

**Đường dẫn API**: `PUT /api/user/setStatus`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ------ | ------- | --- | --- | --------------- |
| userId | integer | | Có | ID người dùng |
| status | integer | | Có | Trạng thái người dùng (0: bình thường, 1: bị khóa) |

#### Ví dụ yêu cầu

```bash
curl -X PUT "https://skymail.ink/api/user/setStatus" \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "status": 1
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### Xóa người dùng

**Mô tả API**: Xóa vĩnh viễn người dùng cùng các hộp thư, email, dấu sao và liên kết đăng nhập bên thứ ba, không thể khôi phục

**Đường dẫn API**: `DELETE /api/user/delete`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ------- | ------ | --- | --- | --------------- |
| userIds | string | | Có | ID người dùng, nhiều ID phân cách bằng dấu phẩy |

#### Ví dụ yêu cầu

```bash
curl -X DELETE "https://skymail.ink/api/user/delete?userIds=1,2" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## Quản trị viên - Tất cả thư

### Danh sách email

**Mô tả API**: Truy vấn email của toàn bộ người dùng, sử dụng phân trang con trỏ `emailId`, có thể lọc theo loại thư, người gửi, chủ đề, email người dùng, email gửi/nhận

**Đường dẫn API**: `GET /api/allEmail/list`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ------------ | ------- | --------- | --- | --------------------------------------------------------------- |
| emailId | integer | | Không | ID email con trỏ, lần đầu có thể bỏ qua. Khi `timeSort` = 0 sẽ lấy email cũ hơn, khi = 1 sẽ lấy email mới hơn |
| size | integer | 10 | Không | Số lượng mỗi trang, tối đa 50 |
| timeSort | integer | | Không | Sắp xếp thời gian (0: mới nhất, 1: cũ nhất) |
| type | string | `receive` | Không | Loại email (`all`: tất cả, `receive`: nhận, `send`: gửi, `delete`: đã xóa, `noone`: không người nhận) |
| name | string | | Không | Tên người gửi, tìm kiếm mờ theo tiền tố |
| subject | string | | Không | Tiêu đề email, tìm kiếm mờ theo tiền tố |
| userEmail | string | | Không | Email của người dùng sở hữu, tìm kiếm mờ theo tiền tố |
| accountEmail | string | | Không | Email người gửi hoặc người nhận, tìm kiếm mờ theo tiền tố |
| full | integer | 1 | Không | Có trả về đầy đủ các trường hay không (0: tóm tắt, 1: đầy đủ nội dung và tệp đính kèm) |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/allEmail/list?type=receive&size=10" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 1,
    "latestEmail": {
      "emailId": 999,                         // ID email mới nhất nhận được, dùng để polling làm mới
      "accountId": 1,
      "userId": 1
    },
    "list": [
      {
        "emailId": 999,                       // ID email
        "sendEmail": "hello@example.com",     // Email người gửi
        "name": "hello",                      // Tên người gửi
        "subject": "Hello word",              // Tiêu đề email
        "toEmail": "admin@example.com",       // Email người nhận
        "toName": "admin",                    // Tên người nhận
        "userEmail": "admin@example.com",     // Email của người dùng sở hữu
        "accountId": 1,                       // ID hộp thư email
        "userId": 1,                          // ID người dùng sở hữu
        "type": 0,                            // Loại email (0: nhận, 1: gửi)
        "status": 0,                          // Trạng thái email (0: nhận, 1: đã gửi, 2: đã chuyển giao, 3: bị trả lại, 4: khiếu nại, 5: trễ, 6: đang lưu, 7: không người nhận, 8: thất bại)
        "unread": 0,                          // Trạng thái đọc (0: chưa đọc, 1: đã đọc)
        "isDel": 0,                           // Trạng thái xóa (0: bình thường, 1: đã xóa)
        "content": "<div>Hello word</div>",   // Nội dung HTML email, trả về khi full=1
        "text": "Hello word",                 // Nội dung văn bản thuần của email
        "cc": "[]",                           // Đồng kính gửi (CC)
        "bcc": "[]",                          // Đồng kính gửi ẩn (BCC)
        "createTime": "2099-12-30 23:59:59",  // Thời gian nhận hoặc gửi (UTC)
        "attList": [                          // Danh sách tệp đính kèm, trả về khi full=1
          {
            "attId": 1,
            "filename": "file.txt",
            "mimeType": "text/plain",
            "size": 1024
          }
        ]
      }
    ]
  }
}
```

### Xóa email

**Mô tả API**: Xóa vĩnh viễn email đã chỉ định cùng tệp đính kèm và dấu sao, không thể khôi phục

**Đường dẫn API**: `DELETE /api/allEmail/delete`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------ | --- | --- | --------------- |
| emailIds | string | | Có | ID email, nhiều ID phân cách bằng dấu phẩy |

#### Ví dụ yêu cầu

```bash
curl -X DELETE "https://skymail.ink/api/allEmail/delete?emailIds=1,2" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## Quản trị viên - Mã mời

### Danh sách mã mời

**Mô tả API**: Truy vấn toàn bộ mã mời, có thể lọc theo tiền tố mã mời. Mã mời đã hết hạn sẽ có `expireTime` trả về `null`

**Đường dẫn API**: `GET /api/regKey/list`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ---- | ------ | --- | --- | ---------- |
| code | string | | Không | Mã mời, tìm kiếm mờ theo tiền tố |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/regKey/list?code=Ab12" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "regKeyId": 1,                          // ID mã mời
      "code": "Ab12Cd34",                     // Mã mời
      "count": 10,                            // Số lượt sử dụng còn lại
      "roleId": 1,                            // ID vai trò quyền hạn
      "roleName": "Người dùng thông thường",  // Tên vai trò quyền hạn
      "userId": 1,                            // ID người dùng tạo
      "expireTime": "2099-12-30 00:00:00",    // Thời hạn hiệu lực, đã hết hạn là null
      "createTime": "2099-12-30 23:59:59"     // Thời gian tạo
    }
  ]
}
```

### Thêm mã mời

**Mô tả API**: Tạo mã mời. Mã mời không được trùng lặp, người dùng đăng ký bằng mã mời này sẽ nhận được vai trò quyền hạn tương ứng

**Đường dẫn API**: `POST /api/regKey/add`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| ---------- | ------- | --- | --- | ------------------- |
| code | string | | Có | Mã mời |
| roleId | integer | | Có | ID vai trò quyền hạn |
| count | integer | | Có | Số lượt có thể sử dụng |
| expireTime | string | | Có | Thời hạn hiệu lực, ví dụ `2099-12-30` |

#### Ví dụ yêu cầu

```bash
curl -X POST "https://skymail.ink/api/regKey/add" \
  -H "Authorization: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "Ab12Cd34",
    "roleId": 1,
    "count": 10,
    "expireTime": "2099-12-30"
  }'
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### Lịch sử sử dụng

**Mô tả API**: Truy vấn danh sách người dùng đã hoàn tất đăng ký bằng mã mời này

**Đường dẫn API**: `GET /api/regKey/history`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| -------- | ------- | --- | --- | ------ |
| regKeyId | integer | | Có | ID mã mời |

#### Ví dụ yêu cầu

```bash
curl -X GET "https://skymail.ink/api/regKey/history?regKeyId=1" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "email": "user@example.com",            // Email người dùng đăng ký
      "createTime": "2099-12-30 23:59:59"     // Thời gian đăng ký
    }
  ]
}
```

### Xóa mã mời

**Mô tả API**: Xóa mã mời đã chỉ định

**Đường dẫn API**: `DELETE /api/regKey/delete`

#### Header yêu cầu

| Header | Bắt buộc | Mô tả |
| ------------- | ---- | -------- |
| Authorization | Có | Token xác thực |

#### Tham số yêu cầu

| Tham số | Loại | Mặc định | Bắt buộc | Mô tả |
| --------- | ------ | --- | --- | ---------------- |
| regKeyIds | string | | Có | ID mã mời, nhiều ID phân cách bằng dấu phẩy |

#### Ví dụ yêu cầu

```bash
curl -X DELETE "https://skymail.ink/api/regKey/delete?regKeyIds=1,2" \
  -H "Authorization: YOUR_TOKEN"
```

#### Ví dụ phản hồi

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

