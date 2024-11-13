![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650546266995-054965f9-a7d6-4e29-aea4-4aee55d7608b.png)

## React 的阶段

1. render 阶段

用户计算当前的状态。纯净且没有副作用，可能会被 React 暂停、终止或重新启动；

2. pre-commit 阶段

commit：更新 DOM 节点。

React 把当前的状态映射到 DOM 时，需要实际的更新 DOM 节点。该阶段并没有实际的更新 DOM，但可以读取 DOM 节点的内容。

3. commit 阶段

React 把当前状态实际的更新到真实的 DOM 节点上。可以使用 DOM，运行副作用，安排更新。

## React 的生命周期

### 创建时

#### 1. constructor

初始化数据，很少使用，唯一可以直接修改 state 的地方。

#### 2. getDerivedStateFromProps

从外部的属性初始化内部状态，当 state 需要从 props 初始化时使用。

不建议使用，每次 render 都会调用。

典型场景：表单控件获取默认值。

#### 3. render

描述 UI 结构，组件唯一必须定义的生命周期方法。

#### 4. componentDidMount

render 结束，可以请求 API，定义外部资源等副作用的事情。

UI 渲染完成后调用，在组件整个生命周期中只执行一次。

典型场景：获取外部资源。

### 更新时

引发更新的情况：

1. 外部 props 变化
2. 调用 setState 导致内部 state 变化
3. 主动调用 forceUpdate()强制刷新

#### 1. getDerivedStateFromProps

从外部的属性初始化内部状态

#### 2. shouldComponentUpdate

告诉组件是否需要重新 render。如果 props 的改变并不影响组件 UI 的变化，可以通过 return false 告诉组件不重新 render。可以由 PureComponent 自动实现。

#### 3. getSnapshoBeforeUpdate

在页面 render 之前调用，state 已更新。

典型场景：获取 render 之前的 DOM 状态

#### 4. componentDidUpdate

每次更新完毕都会调用。可以在更新完成后读取真实 DOM 数据并进行 UI 修改。

典型场景：页面根据 props 的变化重新获取数据。

### 卸载时

#### 1. componentWillUnmount

组件销毁时调用，可以在该方法中做资源释放。
