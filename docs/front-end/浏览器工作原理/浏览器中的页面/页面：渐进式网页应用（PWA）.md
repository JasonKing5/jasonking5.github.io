[视频链接](https://meeting.tencent.com/user-center/shared-record-info?id=ba82f321-0653-44eb-8bed-9be872830adb&from=6&click_source_for_middle_login=1)

## Progressive Web App
### Web 应用
一个 Web 页面

### 渐进式
+ 开发者
    1. 提供了一个渐进式的过渡方案，让 Web 应用能逐步具有本地应用的能力
    2. 降低站点改造的代价
+ 技术角度
    1. 渐进式的演化过程
    2. 逐渐提供更好的设备特性支持
    3. 不断优化更加流畅的动画效果
    4. 不断让页面的加载速度变得更快
    5. 不断实现本地应用的特性

> 充分发挥 Web 的优势，渐进式地缩短和本地应用或者小程序的距离
>

## Web 页面的缺陷
+ 缺少离线使用能力
+ 缺少消息推送的能力
+ 缺少一级入口

## Service Worker
![](/images/1642837927054-dcc42d48-4098-4cb1-ba28-cc2bd947e1a0.png)

+ 在页面和网络之间增加一个拦截器，用来缓存和拦截请求
+ 架构
    1. 运行在浏览器进程中
    2. 能够为所有的页面提供服务
+ 消息推送
    1. Service Worker 来接收服务器推送的消息，并将消息通过一定方式展示给用户
+ 安全
    1. 采用 HTTPS 协议
    2. 要将站点升级到 HTTPS
    3. 支持 Web 页面默认的安全策略：同源策略、[内容安全策略（CSP）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)等



[chrome service worker](https://developers.google.com/web/fundamentals/primers/service-workers)

