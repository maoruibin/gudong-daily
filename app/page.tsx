import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '咕咚日报 - 个人资讯聚合',
  description: 'NBA、娱乐、AI、技术资讯每日更新',
}

// 读取 NBA 数据
async function getNBAData() {
  try {
    const data = await import('../data/nba.json')
    return data.default
  } catch {
    return null
  }
}

// 格式化北京时间
function formatBJTime(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default async function Home() {
  const nbaData = await getNBAData()

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto bg-gray-50">
      {/* Header */}
      <header className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">咕咚日报</h1>
        <p className="text-gray-600">个人资讯聚合 · 每日更新</p>
      </header>

      {/* NBA 板块 */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">🏀 NBA 今日赛况</h2>
          {nbaData && (
            <span className="text-sm text-gray-500">
              更新于 {formatBJTime(nbaData.updateTime)}
            </span>
          )}
        </div>

        {!nbaData ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">暂无数据</p>
          </div>
        ) : (
          <div className="space-y-4">
            {nbaData.games.map((game: any) => (
              <div
                key={game.gameId}
                className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${
                  game.status === 2
                    ? 'border-green-500'
                    : game.status === 3
                    ? 'border-gray-400'
                    : 'border-blue-500'
                }`}
              >
                {/* 状态标签 */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      game.status === 2
                        ? 'bg-green-100 text-green-700'
                        : game.status === 3
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {game.statusText}
                  </span>
                  {game.status === 3 && (
                    <span className="text-xs text-gray-400">已结束</span>
                  )}
                </div>

                {/* 比分 */}
                <div className="flex items-center justify-between">
                  {/* 客队 */}
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {game.awayTeam.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {game.awayTeam.city} · {game.awayTeam.wins}-{game.awayTeam.losses}
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        game.awayTeam.score > game.homeTeam.score && game.status === 3
                          ? 'text-green-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {game.awayTeam.score}
                    </div>
                  </div>

                  {/* VS */}
                  <div className="px-4 text-gray-400 font-medium">VS</div>

                  {/* 主队 */}
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {game.homeTeam.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {game.homeTeam.city} · {game.homeTeam.wins}-{game.homeTeam.losses}
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        game.homeTeam.score > game.awayTeam.score && game.status === 3
                          ? 'text-green-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {game.homeTeam.score}
                    </div>
                  </div>
                </div>

                {/* 球员数据（仅进行中和已结束显示） */}
                {game.leaders && game.status !== 1 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      {game.leaders.awayLeader && (
                        <div>
                          <span className="font-medium">{game.awayTeam.name}:</span>{' '}
                          {game.leaders.awayLeader.name}{' '}
                          {game.leaders.awayLeader.points}分{' '}
                          {game.leaders.awayLeader.rebounds}板{' '}
                          {game.leaders.awayLeader.assists}助
                        </div>
                      )}
                      {game.leaders.homeLeader && (
                        <div>
                          <span className="font-medium">{game.homeTeam.name}:</span>{' '}
                          {game.leaders.homeLeader.name}{' '}
                          {game.leaders.homeLeader.points}分{' '}
                          {game.leaders.homeLeader.rebounds}板{' '}
                          {game.leaders.homeLeader.assists}助
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 其他板块占位 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">🎬 娱乐资讯</h2>
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-400">即将上线...</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">🤖 AI 动态</h2>
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-400">即将上线...</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">💻 技术资讯</h2>
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-400">即将上线...</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t text-center text-gray-400 text-sm">
        <p>咕咚日报 · 每日更新 · {new Date().toLocaleDateString('zh-CN')}</p>
      </footer>
    </main>
  )
}
