## JSX 语法

可以在 JavaScript 代码中可以直接写 HTML，本质是动态创建组件的语法糖。

```jsx
const name = "Lisi";
const element = <h1>Hello, {name}</h1>;
```

```jsx
const name = "Lisi";
const element = React.createElement("h1", null, "Hello, ", name);
```

## JSX 的使用

### JSX 本身使用表达式

```jsx
const element = <p>age: {10 + 8}</p>;
```

### 在属性中使用表达式

```jsx
<MyComponent age={10 + 8} />
```

### 延展属性

```jsx
const props = { firstName: "Joe", lastName: "Lee" };
const person = <Person {...props} />;
```

### 子元素是表达式

```jsx
const element = <li>{props.message}</li>;
```

## JSX 的优点

1. 直观：声明式创建界面
2. 灵活：代码动态创建界面
3. 成本低：无需学习新的模板语言

## JSX 的约定

**自定义组件以大写字母开头**

1. React 默认小写的 tag 是原生 DOM 节点，大写字母开头的为自定义组件
2. JSX 可以直接使用属性语法，如`<menu.Item>`，此时不强制大写字母开头
