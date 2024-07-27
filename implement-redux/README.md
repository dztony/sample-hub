### redux v1 版本实现
- 页面路由： `/reduxV1`
- 实现原理
  - 参考原生 redux、react-redux api 进行实现
  - Provider 在 app 入口包裹

---
### redux v2 版本实现
- 页面路由：`/reduxV2`
- 实现原理
  - 使用 redux 和 react hook useSyncExternalStore 进行实现
  - 状态更新 到 UI 更新的逻辑由 useSyncExternalStore 实现，内部比如 store 更新后获取到的 stateValue，使用 useState 实现强制刷新
  - 对比 v1 版本的优点在于，不需要在 app 入口包裹 Provider 组件
  - 像使用 hook 的方式使用 redux v2 版本
