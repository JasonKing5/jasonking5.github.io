## 导出的内容
有且仅有六种声明语法，export 只能导出这六种声明语法所声明的标识符，并且在导出时将它们统一称为名字。

## 解析 export
```javascript
// 导出“（声明的）名字”
export <let/const/var> x ...;
export function x() ...
export class x ...
export {x, y, z, ...};
        
        
// 导出“（重命名的）名字”
export { x as y, ...};
export { x as default, ... };
        
        
// 导出“（其它模块的）名字”
export ... from ...;
        
        
// 导出“值”
export default <expression
export default 2; // as state of the module, etc.
export default "some messages"; // data or information
```

