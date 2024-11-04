## Introduction
### Overview
+ a module bundler for JavaScript
+ compiles small pieces of code into something larger and more complex, such as a library or application
+ uses the new standardized format for code modules

### Installation
`npm install --global rollup`

### Quick start
+ through a command line interface with an optional configuration file
+ through its JavaScript API

For browsers:

```javascript
# compile to a <script> containing a self-executing function ('iife') 
rollup main.js --file bundle.js --format iife 
```

For Node.js:

```javascript
# compile to a CommonJS module ('cjs') 
rollup main.js --file bundle.js --format cjs 
```

For both browsers and Node.js:

```javascript
# UMD format requires a bundle name 
rollup main.js --file bundle.js --format umd --name "myBundle"
```

### The Why
+ easier if break project into smaller separate pieces
+ JavaScript has not historically included this capability as a core feature in the language

### Tree-Shaking
statically analyzes the code you are importing, and will exclude anything that isn't actually used

```javascript
// import the entire utils object with CommonJS
const utils = require('./utils');
const query = 'Rollup';
// use the ajax method of the utils object
utils.ajax(`https://api.example.com?search=${query}`).then(handleResponse);

// import the ajax function with an ES6 import statement
import { ajax } from './utils';
const query = 'Rollup';
// call the ajax function
ajax(`https://api.example.com?search=${query}`).then(handleResponse);
```

it results in lighter, faster, and less complicated libraries and applications.

### Compatibility
+ Importing CommonJS
+ Publishing ES Modules

## Command Line Interface
### Configuration Files
config file is an ES module that exports a default object with the desired options:

```javascript
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

+ `rollup.config.js`and sits in the root directory of your project
+ transpile and bundle this file and its relative dependencies to CommonJS before requiring it

use other languages for your configuration files like TypeScript:

```javascript
npm install @rollup/plugin-typescript --save
rollup --config rollup.config.ts --configPlugin typescript
```

can export an **array** from your config file to build bundles from several unrelated inputs at once

```javascript
// rollup.config.js (building more than one bundle)
export default [
  {
    input: 'main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'cjs'
    }
  },
  {
    input: 'main-b.js',
    output: [
      {
        file: 'dist/bundle-b1.js',
        format: 'cjs'
      },
      {
        file: 'dist/bundle-b2.js',
        format: 'es'
      }
    ]
  }
];
```

--config --configDebug

```javascript
// rollup.config.js
import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default commandLineArgs => {
  if (commandLineArgs.configDebug === true) {
    return debugConfig;
  }
  return defaultConfig;
};
```

make Rollup ignore command line arguments by deleting them

```javascript
// rollup.config.js
export default commandLineArgs => {
  const inputBase = commandLineArgs.input || 'main.js';

  // this will make Rollup ignore the CLI argument
  delete commandLineArgs.input;
  return {
    input: 'src/entries/' + inputBase,
    output: {...}
  }
}
```

### Differences to the JavaScript API
config files limit how Rollup can be invoked and configured

+ using the JavaScript API, the configuration passed to rollup.rollup must be an object and cannot be wrapped in a Promise or a function
+ no longer use an array of configurations, should run rollup.rollup once for each set of inputOptions
+ the output option will be ignored, should run bundle.generate(outputOptions) or bundle.write(outputOptions) once for each set of outputOptions

### Loading a configuration from a Node package
```javascript
# this will first try to load the package "rollup-config-my-special-config";
# if that fails, it will then try to load "my-special-config"
rollup --config node:my-special-config
```

### Command line flags
```javascript
-c, --config <filename>     Use this config file (if argument is used but value
                              is unspecified, defaults to rollup.config.js)
-d, --dir <dirname>         Directory for chunks (if absent, prints to stdout)
-e, --external <ids>        Comma-separate list of module IDs to exclude
-f, --format <format>       Type of output (amd, cjs, es, iife, umd, system)
-g, --globals <pairs>       Comma-separate list of `moduleID:Global` pairs
-h, --help                  Show this help message
-i, --input <filename>      Input (alternative to <entry file>)
-m, --sourcemap             Generate sourcemap (`-m inline` for inline map)
-n, --name <name>           Name for UMD export
-o, --file <output>         Single output file (if absent, prints to stdout)
-p, --plugin <plugin>       Use the plugin specified (may be repeated)
-v, --version               Show version number
-w, --watch                 Watch files in bundle and rebuild on changes
```

## JavaScript API
+ rollup.rollup
+ rollup.watch

## ES Module Syntax
### Importing
Imported values cannot be reassigned, though imported objects and arrays _can_ be mutated

#### Named Imports
```javascript
import { something } from './module.js'; 
import { something as somethingElse } from './module.js';
```

#### Namespace Imports
```javascript
import * as module from './module.js';
```

#### Default Import
```javascript
import something from './module.js';
```

#### Empty Import
```javascript
import './module.js';
```

#### Dynamic Import
```javascript
import('./modules.js').then(({ default: DefaultExport, NamedExport }) => {
  // do something with modules.
});
```

### Exporting
#### Named exports
```javascript
const something = true;
export { something };
export { something as somethingElse };
// this works with `var`, `let`, `const`, `class`, and `function`
export const something = true;
```

#### Default Export
```javascript
export default something;
```

### How bindings work
```javascript
// incrementer.js
export let count = 0;

export function increment() {
  count += 1;
}
```

```javascript
// main.js
import { count, increment } from './incrementer.js';

console.log(count); // 0
increment();
console.log(count); // 1

count += 1; // Error — only incrementer.js can change this
```

## Tutorial
### Creating Your First Bundle
```javascript
// src/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

```javascript
// src/foo.js
export default 'hello world!';
```

`rollup src/main.js -o bundle.js -f cjs`

### Using Config Files
```javascript
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

`rollup --config rollup.config.js`

### Installing Rollup locally
```javascript
// install Rollup locally
npm install rollup --save-dev
yarn -D add rollup

npx rollup --config
yarn rollup --config
```

```javascript
{
  "scripts": {
    "build": "rollup --config"
  }
}
```

### Using plugins
+ importing modules installed with NPM
+ compiling code with Babel
+ working with JSON files

change the behaviour of Rollup at key points in the bundling process

```javascript
// package.json
{
  "name": "rollup-tutorial",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c"
  }
}
```

`npm install --save-dev @rollup/plugin-json`

```javascript
// src/main.js
import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}
```

```javascript
// rollup.config.js
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [json()]
};
```

`npm run build`

```javascript
'use strict';

// tree-shaking: Only the data we actually need gets imported
var version = '1.0.0';

function main() {
  console.log('version ' + version);
}

module.exports = main;
```

### Using output plugins
 can only modify code after the main analysis of Rollup has completed

`npm install --save-dev rollup-plugin-terser`

```javascript
// rollup.config.js
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [json()]
};
```

```javascript
// bundle.min.js
var version = (function () {
  'use strict';
  var n = '1.0.0';
  return function () {
    console.log('version ' + n);
  };
})();
```

### Code Splitting
Rollup splits code into chunks automatically

+ dynamic loading
+ multiple entry points

```javascript
// src/main.js
export default function () {
  import('./foo.js').then(({ default: foo }) => console.log(foo));
}
```

`rollup src/main.js -f cjs -d dist`

 main.js, chunk-[hash].js

specify several entry points that share some dependencies

```javascript
// src/main2.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

`rollup src/main.js src/main2.js -f cjs`

```javascript
//→ main.js:
'use strict';

function main() {
  Promise.resolve(require('./chunk-b8774ea3.js')).then(({ default: foo }) => console.log(foo));
}

module.exports = main;

//→ main2.js:
('use strict');

var foo_js = require('./chunk-b8774ea3.js');

function main2() {
  console.log(foo_js.default);
}

module.exports = main2;

//→ chunk-b8774ea3.js:
('use strict');

var foo = 'hello world!';

exports.default = foo;
```

