import { type AcidResult } from '../lib/acidEngine';
import { type FaceFeatures } from '../types';
import FaceAvatar from '../assets/FaceAvatar';

type Props = {
  result: AcidResult;
  quote: string;
  face: FaceFeatures;
  onClose: () => void;
};

export default function LabelPreview({ result, quote, face, onClose }: Props) {
  let expression: 'smile' | 'neutral' | 'smirk' = 'smile';
  if (result.level === 3 || result.level === 4) expression = 'neutral';
  if (result.level === 5) expression = 'smirk';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '40px'
      }}
    >
      <div className="no-print" style={{ marginBottom: 40, display: 'flex', gap: 20 }}>
        <button 
          onClick={handlePrint} 
          style={{ padding: '16px 32px', background: '#1A1A1A', color: '#FAFAFA', border: 'none', borderRadius: 999, fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🖨️ 列印標籤
        </button>
        <button 
          onClick={onClose} 
          style={{ padding: '16px 32px', background: '#FAFAFA', color: '#1A1A1A', border: '2px solid #1A1A1A', borderRadius: 999, fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          關閉預覽
        </button>
      </div>

      <div className="print-area" style={{ display: 'flex', gap: '40px' }}>
        {/* 正面 */}
                {/* 正面 */}
        <div 
          className="label-card" 
          style={{ 
            width: '300px', 
            height: '520px', // 增加高度
            background: '#FAFAFA', 
            border: '3px solid #1A1A1A', 
            borderRadius: '16px', 
            padding: '25px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            boxSizing: 'border-box' // 確保 padding 不會撐破 300x520 的尺寸
          }}
        >
                    {/* 替換這兩行 */}
          <div className="label-header" style={{ fontSize: '1.1rem', color: '#1A1A1A', letterSpacing: '4px', fontWeight: 'bold', marginTop: '15px', textAlign: 'center', width: '100%' }}>酸度口味</div>
          <div className="label-level" style={{ fontSize: '3.5rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0px', textAlign: 'center', width: '100%' }}>{result.levelName}</div>
          
          {/* 頭像稍微縮小，並減少上下外距 */}
          <div className="label-avatar" style={{ transform: 'scale(0.85)', margin: '-10px 0' }}>
            <FaceAvatar 
              hair={face.hair} 
              glasses={face.glasses} 
              hasBeard={face.hasBeard}
              accessory={face.accessory} 
              expression={expression} 
            />
          </div>

          {/* 成分表，使用 marginTop: 'auto' 讓它乖乖貼在底部 */}
             <div className="label-ingredients" style={{ width: '100%', borderTop: '2px solid #1A1A1A', paddingTop: '15px', marginTop: 'auto' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '2px' }}>【成分表】</div>
            {result.ingredients.slice(0, 3).map((ing, i) => (
              <div key={i} className="ing-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '6px', fontWeight: 'bold' }}>
                <span>{ing.name}</span>
                <span>{ing.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 背面 */}
            {/* 背面 */}
        <div className="label-card" style={{ width: '300px', height: '520px', background: '#FAFAFA', border: '3px solid #1A1A1A', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
          <div className="label-header-back" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '20px', textAlign: 'center', letterSpacing: '2px' }}>酸言解方</div>
          
          <div style={{ fontSize: '1rem', color: '#666', marginBottom: '30px', borderBottom: '1px solid #E5E5E5', paddingBottom: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#1A1A1A' }}>你選的酸言：</span><br />
            「{quote}」
          </div>
          
          {/* 讓解方清單置中並加大行距 */}
                    <ul className="solution-list" style={{ paddingLeft: '20px', fontSize: '1.2rem', color: '#1A1A1A', lineHeight: 2, flex: 1, margin: 0 }}>
            {result.solution.map((s, i) => (
              <li key={i} style={{ marginBottom: '20px' }}>{s}</li>
            ))}
          </ul>
          
          {/* 底部裝飾與文字 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ width: '40px', height: '40px', border: '2px dashed #1A1A1A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>
              QR
            </div>
            <div className="label-footer" style={{ fontSize: '0.9rem', color: '#1A1A1A', textAlign: 'center', letterSpacing: '2px', fontWeight: 'bold' }}>
              # 酸言測驗
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}