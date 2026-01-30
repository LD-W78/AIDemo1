# Sketch2Art - AI绘画生成器

一个基于手绘草图生成不同风格艺术作品的 React 应用。支持24种艺术风格，包括水彩、油画、像素艺术、赛博朋克、宫崎骏风格等。

![Sketch2Art](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

## 功能特点

- 🎨 **24种艺术风格** - 经典、现代、动漫、传统、3D等多种风格
- ✏️ **手绘生成** - 以用户绘画内容为主体进行AI艺术创作
- 🖼️ **实时预览** - 画布自适应，支持多次迭代创作
- 📱 **响应式设计** - 适配桌面和移动设备
- ↩️ **撤销功能** - 支持撤销上一步操作
- 💾 **下载作品** - 保存生成的艺术作品

## 艺术风格

### 经典艺术
- 水彩、油画、素描、粉彩、梵高、印象派

### 现代风格
- 像素艺术、赛博朋克、霓虹、抽象、立体派、波普艺术、涂鸦

### 动漫风格
- 宫崎骏、漫画、线稿

### 传统艺术
- 水墨画、浮世绘

### 3D效果
- 3D渲染、低多边形、折纸

### 其他
- 蒸汽朋克、黑板粉笔、剪纸

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到 Vercel

### 方法1：使用 Vercel CLI（推荐，快速部署）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```
   按提示完成登录

3. **部署**
   ```bash
   cd sketch2art
   vercel
   ```

4. **后续更新**
   ```bash
   vercel --prod
   ```

### 方法2：使用 GitHub + Vercel Dashboard（推荐，自动部署）

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 填写仓库名称：`sketch2art`
   - 选择公开或私有
   - 不要初始化 README（已有）
   - 点击 "Create repository"

2. **推送代码到 GitHub**
   ```bash
   cd sketch2art
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sketch2art.git
   git push -u origin main
   ```
   （将 YOUR_USERNAME 替换为你的 GitHub 用户名）

3. **在 Vercel 上部署**
   - 访问 https://vercel.com/new
   - 使用 GitHub 登录
   - 选择 `sketch2art` 仓库
   - 框架预设选择 "Vite"
   - 点击 "Deploy"

4. **完成！**
   - Vercel 会自动构建和部署
   - 每次推送到 main 分支都会自动重新部署

### 配置说明

项目已包含 `vercel.json` 配置文件，无需额外设置。

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 使用说明

1. 在画布上绘制草图
2. 从右侧面板选择艺术风格（共24种）
3. 点击"生成艺术作品"按钮
4. AI会根据你的绘画内容生成对应风格的艺术作品
5. 可以在生成结果上继续绘画迭代
6. 点击"保存作品"下载最终图片

## 项目结构

```
sketch2art/
├── src/
│   ├── App.tsx           # 主应用组件
│   ├── artGenerator.ts   # 艺术风格生成算法（24种风格）
│   ├── types.ts          # TypeScript 类型定义
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── dist/                 # 构建输出目录
├── vercel.json           # Vercel 配置
└── package.json          # 项目配置
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ by OpenCode
