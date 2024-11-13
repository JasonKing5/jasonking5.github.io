- a lot of endpoints
- harder to learn and understand API
- over-and-under fetching of information

## What is GraphQL

with a more efficient way design, create, and consume APIs

- write data that you want, and get exactly the data that you want
- single endpoint
- strongly-typed

## Code expmale

[Github code](https://github.com/JasonKing5/codefe-showcase/tree/main/back-end/graphql-start)

```json title="package.json"
{
  "name": "graphql-start",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "graphpack",
    "build": "graphpack build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "graphpack": "^1.0.9"
  }
}
```

```json
src
  |--db.js
  |--resolvers.js
  |--schema.graphql
```

```js title="db.js"
export let users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com",
    age: 20,
  },
  {
    id: 2,
    name: "Peter",
    email: "peter@gmail.com",
    age: 25,
  },
  {
    id: 3,
    name: "Mark",
    email: "mark@gmail.com",
    age: 30,
  },
];
```

```js title="schema.graphql"
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Query {
  users: [User!]!
  user(id: ID!): User!
}

type Mutation {
  createUser(name: String!, email: String!, age: Int): User!
  updateUser(id: ID!, name: String, email: String, age: Int): User!
  deleteUser(id: ID!): User!
}

type Subscription {
  userCreated: User!
  userUpdated: User!
  userDeleted: User!
}
```

```js title="resolvers.js"
import { users } from "./db";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const USER_UPDATED = "USER_UPDATED";
const USER_CREATED = "USER_CREATED";
const USER_DELETED = "USER_DELETED";

const resolvers = {
  Query: {
    user: (_, { id }) => {
      return users.find((user) => user.id == id);
    },
    users: () => users,
  },
  Mutation: {
    createUser: (_, { name, email, age }) => {
      const user = {
        id: users.length + 1,
        name,
        email,
        age,
      };
      users.push(user);
      pubsub.publish(USER_CREATED, { userCreated: user });
      return user;
    },
    updateUser: (_, { id, name, email, age }) => {
      const user = users.find((user) => user.id == id);
      if (!user) throw new Error("User not found");

      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = age;

      pubsub.publish(USER_UPDATED, { userUpdated: user });
      return user;
    },
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex === -1) throw new Error("User not found.");
      const user = users[userIndex];
      users.splice(userIndex, 1);
      pubsub.publish(USER_DELETED, { userDeleted: user });
      return user;
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED]),
      resolve: (payload) => payload.userCreated,
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator([USER_UPDATED]),
      resolve: (payload) => payload.userUpdated,
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator([USER_DELETED]),
      resolve: (payload) => payload.userDeleted,
    },
  },
};

export default resolvers;
```

## Screenshots

![query](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/image-2.png)

![create user](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/image-3.png)

![update user](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/image-4.png)

![delete user](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/image-5.png)

![subscription](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/image-6.png)

## 优点

1. **灵活的数据查询**

   GraphQL 允许客户端指定所需的数据字段，避免了 REST API 中的数据过度获取或不足的问题。这种灵活性使得客户端只会获取和传输真正需要的数据，提升了性能。

2. **减少请求次数**

   GraphQL 可以通过一个请求完成多个数据实体的查询，而在 REST API 中通常需要多个请求来访问不同的资源，这有效减少了网络开销。

3. **强类型系统**

   GraphQL 通过定义 schema 描述数据结构，提供了强类型系统。开发时，客户端可以根据 schema 知道可以请求的字段和数据类型，提高了 API 使用的可预测性和安全性。

4. **实时数据更新支持**

   通过订阅 (Subscription)，GraphQL 可以支持实时数据更新。当服务端数据更新时，客户端会接收到推送的数据变更，这对实时性要求高的应用（如股票行情、聊天应用等）非常有用。

5. **高效的开发体验**

   GraphQL 有强大的开发者工具（如 GraphiQL 和 Apollo），支持交互式查询、自动补全和文档生成。开发人员可以轻松地测试和调试查询，开发体验良好。

6. **良好的演进性**

   GraphQL 天然支持向后兼容，通过新增字段而非修改或删除旧字段来逐步扩展 API。这种非破坏性改进可以帮助 API 更轻松地进化，避免了 API 版本控制的问题。

## 缺点

1. **复杂性增加**

   GraphQL 的学习曲线相对较陡，开发者需要理解 schema、类型定义、解析器（resolver）等概念，这使得对小型项目或简单的数据查询场景可能显得过于复杂。

2. **缓存困难**

   REST API 中基于 URL 的缓存机制在 GraphQL 中不再适用，因为所有请求都通过同一个端点，且请求内容随查询字段变化而变化。虽然有 Apollo 等库提供缓存支持，但相对来说实现起来更复杂。

3. **性能瓶颈**

   由于 GraphQL 允许客户端灵活指定查询的字段，可能出现复杂或深度嵌套查询，对服务器资源产生较大压力，甚至造成性能瓶颈。需要对查询进行优化、限制或保护（如深度限制、复杂度分析、速率限制等）来防止滥用。

4. **不适用于所有数据结构**

   GraphQL 更适用于复杂的、实体关系明确的 API，而对于结构简单或 CRUD 操作较多的场景，REST API 可能会更加直接有效。对于文件上传、批量操作等一些特定需求，GraphQL 的实现也较为复杂。

5. **解析器（Resolver）管理复杂**

   在大型应用中，可能会有许多复杂的解析器逻辑，处理嵌套数据、不同数据源的整合等。解析器的逻辑如果管理不善，会导致代码难以维护和调试。
