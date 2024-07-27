> 第一部分：ViteDevServer
### Vite 开发服务器功能实现
- 代码位置： `devServer`
- 基于 `ESM` 特性
- `no-bundle`
- 参考 `Vite`

### 快速开始
```shell
# 安装依赖
pnpm install

# 打包本地开发服务器
# 产物位置：/devServerDist/start.cjs
pnpm run local:build

# 启动本地开发服务器
pnpm run local:dev

# 项目基础是基础 Vite react-ts 模板生成的项目
# 可以直接使用 Vite 启动本地开发服务器，和自己实现的本地开发服务器进行对比
pnpm run dev
```
---

> 第二部分：Vite 生产打包
### 使用 Rollup 进行生产打包，esbuild 以插件的形式参与转移和代码压缩
- 代码位置： `prodBuilder`

### 快速开始
```shell
# 打包：源码使用 ts 编写，使用 esbuild 转移成 js，且目标运行环境为 node
pnpm run prod:build

# 执行生产打包
pnpm run prod:start
```
---

> 第三部分：使用 Rollup 配置文件进行打包
- 主要用于测试
