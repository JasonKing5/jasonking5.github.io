## 同构应用

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651063194595-eb44fa62-493a-4c6b-96ec-7df871c53b74.png)

首次请求由服务端解析返回页面，之后客户端操作都是单页应用。

- 页面打开速度快
- 搜索引擎友好

## 文件组织结构

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651063370576-cd90f404-cd11-4f01-8d8a-598f0e34c527.png)

1. 页面就是 pages 目录下的一个组件；
2. static 目录映射静态文件；
3. page 有特殊静态方法 getInitialProps；

## 页面中使用其它 React 组件

可以使用其它 React 组件，页面会针对性打包，仅包含其引入的组件。

## Link 实现同构路由

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651064162345-260e6987-29af-484a-9478-a94212783c6a.png)

不会刷新页面，可以使用 prefetch 预加载所有的资源。使用 replace 替换 URL。

## 动态加载

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1651064347639-76e11390-7c33-4a41-9644-4f0d7d626ed8.png)

只有动态加载的组件需要渲染的时候才会真正加载进来。
