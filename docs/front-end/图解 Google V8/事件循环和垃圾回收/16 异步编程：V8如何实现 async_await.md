## 回调地狱
从网络获取某个用户的用户名，先通过 id_url 获取用户 ID，再使用获取到的用户 ID 作为另外一个 name_url 的参数，获取用户名。

```javascript
const id_url = 'https://demo.com/master/id'

const name_url = 'https://demo.com/master/name'
```

使用 XMLHttpRequest，并按照前后顺序异步请求这两个 URL。

```javascript
function GetUrlContent(result_callback,url) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'text'
  request.onload = function () {
  result_callback(request.response)
  }
  
  request.send()
}

function IDCallback(id) {
  let new_name_url = name_url + "?id="+id
  GetUrlContent(NameCallback,new_name_url)
}

function NameCallback(name) {
	console.log(name)
}

GetUrlContent(IDCallback,id_url)
```

每次请求网络内容，都需要设置一个回调函数，用来返回异步请求的结果，这些穿插在代码之间的回调函数打乱了代码原有的顺序。

## 使用 Promise 解决回调地狱问题
引入 Promise 解决部分回调地狱的问题：

```javascript
fetch(id_url).then((response) => {
	return response.text()
}).then((response) => {
	let new_name_url = name_url + "?id=" + response
	return fetch(new_name_url)
}).then((response) => {
	return response.text()
}).then((response) => {
	console.log(response)
})  
```

可以按照线性的思路来编写代码，非常符合人的直觉。

## 使用 Generator 函数实现更加线性化逻辑
```javascript
 function getResult(){
   let id = getUserID()
   let name = getUserName(id)
   return name
 }
```

执行到异步请求的时候，暂停当前函数，等异步请求返回了结果，再恢复该函数。

![](/images/1678883766721-04eb0252-0655-4a67-8b8e-a8ef2c59ca4b.png)

生成器实现了模型中的两个关键点：**函数暂停执行**和**函数恢复执行**。生成器函数是一个带星号函数，配合 yield 可以实现函数的暂停和恢复：

```javascript
function* getResult() {
  yield 'getUserID'
  yield 'getUserName'
  return 'name'
}

let result = getResult()

console.log(result.next().value)
console.log(result.next().value)
console.log(result.next().value)
```

函数 getResult 并不是一次执行完的，而是全局代码和 getResult 函数交替执行。



在生成器内部，遇到 yield 关键字，V8 将返回关键字后面的内容给外部，并暂停该生成器函数的执行。生成器暂停执行后，外部的代码便开始执行，外部代码可以使用 result.next 方法如恢复生成器的执行。



**协程，比线程更加轻量级。**可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程。



协程不被操作系统内核管理，完全由程序所控制（即在用户态执行）。性能得到很大的提升，比线程切换消耗资源少。

![](/images/1678884399378-4dd8c24e-f2aa-4043-8ba2-cde384eb6634.png)

```javascript
function* getResult() {
    let id_res = yield fetch(id_url);
    let id_text = yield id_res.text();

    let new_name_url = name_url + "?id=" + id_text

    let name_res = yield fetch(new_name_url)
    let name_text = yield name_res.text()
}

let result = getResult()
result.next().value.then((response) => {
    return result.next(response).value
}).then((response) => {
    return result.next(response).value
}).then((response) => {
    return result.next(response).value
}).then((response) => {
    return result.next(response).value
```

## async/await：异步编程的终极方案
**ES7 引入了 async/await**，它改进了生成器的缺点，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力：

```javascript
async function getResult() {
    try {
        let id_res = await fetch(id_url)
        let id_text = await id_res.text()
  
        let new_name_url = name_url+"?id="+id_text

        let name_res = await fetch(new_name_url)
        let name_text = await name_res.text()
    } catch (err) {
        console.error(err)
    }
}
getResult()
```

**async/await 就是 Promise 和生成器应用，底层就是微任务和协程应用。**

### async
async：一个通过异步执行并隐式返回 Promise 作为结果的函数。



如果在 async 函数里面使用了 await，那么此时 async 函数就会暂停执行，并等待合适的时机来恢复执行，所以说 async 是一个异步执行的函数。



通常，await 可以等待两种类型的表达式：

+ 任何普通表达式 ;
+ 一个 Promise 对象的表达式。

如果 await 等待的是一个 Promise 对象，它就会暂停执行生成器函数，直到 Promise 对象的状态变成 resolve，才会恢复执行，然后得到 resolve 的值，作为 await 表达式的运算结果。

```javascript
function NeverResolvePromise(){
    return new Promise((resolve, reject) => {})
}
async function getResult() {
    let a = await NeverResolvePromise()
    console.log(a)
}
getResult()
console.log(0)
```

使用 await 等待一个没有 resolve 的 Promise，getResult 函数会一直等待下去。



使用了 async 声明的函数在执行时，也是一个单独的协程，可以使用 await 来暂停该协程，await 等待的是一个 Promise 对象，可以通过 resolve 来恢复该协程。

![](/images/1678886401296-95995e24-f689-4003-8c5d-b7474a8da9f4.png)

如果 await 等待的对象已经变成了 resolve 状态，那么 V8 就会恢复该协程的执行：

```javascript
function HaveResolvePromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
          }, 0);
      })
}
async function getResult() {
    console.log(1)
    let a = await HaveResolvePromise()
    console.log(a)
    console.log(2)
}
console.log(0)
getResult()
console.log(3)
```

![](/images/1678886680443-1b374f0b-1d70-4105-ae36-7c4eb75e270f.png)

如果 await 等待的是一个非 Promise 对象，比如 await 100，那么 V8 会隐式地将 await 后面的 100 包装成一个已经 resolve 的对象，其效果等价于下面这段代码：

```javascript
function ResolvePromise(){
    return new Promise((resolve, reject) => {
            resolve(100)
      })
}
async function getResult() {
    let a = await ResolvePromise()
    console.log(a)
}
getResult()
console.log(3)
```

前端异步编程的方案史：

![](/images/1678886788620-900a44cb-c0fa-4ce7-aaf5-86a7adb17648.png)

