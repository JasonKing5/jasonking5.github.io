跳转动作由浏览器的使用者主动发起的，称为主动跳转。由服务器来发起的，浏览器使用者无法控制，称为被动跳转，HTTP 协议里叫做重定向（Redirection）。

## 重定向的过程
头字段 `Location: /index.html`：

Location 字段属于响应字段，必须出现在响应报文里。但只有配合 301/302 状态码才有意义，它标记了服务器要求重定向的 URI，这里就是要求浏览器跳转到 index.html。



浏览器收到 301/302 报文，会检查响应头里有没有 Location。如果有就从字段值里提取出 URI，发出新的 HTTP 请求，相当于自动替用户点击了这个链接。



重定向时如果只是在站内跳转，可以使用相对 URI。如果要跳转到站外，就必须用绝对 URI。

## 重定向状态码
+ 301 永久重定向 Moved Permanently：原 URI 已经永久性地不存在了，所有请求都必须改用新的 URI。
+ 302 临时重定向 Moved Temporarily：原 URI 处于临时维护状态，新的 URI 临时使用。
+ 303 See Other：类似 302，但要求重定向后的请求改为 GET 方法，访问一个结果页面，避免 POST/PUT 重复操作；
+ 307 Temporary Redirect：类似 302，但重定向后请求里的方法和实体不允许变动，含义比 302 更明确；
+ 308 Permanent Redirect：类似 307，不允许重定向后的请求变动，但它是 301 永久重定向 的含义。

