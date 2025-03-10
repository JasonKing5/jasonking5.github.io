## Cookie

服务器给每个客户端写了一些只有服务器才能理解的数据，需要的时候客户端把这些信息发给服务器，服务器看到 Cookie，就能识别客户端了。

## Cookie 的工作过程

浏览器第一次访问服务器时，服务器不知道浏览器的身份，要创建一个独特的身份标识数据，格式是 key=value，放进 Set-Cookie 字段里，随着响应报文一同发给浏览器。浏览器收到响应报文，看到里面有 Set-Cookie，就保存起来，下次再请求的时候就自动把这个值放进 Cookie 字段里发给服务器。第二次请求里面有了 Cookie 字段，服务器就拿出 Cookie 里的值，识别出用户的身份，然后提供个性化的服务。服务器有时会在响应头里添加多个 Set-Cookie，存储多个 key=value，浏览器发送时不需要用多个 Cookie 字段，只要在一行里用 ; 隔开。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1652586054759-060bd335-e2af-4bf5-bf30-57be5f6e29b9.png)

## Cookie 的属性

Cookie 就是服务器委托浏览器存储在客户端里的一些数据，这些数据通常都会记录用户的关键识别信息。需要在 key=value 外再用一些手段来保护，防止外泄或窃取，这些手段就是 Cookie 的属性。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1653185039306-010397d1-f8e0-4503-af8e-4fcd87219141.png)

### 设置 Cookie 的生存周期

让它只能在一段时间内可用，一旦超过这个期限浏览器就认为是 Cookie 失效，在存储里删除，也不会发送给服务器。

Cookie 的有效期可以使用 Expires 和 Max-Age 两个属性来设置。Expires 过期时间，用的是绝对时间点 deadline。Max-Age 用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间。Expires 和 Max-Age 可以同时出现，两者的失效时间可以一致，也可以不一致，浏览器会优先采用 Max-Age 计算失效期。

### 设置 Cookie 的作用域

让浏览器仅发送给特定的服务器和 URI，避免被其他网站盗用。

Domain 和 Path 指定了 Cookie 所属的域名和路径，浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，对比 Cookie 的属性。如果不满足条件，就不会在请求头里发送 Cookie。可以为不同的域名和路径分别设置各自的 Cookie。

### Cookie 的安全性

尽量不要让服务器以外的人看到。

在 JS 脚本里可以用 document.cookie 来读写 Cookie 数据，有可能会导致跨站脚本（XSS）攻击窃取数据。

#### HttpOnly

告诉浏览器此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 document.cookie 等一切相关的 API。

#### SameSite

可以防范跨站请求伪造（XSRF）攻击，设置成 SameSite=Strict 可以严格限定 Cookie 不能随着跳转链接跨站发送，SameSite=Lax 宽松一点，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送。

#### Secure

表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送。但 Cookie 本身不是加密的，浏览器里还是以明文的形式存在。

## Cookie 的应用

### 身份识别

Cookie 最基本的一个用途就是身份识别，保存用户的登录信息，实现会话事务。

用账号和密码登录某电商，登录成功后网站服务器就会发给浏览器一个 Cookie，内容大概是 name=yourid，这样就成功贴上了身份标签。之后在网站里随便访问哪件商品的页面，浏览器都会自动把身份 Cookie 发给服务器，一方面免去了重复登录的麻烦，另一方面也能够自动记录你的浏览记录和购物下单（在后台数据库或者也用 Cookie），实现了状态保持。

### 广告跟踪

网页上的广告图片是广告商网站，会贴上 Cookie，上其他的网站时，别的广告就能用 Cookie 读出身份，然后做行为分析，再推广告。这种 Cookie 不是由访问的主站存储的，叫第三方 Cookie（third-party cookie）。
