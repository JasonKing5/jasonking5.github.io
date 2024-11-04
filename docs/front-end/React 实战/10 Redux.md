## 前端状态管理库

基于 Flux 设计模式提出的完整的前端数据状态管理框架。

![](/images/1650793753282-f0ebe372-19dc-4f3d-92a4-b25a1635ac0b.png)

整个项目只有一个全局的 Store，负责提供应用程序所有的状态。

![](/images/1650794002517-7018dc4b-60f6-433b-ae45-f32c8de01328.png)

Redux 让组件通信更加容易。Store 放在所有组件之外，所有组件和 Store 进行通信，形成单向数据流模式。

## Redux 特性

### 单项数据流

![传统MVC模式数据流](/images/1650794175284-c102a167-e457-481b-9de3-c81451a10475.png)![Redux中单向数据流](/images/1650794236548-e29b1dce-6fec-442c-9da7-9ff9cfb77703.png)

传统 MVC 模式下，View 和 Model 中数据依赖关系混乱。Redux 中所有 View 的数据都来自唯一的 Store，Store 中数据变化会自动更新 View，View 进行操作只能通过 action 触发 Store 的数据变化。

### 可预测性

`state + action = new state`

### 纯函数更新 Store

每个 action 对应的函数必须是一个纯函数（函数的输出结果完全取决于输入的参数，函数的内部不依赖于任何外部的参数和资源）。

## Store

![](/images/1650802270696-e3efe9fa-d916-44f4-9612-c59f5c9842ca.png)

## 在 React 中使用 Redux

![](/images/1650803094379-502d9e84-4244-4c24-b44a-531f7e0669d9.png)

### connect 的工作原理

![](/images/1650803185199-14efd12b-2f58-48fb-89d2-103597548d58.png)

通过高阶组件，将 Store 传递到组件中。

## Redux 异步请求

![](/images/1650885515361-66ca78b2-5888-4e1f-848f-232872f6d776.png)

Redux 中间件 Middlewares 判断 action 如果是一个 promise，则截获该 action，发出 API 请求，等待响应之后再发出 action。

## Action 和 Reducer 的组织形式

标准形式下的问题:

1. 所有 action 放在一个文件内容过多；
2. action 和 reducer 分开，实现业务逻辑时需要来回切换；
3. 查看系统中的 action 不够直观。

![](/images/1650887310788-8a305549-48ef-4c44-945e-7d669918525f.png)

将单个 action 和 reducer 放在同一个文件中，actions 和 reducers 分别汇总所有的 action 和 reducer。

1. 易于开发：不用在 action 和 reducer 文件之间来回切换；
2. 易于维护：每个 action 文件都很小；
3. 易于测试：每个业务逻辑只需对应一个测试文件；
4. 易于理解：文件名就是 action 名称，文件列表就是 action 列表。

## 不可变数据

![](/images/1650887738580-7aaf8983-919c-40dd-ab96-647e0d854c0f.png)

无法直接改变数据，只能复制一份，将需要修改的部分更新后返回新的数据。

1. 性能优化：只需要判断节点的数据引用是否变化，即可决定是否需要更新绑定该节点数据的组件；
2. 易于调试和跟踪：很容易记录之前和之后的数据状态，计算 diff 的值；
3. 易于推测：很明确的知道当前的变化是因何引起的，方便确定当前的 action 是否被正确调用。

### 操作方法

1. 原生写法：`{ ... }, Object.assign`；
2. immutability-helper：自动生成一个新的数据，适用于比较深的层次遍历更新；
3. immer：使用原生写法产生不可变数据，性能稍微差一些；

```javascript
import produce from "immer";

const baseState = [
  {
    title: "Learn TypeScript",
    done: true,
  },
  {
    title: "Try Immer",
    done: false,
  },
];

const nextState = produce(baseState, (draft) => {
  draft[1].done = true;
  draft.push({ title: "Tweet about it" });
});
```
