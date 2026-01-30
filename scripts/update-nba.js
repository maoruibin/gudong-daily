#!/usr/bin/env node
/**
 * NBA 数据抓取脚本
 * 数据来源: NBA 官方 API
 */

const fs = require('fs');
const path = require('path');

const NBA_API_URL = 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json';
const DATA_FILE = path.join(__dirname, '..', 'data', 'nba.json');

// 球队中文名映射
const TEAM_NAMES = {
  'ATL': '老鹰', 'BOS': '凯尔特人', 'BKN': '篮网', 'CHA': '黄蜂',
  'CHI': '公牛', 'CLE': '骑士', 'DAL': '独行侠', 'DEN': '掘金',
  'DET': '活塞', 'GSW': '勇士', 'HOU': '火箭', 'IND': '步行者',
  'LAC': '快船', 'LAL': '湖人', 'MEM': '灰熊', 'MIA': '热火',
  'MIL': '雄鹿', 'MIN': '森林狼', 'NOP': '鹈鹕', 'NYK': '尼克斯',
  'OKC': '雷霆', 'ORL': '魔术', 'PHI': '76人', 'PHX': '太阳',
  'POR': '开拓者', 'SAC': '国王', 'SAS': '马刺', 'TOR': '猛龙',
  'UTA': '爵士', 'WAS': '奇才'
};

// 比赛状态映射
function getGameStatusText(game) {
  const status = game.gameStatus;
  if (status === 1) {
    const etTime = new Date(game.gameEt);
    const hours = etTime.getHours();
    const minutes = etTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `未开始 ${displayHours}:${minutes} ${ampm} ET`;
  } else if (status === 2) {
    return `进行中 ${game.gameStatusText}`;
  } else if (status === 3) {
    return '已结束';
  }
  return game.gameStatusText;
}

async function fetchNBAData() {
  try {
    console.log('🔄 正在获取 NBA 数据...');
    
    const response = await fetch(NBA_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const games = data.scoreboard?.games || [];
    
    console.log(`✅ 获取到 ${games.length} 场比赛`);
    
    // 格式化数据
    const formattedGames = games.map(game => ({
      gameId: game.gameId,
      gameDate: data.scoreboard.gameDate,
      status: game.gameStatus,
      statusText: getGameStatusText(game),
      period: game.period,
      gameClock: game.gameClock,
      homeTeam: {
        name: TEAM_NAMES[game.homeTeam.teamTricode] || game.homeTeam.teamName,
        enName: game.homeTeam.teamName,
        tricode: game.homeTeam.teamTricode,
        city: game.homeTeam.teamCity,
        score: game.homeTeam.score,
        wins: game.homeTeam.wins,
        losses: game.homeTeam.losses
      },
      awayTeam: {
        name: TEAM_NAMES[game.awayTeam.teamTricode] || game.awayTeam.teamName,
        enName: game.awayTeam.teamName,
        tricode: game.awayTeam.teamTricode,
        city: game.awayTeam.teamCity,
        score: game.awayTeam.score,
        wins: game.awayTeam.wins,
        losses: game.awayTeam.losses
      },
      leaders: game.gameLeaders ? {
        homeLeader: game.gameLeaders.homeLeaders ? {
          name: game.gameLeaders.homeLeaders.name,
          jerseyNum: game.gameLeaders.homeLeaders.jerseyNum,
          position: game.gameLeaders.homeLeaders.position,
          points: game.gameLeaders.homeLeaders.points,
          rebounds: game.gameLeaders.homeLeaders.rebounds,
          assists: game.gameLeaders.homeLeaders.assists
        } : null,
        awayLeader: game.gameLeaders.awayLeaders ? {
          name: game.gameLeaders.awayLeaders.name,
          jerseyNum: game.gameLeaders.awayLeaders.jerseyNum,
          position: game.gameLeaders.awayLeaders.position,
          points: game.gameLeaders.awayLeaders.points,
          rebounds: game.gameLeaders.awayLeaders.rebounds,
          assists: game.gameLeaders.awayLeaders.assists
        } : null
      } : null
    }));
    
    // 按状态排序：进行中 > 未开始 > 已结束
    formattedGames.sort((a, b) => {
      if (a.status === 2) return -1;
      if (b.status === 2) return 1;
      if (a.status === 1) return -1;
      if (b.status === 1) return 1;
      return 0;
    });
    
    const output = {
      updateTime: new Date().toISOString(),
      gameDate: data.scoreboard.gameDate,
      gameCount: games.length,
      games: formattedGames
    };
    
    // 确保目录存在
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(DATA_FILE, JSON.stringify(output, null, 2), 'utf8');
    
    console.log(`✅ 数据已保存到 ${DATA_FILE}`);
    console.log(`📅 比赛日期: ${output.gameDate}`);
    console.log(`🏀 比赛数量: ${output.gameCount}`);
    console.log(`🕐 更新时间: ${output.updateTime}`);
    
    return output;
    
  } catch (error) {
    console.error('❌ 获取数据失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  fetchNBAData();
}

module.exports = { fetchNBAData };
