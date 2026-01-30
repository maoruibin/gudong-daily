# 咕咚日报 (Gudong Daily)

> 技术资讯摘要 - GitHub 热门项目、工具、技能追踪

## 🚀 在线访问

- 生产环境：https://gudong-daily.vercel.app

## 🛠️ 技术栈

- **框架**: Next.js 14 (静态导出)
- **部署**: Vercel (自动 CI/CD)
- **源码管理**: GitHub

## 📁 项目结构

```
gudong-daily/
├── app/              # Next.js App Router
├── components/       # React 组件
├── data/            # 数据文件 (JSON/Markdown)
├── public/          # 静态资源
└── .github/         # GitHub Actions 工作流
```

## 🔄 开发工作流

```
本地开发 → git push → GitHub → Vercel 自动部署
```

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

### 部署

推送到 `main` 分支即自动触发 Vercel 部署。

## 📋 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0.0 | 2026-01-30 | 初始版本，基础架构搭建 |

## 📝 需求规划

需求统一记录在项目 Issues 中，按优先级标签分类：
- `priority/high` - 高优先级
- `priority/medium` - 中优先级  
- `priority/low` - 低优先级

---
*由 AI 助手协助维护*
