export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-bold mb-2">咕咚日报</h1>
        <p className="text-gray-600">技术资讯摘要 · GitHub 热门项目追踪</p>
      </header>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 今日热门</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-500">资讯内容加载中...</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🛠️ 工具推荐</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-500">工具推荐加载中...</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📚 技能学习</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-500">技能内容加载中...</p>
        </div>
      </section>
      
      <footer className="mt-12 pt-6 border-t text-gray-400 text-sm">
        <p>咕咚日报 · 每日更新 · {new Date().toLocaleDateString('zh-CN')}</p>
      </footer>
    </main>
  )
}
