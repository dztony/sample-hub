# 说明
- 最简单的 SSR 逻辑实现
- 基于 vite react-ts 模板

# 大致思路
- SSR 基础实现 - 生产环境
  - 使用 Vite 创建一个 react-ts 模板项目
  - 建立 client 端入口和打包逻辑： entry-client.tsx 和 打包命令
  - 建立 server 端入口和打包逻辑： entry-server.tsx 和 打包命令
  - 编写 server 端启动逻辑：server.ts 或者 server.js （如果是 .ts 则可以考虑使用 esbuild 进行打包）
    - 从 server 入口拿到 React 组件生成的 dom string
    - 读取 client 侧打包生成的 index.html
    - 将 dom string 插入到 client index.html 中指定位置
    - 利用 express 启动 node.js 服务，进行访问

# 调试
```shell
# 先打包
pnpm run build

# 生产环境部署
# 已知问题 - react 水合报错
pnpm run start
```
