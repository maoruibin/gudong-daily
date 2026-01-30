import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '咕咚日报 - 技术资讯摘要',
  description: 'GitHub 热门项目、工具、技能追踪',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
