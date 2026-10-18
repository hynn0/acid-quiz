import { useState } from 'react';
import { type AcidResult } from '../lib/acidEngine';
import { type FaceFeatures } from '../types';
import FaceAvatar from '../assets/FaceAvatar';
import LabelPreview from './LabelPreview';

type Props = {
  result: AcidResult;
  quote: string;
  face: FaceFeatures;
  onRestart: () => void;
};

export default function ResultScreen({ result, quote, face, onRestart }: Props) {
  const [showLabel, setShowLabel] = useState(false);
  let expression: 'smile' | 'neutral' | 'smirk' = 'smile';
  if (result.level === 3 || result.level === 4) expression = 'neutral';
  if (result.level === 5) expression = 'smirk';

  return (
    <div style={{ padding: '60px 40px', maxWidth: 800, margin: '0 auto', height: '100vh', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, marginBottom: 40 }}>
       <FaceAvatar 
  hair={face.hair} 
  glasses={face.glasses} 
  hasBeard={face.hasBeard}
  accessory={face.accessory} 
  expression={expression} 
/>
        
        <div>
          <div style={{ fontSize: '1.2rem', color: '#666', letterSpacing: '2px', marginBottom: 10 }}>你的酸度口味是</div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1 }}>
            {result.levelName}
          </h1>
        </div>
      </div>

      <div style={{ borderTop: '2px solid #1A1A1A', borderBottom: '2px solid #1A1A1A', padding: '20px 0', textAlign: 'center', marginBottom: 40 }}>
        <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
          「{quote}」
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #E5E5E5', paddingBottom: 10, marginBottom: 20 }}>酸言特徵</h2>
          <ul style={{ fontSize: '1.2rem', paddingLeft: 20, lineHeight: 1.8 }}>
            {result.traits.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #E5E5E5', paddingBottom: 10, marginBottom: 20 }}>成分表</h2>
          <div style={{ fontSize: '1.2rem' }}>
            {result.ingredients.slice(0, 4).map((ing, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span>{ing.name}</span>
                <span style={{ fontWeight: 'bold' }}>{ing.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #E5E5E5', paddingBottom: 10, marginBottom: 20 }}>酸言解方</h2>
        <ul style={{ fontSize: '1.2rem', paddingLeft: 20, lineHeight: 1.8 }}>
          {result.solution.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: 60, display: 'flex', gap: 20, justifyContent: 'center', paddingBottom: 60 }}>
        <button 
          onClick={() => setShowLabel(true)}
          style={{ padding: '16px 40px', fontSize: '1.2rem', background: '#1A1A1A', color: '#FAFAFA', border: 'none', borderRadius: 999, fontWeight: 'bold', letterSpacing: '1px' }}
        >
          列印專屬標籤
        </button>
        <button 
          onClick={onRestart}
          style={{ padding: '16px 40px', fontSize: '1.2rem', background: '#FAFAFA', color: '#1A1A1A', border: '2px solid #1A1A1A', borderRadius: 999, letterSpacing: '1px' }}
        >
          再測一次
        </button>
      </div>

      {showLabel && (
        <LabelPreview 
          result={result} 
          quote={quote} 
          face={face} 
          onClose={() => setShowLabel(false)} 
        />
      )}
    </div>
  );
}