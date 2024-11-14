React Hooks 是一种在 React 函数组件中添加状态管理和生命周期功能的方式。Hooks 于 React 16.8 引入，解决了之前只有类组件才能使用这些功能的限制。常用的 Hooks 包括 `useState`、`useEffect`、`useContext`、`useReducer` 等。

### 常见的 React Hook 及其使用场景

1. **`useState`**：用于在函数组件中声明状态变量。

   - **场景**：需要存储组件内的动态数据，例如用户输入、计数器等。
   - **示例**：

     ```javascript
     import React, { useState } from "react";

     function Counter() {
       const [count, setCount] = useState(0);

       return (
         <div>
           <p>Count: {count}</p>
           <button onClick={() => setCount(count + 1)}>Increment</button>
         </div>
       );
     }
     ```

2. **`useEffect`**：用于在函数组件中执行副作用操作，例如数据获取、订阅等。

   - **场景**：替代生命周期函数（如 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount`）。
   - **示例**：

     ```javascript
     import React, { useState, useEffect } from "react";

     function FetchData() {
       const [data, setData] = useState(null);

       useEffect(() => {
         fetch("https://api.example.com/data")
           .then((response) => response.json())
           .then((data) => setData(data));
       }, []); // 空数组使得副作用仅在初次渲染时执行

       return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
     }
     ```

3. **`useContext`**：用于在组件树中传递数据，避免在每个层级手动传递 props。

   - **场景**：在多层嵌套组件中共享状态，例如主题、语言等设置。
   - **示例**：

     ```javascript
     import React, { createContext, useContext } from "react";

     const ThemeContext = createContext("light");

     function ThemedComponent() {
       const theme = useContext(ThemeContext);
       return <div>Current theme: {theme}</div>;
     }

     function App() {
       return (
         <ThemeContext.Provider value="dark">
           <ThemedComponent />
         </ThemeContext.Provider>
       );
     }
     ```

4. **`useReducer`**：用于复杂状态逻辑管理，类似于 Redux 的 reducer 概念。

   - **场景**：当组件的状态更新逻辑复杂且涉及多个子状态时。
   - **示例**：

     ```javascript
     import React, { useReducer } from "react";

     function reducer(state, action) {
       switch (action.type) {
         case "increment":
           return { count: state.count + 1 };
         case "decrement":
           return { count: state.count - 1 };
         default:
           throw new Error();
       }
     }

     function Counter() {
       const [state, dispatch] = useReducer(reducer, { count: 0 });

       return (
         <div>
           <p>Count: {state.count}</p>
           <button onClick={() => dispatch({ type: "increment" })}>
             Increment
           </button>
           <button onClick={() => dispatch({ type: "decrement" })}>
             Decrement
           </button>
         </div>
       );
     }
     ```

### Hooks 的底层原理

React Hooks 的实现基于一组机制，主要包括闭包、依赖数组和单链表数据结构来实现 Hook 调用的顺序追踪：

1. **单链表机制**：React 在渲染函数组件时会记录调用的每个 Hook。每次渲染时，它会保持 Hooks 的调用顺序一致性，便于在后续渲染中将状态和副作用绑定到正确的 Hook。
2. **闭包**：由于 Hooks 会在函数组件中捕获状态和函数作用域的变量，所以闭包让 React 能够将最新的状态和属性保存在作用域中，从而确保组件行为正确。

3. **依赖数组**：`useEffect` 和 `useCallback` 等 Hooks 的依赖数组用来控制副作用或函数的重新创建时机。React 使用依赖数组的变化来判断是否需要重新执行某些操作，避免不必要的性能开销。

4. **调度机制**：React 通过调度器（Scheduler）来管理 Hook 调用的顺序和状态更新的顺序，使得多次状态更新能够批处理完成。

5. **虚拟 DOM 和 Fiber**：Hooks 与 React 的 Fiber 架构协同工作，能够在虚拟 DOM 的 reconciliation 过程中跟踪每个组件的状态并高效更新。

### Hooks 的优点

- **简洁代码**：替代类组件，更简洁直观。
- **代码复用**：通过自定义 Hook 抽离逻辑，代码更易复用。
- **组件逻辑集中**：相比于类组件，将 UI 和逻辑更自然地整合在一起。

### 自定义 Hook 示例

以下是一个自定义 Hook 示例，实现计数逻辑的复用：

```javascript
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return { count, increment, decrement };
}

// 使用自定义 Hook
function CounterComponent() {
  const { count, increment, decrement } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

这个自定义 Hook `useCounter` 可以在多个组件中复用计数逻辑，不必重复实现相同的逻辑。
