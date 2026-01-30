# Vercel 部署配置指南

## 当前状态

✅ **已完成:**
- [x] 本地项目创建 (`~/clawd/gudong-daily`)
- [x] Git 仓库初始化
- [x] GitHub 远程仓库创建: https://github.com/maoruibin/gudong-daily
- [x] 代码推送到 GitHub
- [x] CI/CD 工作流配置 (GitHub Actions)

⏳ **待完成:**
- [ ] Vercel 项目连接 GitHub 仓库

---

## Vercel 配置步骤 (Web 界面)

### 方法一：通过 Vercel Dashboard (推荐)

1. 访问 https://vercel.com/dashboard
2. 点击 "Add New..." → "Project"
3. 选择 GitHub 作为 Git Provider
4. 找到并选择 `gudong-daily` 仓库
5. 配置选项：
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 点击 "Deploy"

### 方法二：通过 Vercel CLI

```bash
# 登录 Vercel
vercel login

# 进入项目目录
cd ~/clawd/gudong-daily

# 连接并部署
vercel --prod
```

---

## 自动部署流程

配置完成后，工作流如下：

```
你: 提交代码/创建 PR
    ↓
GitHub: 触发 CI 检查
    ↓
Vercel: 自动构建 + 部署
    ↓
获得: 预览 URL / 生产环境 URL
```

### 分支策略

| 分支 | 行为 | URL 类型 |
|------|------|----------|
| `main` | 自动部署到生产 | 生产环境 |
| PR/其他分支 | 生成预览部署 | 预览 URL |

---

## 日常开发工作流

```bash
# 1. 本地开发
cd ~/clawd/gudong-daily
npm install
npm run dev

# 2. 开发完成后提交
git add .
git commit -m "feat: xxx"
git push origin main

# 3. Vercel 自动部署，约 30 秒后访问:
# https://gudong-daily.vercel.app
```

---

## 自动化任务

### 定时更新 (GitHub Actions)

- **文件**: `.github/workflows/daily-update.yml`
- **触发**: 每天 08:30 (UTC+8)
- **功能**: 自动抓取 GitHub 热门项目、更新资讯内容

### CI 检查

- **文件**: `.github/workflows/ci.yml`
- **触发**: 每次 push/PR
- **功能**: 检查代码是否能正常构建

---

## 下一步建议

1. **完成 Vercel 配置** (5 分钟)
2. **测试自动部署** - 修改 `app/page.tsx` 中的标题，推送到 main
3. **添加数据源** - 配置 GitHub API 抓取热门项目
4. **配置飞书通知** - 部署成功后自动通知

---

## 相关链接

- 🐙 GitHub 仓库: https://github.com/maoruibin/gudong-daily
- 🌐 生产环境: https://gudong-daily.vercel.app (配置完成后生效)
- 📋 Vercel Dashboard: https://vercel.com/dashboard
