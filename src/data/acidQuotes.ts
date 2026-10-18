// 定義酸言的分類
export type QuoteCategory = '外貌' | '能力' | '感情' | '職場' | '日常' | '炫耀' | '抱怨';

export interface AcidQuote {
  text: string;
  category: QuoteCategory;
  level: number; // 1~5 級
}

// 核心資料庫：超過 60 句經典酸言
const BASE_QUOTES: AcidQuote[] = [
  // ===== 外貌類 =====
  { text: '你這樣也敢出門？', category: '外貌', level: 3 },
  { text: '長得醜就算了，還沒才華', category: '外貌', level: 5 },
  { text: '不要出來殘害別人的眼睛', category: '外貌', level: 4 },
  { text: '你是不是對「好看」有什麼誤解', category: '外貌', level: 3 },
  { text: '這張照片...你是認真的嗎？', category: '外貌', level: 2 },
  { text: '你應該是靠才華吃飯的吧？', category: '外貌', level: 2 },
  { text: '這濾鏡開得有點大喔', category: '外貌', level: 3 },
  { text: '你是得罪了造型師嗎？', category: '外貌', level: 4 },
  { text: '胖了喔？', category: '外貌', level: 3 },
  { text: '你本人跟照片差好多', category: '外貌', level: 4 },

  // ===== 能力類 =====
  { text: '這也叫努力喔？', category: '能力', level: 2 },
  { text: '這點小事也做不好', category: '能力', level: 3 },
  { text: '你這智商是負數嗎', category: '能力', level: 5 },
  { text: '你盡力了，雖然結果很糟', category: '能力', level: 2 },
  { text: '別人都比你強多了', category: '能力', level: 3 },
  { text: '這報告是小學生寫的嗎？', category: '能力', level: 3 },
  { text: '你的大腦是不是忘了帶出門？', category: '能力', level: 4 },
  { text: '這邏輯我也是醉了', category: '能力', level: 3 },
  { text: '你確定你是認真的嗎？', category: '能力', level: 2 },
  { text: '連這個都不會？', category: '能力', level: 4 },

  // ===== 感情類 =====
  { text: '難怪你單身', category: '感情', level: 3 },
  { text: '你活著就是個奇蹟', category: '感情', level: 4 },
  { text: '沒關係，單身也有單身的好（拍拍）', category: '感情', level: 1 },
  { text: '你這種人也有今天啊', category: '感情', level: 4 },
  { text: '你還是早點睡吧，夢裡什麼都有', category: '感情', level: 3 },
  { text: '你對象是不是眼睛有問題？', category: '感情', level: 4 },
  { text: '你這麼優秀，怎麼會單身呢？（偷笑）', category: '感情', level: 3 },
  { text: '你適合更好的（但我看很難）', category: '感情', level: 5 },
  { text: '別再發好人卡了，你連卡都沒有', category: '感情', level: 4 },
  { text: '你談過戀愛嗎？', category: '感情', level: 2 },

  // ===== 職場類 =====
  { text: '你媽知道你在這裡發廢文嗎', category: '職場', level: 4 },
  { text: '笑死，勇氣可嘉', category: '職場', level: 3 },
  { text: '你是不是沒朋友', category: '職場', level: 4 },
  { text: '不要瞎忙，好嗎？', category: '職場', level: 3 },
  { text: '這不是你的鍋嗎？', category: '職場', level: 3 },
  { text: '你下班都沒事做喔？', category: '職場', level: 3 },
  { text: '你這麼閒，怎麼不去掃廁所', category: '職場', level: 4 },
  { text: '你的薪水對得起你的表現嗎？', category: '職場', level: 5 },
  { text: '這不是常識嗎？你怎麼會不知道', category: '職場', level: 4 },
  { text: '你來公司是來交朋友的嗎？', category: '職場', level: 3 },

  // ===== 日常類 =====
  { text: '你真的很會挑時間抱怨', category: '日常', level: 2 },
  { text: '這不是常識嗎？', category: '日常', level: 2 },
  { text: '你開心就好（翻白眼）', category: '日常', level: 3 },
  { text: '你怎麼不去當編劇？', category: '日常', level: 2 },
  { text: '你是不是太閒了？', category: '日常', level: 2 },
  { text: '這也要問？', category: '日常', level: 3 },
  { text: '你是在大聲什麼啦', category: '日常', level: 2 },
  { text: '不要把你的快樂建築在別人的痛苦上', category: '日常', level: 3 },
  { text: '你覺得這樣很有趣嗎？', category: '日常', level: 3 },
  { text: '你的人生是不是沒別的事做了', category: '日常', level: 4 },

  // ===== 炫耀類（反向酸）=====
  { text: '哇，好厲害喔（冷漠）', category: '炫耀', level: 3 },
  { text: '你這麼厲害，怎麼不上天？', category: '炫耀', level: 3 },
  { text: '不要一直炫耀，很煩', category: '炫耀', level: 4 },
  { text: '是喔，然後呢？', category: '炫耀', level: 3 },
  { text: '你這麼愛現，怎麼不去當網紅', category: '炫耀', level: 3 },
  { text: '你是不是覺得自己很了不起？', category: '炫耀', level: 4 },
  { text: '好了啦，大家都知道你很棒', category: '炫耀', level: 2 },
  { text: '你這種程度也敢拿出來說嘴？', category: '炫耀', level: 5 },

  // ===== 抱怨類 =====
  { text: '你抱怨完了沒？', category: '抱怨', level: 3 },
  { text: '這世界不是繞著你轉的', category: '抱怨', level: 4 },
  { text: '你只會抱怨，不會解決問題嗎？', category: '抱怨', level: 4 },
  { text: '不要把你自己的問題丟給別人', category: '抱怨', level: 3 },
  { text: '你這麼不爽，怎麼不離職？', category: '抱怨', level: 3 },
  { text: '你是在演哪一齣？', category: '抱怨', level: 2 },
  { text: '你的人生到底有多悲慘？', category: '抱怨', level: 5 },
];

// 語氣裝飾詞（用來產生無限變化）
const PREFIXES = [
  '', '', '', '', '不是我要說，', '老實說，', '說真的，', '講白了，', 
  '我就直說了，', '你別怪我，', '拜託，', '蛤？', '認真問，', '說句公道話，'
];
const SUFFIXES = [
  '', '', '', '', '😅', '（笑）', '（搖頭）', '🤷‍♂️', '呵呵', '（翻白眼）', 
  '好嗎？', '懂？', '...', '^^', '（茶）', '😂', '嘖嘖', '唉'
];

// 生成不重複的氣泡
export function generateBubbles(count: number = 15): AcidQuote[] {
  // 1. 先打亂基礎資料庫
  const shuffled = [...BASE_QUOTES].sort(() => 0.5 - Math.random());
  
  // 2. 取出前 count 個，並隨機加上前綴/後綴
  return shuffled.slice(0, count).map((quote) => {
    // 隨機決定要不要加前綴和後綴
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    
    return {
      ...quote,
      text: `${prefix}${quote.text}${suffix}`
    };
  });
}