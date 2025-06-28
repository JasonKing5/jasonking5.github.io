Controller responsibility is to handle the request and response, and delegate the business logic to the service.

## Routing

Controller will be mapped to the route based on the `@Controller` decorator.


Create a controller named `cats`.

```bash
nest g controller cats
```

```typescript
// src/cats/cats.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

The route will be `/cats` with `GET` method.

```typescript
@Controller('cats')
export class CatsController {
  @Get('breed')
  findBreed(): string {
    return 'This action returns breed cats';
  }
}
```

The route will be `/cats/breed` with `GET` method.

## Request object

Nest.js provides a set of decorators to handle the request.

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() req: Request): string {
    return 'This action returns all cats';
  }
}
```

> Needs install `@types/express`

Decorators | Description
--- | ---
@Req() | req object
@Res() | res object
@Next() | next function
@Session() | req.session
@Headers(name?: string) | req.headers/req.headers[name]
@Param(key?: string) | req.params/req.params[key]
@Query(key?: string) | req.query/req.query[key]
@Body(key?: string) | req.body/req.body[key]
@Ip() | req.ip
@HostParam() | req.hosts

## Resources

Create a resource use `POST` method.

```typescript
// src/cats/cats.controller.ts
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
```

The route will be `/cats` with `POST` method.

The decorators with the `HTTP` method are:

- @Get()
- @Post()
- @Put()
- @Delete()
- @Patch()
- @Options()
- @Head()
- @All() | All HTTP methods

## Route wildcards

`*` matches any characters.

```typescript
  @Get('cats/*')
  findAll(): string {
    return 'This route matches /cats/*';
  }
```

This route will match `/cats`, `/cats/1`, `/cats/1/2`, `/cats/abc`, etc.

## Status code

```typescript
import { HttpCode } from '@nestjs/common';

  @Post()
  @HttpCode(204)
  create(@Res() res: Response): string {
    return ;
  }
```
  
## Response headers

```typescript
import { Header } from '@nestjs/common';

  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }
```

## Redirection

```typescript
import { Redirect } from '@nestjs/common';

  @Get()
  @Redirect('https://nestjs.com') // or @Redirect('https://nestjs.com', 301)
```

```typescript
import { Redirect } from '@nestjs/common';

  @Get()
  @Redirect('https://nestjs.com', 301)
  getDocs(@Query('version') version: string): string {
    return {
      url: `https://docs.nestjs.com/${version}`,
    };
  }
```

## Route parameters

```typescript
import { Param } from '@nestjs/common';

@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

The route will be `/cats/:id` with `GET` method.

> Routes with parameters should be declared after any static paths.



  

