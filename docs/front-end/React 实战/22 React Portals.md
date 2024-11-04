将虚拟DOM映射到任何真是DOM节点，解决漂浮层问题（Dialog，Tooltip）。

```javascript
renderDome() {
  return (
    <div>dialog demo</div>
  )
}

ReactDOM.createPortal(
  renderDemo(),
  document.getElementById('dialog-container'),
)
```

可以将dialog直接render到一个独立的节点上。真实DOM上可以独立存在，虚拟DOM中仍然是上下级关系，遵循事件关系。

