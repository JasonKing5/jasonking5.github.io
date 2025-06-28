Nest.js is a framework for building efficient, scalable Node.js server-side applications.

## Language

- TypeScript
- Node.js

## Prerequisites

- Node.js >= 20

## Installation

```bash
npm i -g @nestjs/cli
```

## Create Project

```bash
nest new project-name
```

This will create a new project named `project-name`. And it will install all dependencies in `node_modules` folder.

At the same time, it will create a `src` folder, which contains the source code of the project.

```
src
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
├── app.service.spec.ts
├── main.ts
```

file name | description
--- | ---
app.controller.ts | The main controller of the application
app.controller.spec.ts | The test file of the main controller
app.module.ts | The main module of the application
app.service.ts | The main service of the application
app.service.spec.ts | The test file of the main service
main.ts | The entry file of the application, it will create a Nest application instance use `NestFactory.create` method.



## Run Project

```bash
npm run start
```

## Access Project

Open your browser and visit http://localhost:3000
