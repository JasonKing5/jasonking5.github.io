[视频链接](https://meeting.tencent.com/user-center/shared-record-info?id=72122fe2-f7bb-497d-a224-a02aa539d369&from=6&click_source_for_middle_login=1)

## DOM的缺陷
+ 整个渲染流水线
+ 可能引发强制同步布局和布局抖动

## [虚拟DOM](https://reactjs.org/docs/faq-internals.html)
### 解决的问题
+ 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上
+ 变化被应用到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟 DOM 的内部状态，这样操作虚拟 DOM 的代价就变得非常轻了
+ 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上

![](/images/1642292982046-44939690-64af-43a5-a78e-ceade62ac86d.png)

### 运行方式
1. 创建阶段
    1. 依据 [JSX](https://reactjs.org/docs/introducing-jsx.html) 和基础数据创建出来虚拟 DOM
    2. 由虚拟 DOM 树创建出真实 DOM 树
    3. 触发渲染流水线往屏幕输出页面
2. [更新](https://codepen.io/pen?&editors=0010)阶段
    1. 根据新的数据创建一个新的虚拟 DOM
    2. 比较两个树，找出变化的地方，并把变化的地方一次性更新到真实的 DOM 树上

[React Fiber 更新机制](https://github.com/acdlite/react-fiber-architecture) （[原理介绍](https://segmentfault.com/a/1190000018250127)）

    3. 染引擎更新渲染流水线，并生成新的页面

### 双缓存
	减少一些不必要的更新

	保证 DOM 的稳定输出

### MVC 模式
![](/images/1642292963934-c8319fa0-1fe0-416c-bbfe-378590adf545.png)

![](/images/1642292939771-db0027b9-4b64-472c-b5e2-bfb833c5f53c.png)

	React 视图

	action/reducer 控制器

	Store/state 模型





