---
slug: vite-react
title: 从0到1搭建 Vite + React 前端项目
authors: [jason]
tags: [Project]
---

从零开始构建一个完整的 Vite + React + TypeScript 前端项目架构



## 介绍

在本文中，我们将通过一步步构建一个现代化的前端项目架构，使用 **Vite** 作为构建工具，**React** 和 **TypeScript** 作为开发框架，并引入 **Zustand** 进行状态管理，**React Router** 实现路由功能，最后展示一个简单的技术博客网站，其中包括注册登录功能和博客列表展示。你将学到如何整合这些主流技术，并快速搭建起一个功能齐全的前端项目框架。



## 项目结构

本项目的技术栈：
- **Vite**：现代前端构建工具，提供极速的开发体验。
- **React**：用于构建用户界面的 JavaScript 库。
- **TypeScript**：静态类型检查，增强代码的可维护性。
- **Zustand**：轻量级的状态管理库。
- **React Router**：实现前端路由功能，控制不同页面的展示。

<!--truncate-->



## 1. 初始化 Vite + React + TypeScript 项目

首先，我们使用 Vite 创建一个基础的 React + TypeScript 项目。

### 1.1 创建项目

```bash
npm create vite@latest my-blog-project --template react-ts
cd my-blog-project
npm install
```

### 1.2 启动开发服务器

```bash
npm run dev
```

在浏览器中访问 [http://localhost:5173](http://localhost:5173)，你应该能看到 Vite 提供的默认页面。



## 2. 配置 TailwindCSS

TailwindCSS 是一个流行的实用型 CSS 框架，能够提高开发效率。

### 2.1 安装 TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2.2 配置 `tailwind.config.cjs`

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2.3 配置 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```



## 3. 配置 SWC 加速编译

SWC 是一种编译工具，能够比传统的 Babel 更快速地构建和编译 TypeScript 代码。

### 3.1 安装 SWC 插件

```bash
npm install -D @vitejs/plugin-react-swc
```

### 3.2 修改 `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```



## 4. 添加 Axios 进行 API 请求

Axios 是一个流行的 HTTP 请求库，能够简化与后端的交互。

### 4.1 安装 Axios

```bash
npm install axios
```

### 4.2 创建 `src/api/axiosInstance.ts`

为了管理所有的 HTTP 请求，我们将创建一个 axios 实例，以便在整个应用程序中重用配置。以下是 `src/api/axiosInstance.ts` 的完整代码：

```typescript
import axios from 'axios'

// 创建一个 axios 实例，配置基本的请求参数
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',  // 设置基础 URL
  timeout: 10000,  // 设置请求超时时间
})

// 请求拦截器：你可以在这里添加认证令牌等额外的请求头
axiosInstance.interceptors.request.use(
  (config) => {
    // 比如在请求头中添加 token
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器：在这里可以处理响应数据或者错误信息
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data  // 直接返回响应的 data 部分
  },
  (error) => {
    // 统一处理错误
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
```

在此配置中：
- 我们创建了一个 axios 实例并配置了基本的 `baseURL` 和 `timeout`。
- 添加了请求拦截器，用于在请求头中注入身份验证 token。
- 添加了响应拦截器，统一处理 API 响应和错误。

使用这个实例，你可以在任何组件或页面中发送 HTTP 请求，如下所示：

```typescript
import axiosInstance from './api/axiosInstance'

// 示例请求
axiosInstance.get('/blogs')
  .then(response => {
    console.log('Blogs:', response)
  })
  .catch(error => {
    console.error('Request failed:', error)
  })
```



## 5. 配置 ESLint 和 Prettier

ESLint 用于检测代码中的潜在错误和不一致，Prettier 用于格式化代码，确保团队协作时的代码风格一致。

### 5.1 安装依赖

```bash
npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
```

### 5.2 配置 `.eslintrc.cjs`

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
```

### 5.3 配置 `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": false
}
```



## 6. 添加 Zustand 进行状态管理

Zustand 是一个非常轻量的状态管理库，适合小型和中型项目使用。

### 6.1 安装 Zustand

```bash
npm install zustand
```

### 6.2 创建状态管理文件

在 `src/store/useStore.ts` 中管理全局状态：

```typescript
import { create } from 'zustand'

interface AppState {
  user: string | null
  setUser: (user: string | null) => void
}

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export default useStore
```



## 7. 集成 React Router

React Router 是 React 应用的标准路由库，允许在不同的页面间切换。

### 7.1 安装 React Router

```bash
npm install react-router-dom
```

### 7.2 配置路由

在 `src/main.tsx` 中配置路由：

```tsx
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Tags from './pages/Tags'
import Register from './pages/Register'
import Login from './pages/Login'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="tags" element={<Tags />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
```



## 8. 创建页面和布局

### 8.1 主要布局组件

在 `src/layouts/MainLayout.tsx` 中定义布局：

```tsx
import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tags" className="hover:underline">Tags</Link>
        </nav>
      </header>
      <main className="flex-grow p-5">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center p-4">© 2024 My Technical Blog</footer>
    </div>
  )
}
```

### 8.2 页面组件

#### `src/pages/Home.tsx`

```tsx
export default function Home() {
  return <div

>Home Page: List of technical blogs</div>
}
```

#### `src/pages/Tags.tsx`

```tsx
export default function Tags() {
  return <div>Tags Page: Manage blog tags</div>
}
```



## 9. 实现博客功能

### 9.1 首页展示技术博客文章列表

在 `src/pages/Home.tsx` 中渲染博客列表：

```tsx
import { blogs } from '../api/mockData'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Technical Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-2">
            <h2 className="text-xl">{blog.title}</h2>
            <p className="text-gray-600">Tags: {blog.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### 9.2 标签页面展示博客标签

在 `src/pages/Tags.tsx` 展示标签列表：

```tsx
import { blogs } from '../api/mockData'

export default function Tags() {
  const tagCount = blogs
    .flatMap((blog) => blog.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      <ul>
        {Object.entries(tagCount).map(([tag, count]) => (
          <li key={tag} className="mb-2">
            {tag} ({count})
          </li>
        ))}
      </ul>
    </div>
  )
}
```



## 总结

本文演示了如何从零开始构建一个功能齐全的 Vite + React + TypeScript 前端项目，并集成了 **TailwindCSS**、**Axios**、**Zustand**、**React Router** 和 **ESLint/Prettier** 等现代化开发工具和技术。通过这个项目，你应该能够快速搭建起一个可扩展、易于维护的前端架构，为后续的业务逻辑开发提供强有力的支持。
