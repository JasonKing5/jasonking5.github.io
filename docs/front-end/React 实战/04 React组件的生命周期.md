![](/images/1650546266995-054965f9-a7d6-4e29-aea4-4aee55d7608b.png)

## React的阶段
1. render阶段

用户计算当前的状态。纯净且没有副作用，可能会被React暂停、终止或重新启动；

2. pre-commit阶段

commit：更新DOM节点。

React把当前的状态映射到DOM时，需要实际的更新DOM节点。该阶段并没有实际的更新DOM，但可以读取DOM节点的内容。

3. commit阶段

React把当前状态实际的更新到真实的DOM节点上。可以使用DOM，运行副作用，安排更新。

## React的生命周期
### 创建时
#### 1. constructor
初始化数据，很少使用，唯一可以直接修改state的地方。

#### 2. getDerivedStateFromProps
从外部的属性初始化内部状态，当state需要从props初始化时使用。

不建议使用，每次render都会调用。

典型场景：表单控件获取默认值。

#### 3. render
描述UI结构，组件唯一必须定义的生命周期方法。

#### 4. componentDidMount
render结束，可以请求API，定义外部资源等副作用的事情。

UI渲染完成后调用，在组件整个生命周期中只执行一次。

典型场景：获取外部资源。

### 更新时
引发更新的情况：

1. 外部props变化
2. 调用setState导致内部state变化
3. 主动调用forceUpdate()强制刷新

#### 1. getDerivedStateFromProps
从外部的属性初始化内部状态

#### 2. shouldComponentUpdate
告诉组件是否需要重新render。如果props的改变并不影响组件UI的变化，可以通过return false告诉组件不重新render。可以由PureComponent自动实现。

#### 3. getSnapshoBeforeUpdate
在页面render之前调用，state已更新。

典型场景：获取render之前的DOM状态

#### 4. componentDidUpdate
每次更新完毕都会调用。可以在更新完成后读取真实DOM数据并进行UI修改。

典型场景：页面根据props的变化重新获取数据。

### 卸载时
#### 1. componentWillUnmount
组件销毁时调用，可以在该方法中做资源释放。



