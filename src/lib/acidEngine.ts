// 定義結果的型別
export interface AcidResult {
  level: number;
  levelName: string;
  traits: string[];
  ingredients: { name: string; percent: number }[];
  solution: string[];
}

// 酸度等級名稱
const LEVEL_NAMES = ['微酸', '小酸', '中酸', '爆酸', '酸民之王'];

// 酸言特徵庫
const ALL_TRAITS = [
  '見不得別人好', '用貶低掩飾不安', '把酸當幽默', '自尊心作祟', 
  '缺乏安全感', '習慣性防禦', '嫉妒心爆發', '想引起注意'
];

// 解方庫
const ALL_SOLUTIONS = [
  '多喝水，少滑手機。', '去抱抱身邊愛你的人。', '把這股酸勁拿去釀檸檬汁。',
  '深呼吸三次，告訴自己「我很棒」。', '運動半小時，把酸味排掉。',
  '去吃一頓好吃的，轉移注意力。'
];

// 隨機打亂陣列並取前 n 個
function shuffle<T>(array: T[], n: number): T[] {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, n);
}

// 核心：根據選的酸言，生成結果
export function generateResult(quote: string): AcidResult {
  // 1. 用字數和關鍵字來決定酸度等級 (1~5)
  let score = 2; // 基礎分
  if (quote.length > 8) score += 1;
  if (quote.includes('死') || quote.includes('醜') || quote.includes('蠢') || quote.includes('智障')) score += 2;
  if (quote.includes('沒關係') || quote.includes('拍拍')) score -= 1;
  
  // 限制在 1~5 之間
  const level = Math.max(1, Math.min(5, score));
  const levelName = LEVEL_NAMES[level - 1];

  // 2. 隨機生成成分表 (加起來 100%)
  const ingredientNames = ['忌妒', '仇恨', '優越感', '酸葡萄', '看熱鬧', '自卑'];
  const rawWeights = ingredientNames.map(() => Math.random() * (level + 1));
  const sum = rawWeights.reduce((a, b) => a + b, 0);
  
  const ingredients = ingredientNames.map((name, index) => ({
    name,
    percent: Math.round((rawWeights[index] / sum) * 100),
  })).sort((a, b) => b.percent - a.percent); // 比例高的排前面

  // 3. 隨機抽 2 個特徵、2 個解方
  const traits = shuffle(ALL_TRAITS, 2);
  const solution = shuffle(ALL_SOLUTIONS, 2);

  return {
    level,
    levelName,
    traits,
    ingredients,
    solution
  };
}