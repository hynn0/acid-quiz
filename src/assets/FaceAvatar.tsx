import { type HairStyle, type GlassesStyle, type Accessory } from '../types';

type Props = {
  hair: HairStyle;
  glasses: GlassesStyle;
  hasBeard: boolean;
  accessory: Accessory;
  expression: 'smile' | 'neutral' | 'smirk';
};

export default function FaceAvatar({ hair, glasses, hasBeard, accessory, expression }: Props) {
  
  const mouthPath = "M 54 80 L 64 86 L 54 92 M 54 92 L 64 98 L 54 104";

  return (
    <svg viewBox="0 -20 120 140" width="200" height="200">
      <g fill="none" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        
        {/* ===== 1. 髮型 ===== */}
        {/* 短髮、光頭、馬尾、包包頭 都只保留頭頂圓弧，沒有額頭橫線 */}
        {(hair === 'short' || hair === 'bald' || hair === 'ponytail' || hair === 'bun') && (
          <path d="M 30 42 Q 30 15 60 15 Q 90 15 90 42" />
        )}
        
           {hair === 'long' && (
          <>
            {/* 頭頂的波浪髮際線 (往外擴) */}
            <path d="M 20 45 Q 10 15 40 10 Q 60 0 80 10 Q 110 15 100 45" strokeWidth="6" />
            
            {/* 左側垂下的波浪長髮 (往外擴) */}
            <path d="M 20 45 Q 10 70 15 100 Q 10 110 5 115 Q 15 120 20 110 Q 25 100 25 70 Q 25 55 30 45" strokeWidth="6" />
            
            {/* 右側垂下的波浪長髮 (往外擴) */}
            <path d="M 100 45 Q 110 70 105 100 Q 110 110 115 115 Q 105 120 100 110 Q 95 100 95 70 Q 95 55 90 45" strokeWidth="6" />
            
            {/* 頭頂的 M 字瀏海 (稍微拉寬) */}
            <path d="M 30 40 L 45 30 L 60 40 L 75 30 L 90 40" strokeWidth="5" />
          </>
        )}
        {hair === 'bangs' && (
          /* 妹妹頭：保留瀏海，但把最上面的橫線拿掉，只留下面的鋸齒 */
          <path d="M 30 42 Q 30 15 60 15 Q 90 15 90 42 M 30 42 L 40 50 L 50 42 L 60 50 L 70 42 L 80 50 L 90 42" strokeWidth="5" />
        )}

              {hair === 'ponytail' && (
          /* 馬尾：往外側延伸，避開眼鏡 */
          <>
            <path d="M 95 45 Q 115 45 110 70" strokeWidth="6" strokeLinecap="round" />
            <path d="M 95 55 Q 105 65 100 80" strokeWidth="6" strokeLinecap="round" />
          </>
        )}
        
        {hair === 'bun' && (
          /* 包包頭的圓球 */
          <circle cx="60" cy="5" r="9" strokeWidth="5" />
        )}
        
         {hair === 'spiky' && (
          /* 刺蝟頭：頭頂的短刺 */
          <>
          
            {/* 頭頂上的刺，維持在頭型範圍內 */}
            <path d="M 30 25 L 40 10 L 50 20 L 60 5 L 70 20 L 80 10 L 90 25" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
          </>
        )}

        {/* ===== 2. 眼睛與眼鏡 ===== */}
        {glasses === 'square' ? (
          <>
            <rect x="24" y="42" width="72" height="26" rx="4" strokeWidth="7" />
            <line x1="60" y1="42" x2="60" y2="68" strokeWidth="6" />
            {expression === 'smile' && (
              <><circle cx="42" cy="55" r="4" fill="#1A1A1A" stroke="none" /><circle cx="78" cy="55" r="4" fill="#1A1A1A" stroke="none" /></>
            )}
            {expression === 'neutral' && (
              <><line x1="36" y1="55" x2="48" y2="55" strokeWidth="5" /><line x1="72" y1="55" x2="84" y2="55" strokeWidth="5" /></>
            )}
            {expression === 'smirk' && (
              <><path d="M 46 50 L 38 55 L 46 60" strokeWidth="5" /><path d="M 74 50 L 82 55 L 74 60" strokeWidth="5" /></>
            )}
          </>
        ) : glasses === 'round' ? (
          <>
            <circle cx="42" cy="55" r="16" strokeWidth="6" />
            <circle cx="78" cy="55" r="16" strokeWidth="6" />
            {expression === 'smile' && (
              <><circle cx="42" cy="55" r="4" fill="#1A1A1A" stroke="none" /><circle cx="78" cy="55" r="4" fill="#1A1A1A" stroke="none" /></>
            )}
            {expression === 'neutral' && (
              <><line x1="36" y1="55" x2="48" y2="55" strokeWidth="5" /><line x1="72" y1="55" x2="84" y2="55" strokeWidth="5" /></>
            )}
            {expression === 'smirk' && (
              <><path d="M 46 50 L 38 55 L 46 60" strokeWidth="5" /><path d="M 74 50 L 82 55 L 74 60" strokeWidth="5" /></>
            )}
          </>
                   ) : glasses === 'sunglasses' ? (
          <>
            {/* 左邊鏡片 */}
            <rect x="26" y="48" width="26" height="20" rx="6" fill="#1A1A1A" stroke="none" />
            <line x1="32" y1="53" x2="40" y2="53" stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round" />
            
            {/* 右邊鏡片 */}
            <rect x="68" y="48" width="26" height="20" rx="6" fill="#1A1A1A" stroke="none" />
            <line x1="74" y1="53" x2="82" y2="53" stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round" />
            
            {/* 中間鼻樑 */}
            <line x1="52" y1="58" x2="68" y2="58" strokeWidth="6" />
          </>
        ) : (
          <>
            {expression === 'smile' && (
              <><circle cx="42" cy="55" r="5" fill="#1A1A1A" stroke="none" /><circle cx="78" cy="55" r="5" fill="#1A1A1A" stroke="none" /></>
            )}
                       {expression === 'neutral' && (
              <><line x1="38" y1="55" x2="48" y2="55" strokeWidth="6" /><line x1="72" y1="55" x2="82" y2="55" strokeWidth="6" /></>
            )}
            {expression === 'smirk' && (
              <><path d="M 48 50 L 38 55 L 48 60" strokeWidth="6" /><path d="M 72 50 L 82 55 L 72 60" strokeWidth="6" /></>
            )}
          </>
        )}

        {/* ===== 3. 配件 ===== */}
           {accessory === 'hat' && (
          /* 帽子：稍微拉低，貼合頭型 */
          <path d="M 25 25 L 95 25 M 35 25 L 42 5 L 78 5 L 85 25" fill="#1A1A1A" strokeWidth="5" />
        )}
       

        {/* ===== 4. 鬍子 ===== */}
        {hasBeard && (
          <path d="M 40 78 Q 45 84 50 78 M 80 78 Q 75 84 70 78" strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
        {/* ===== 5. 嘴巴 ===== */}
        <path d={mouthPath} strokeWidth="7" />

      </g>
    </svg>
  );
}