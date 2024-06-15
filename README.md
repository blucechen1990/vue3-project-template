# 技术栈
```
该项目模板采用vue3 + element-plus + pina + tailwindcss + axios
开发格式化工具采用： eslint + prettier + husky + lint-staged

```
## 项目功能
```
1. 路由
2. 国际化
3. 权限
4. 登录 
5. table + form组件已经封装好
```

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```
1. 基础包安装： ui， 工具
2. 基本样式重置， 主题切换
3. 国际化
4. 路由
5. 状态
6. 登录管理
7. 权限
8. 常用全局指令安装

```
```
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "build-1": "vite build --mode mode1-env", // 构建不同的环境变量
    "build-2": "vite build --mode mode2-env",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
},
import.meta.env.MODE 使用测可以获取当前运行环境
```
