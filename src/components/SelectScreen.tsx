import { useMemo } from 'react';
import { generateBubbles } from '../data/acidQuotes';

type Props = { onNext: (quote: string) => void };

export default function SelectScreen({ onNext }: Props) {
  const bubbles = useMemo(() => {
    const quotes = generateBubbles(12);
    const cols = 4;
    const rows = 3;
    const gridCells = Array.from({ length: cols * rows }, (_, i) => i);
    const shuffledCells = gridCells.sort(() => 0.5 - Math.random());

    return quotes.map((q, index) => {
      const cellIndex = shuffledCells[index];
      const col = cellIndex % cols;
      const row = Math.floor(cellIndex / cols);
      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;
      const randomOffsetX = (Math.random() * 0.4 + 0.3) * cellWidth;
      const randomOffsetY = (Math.random() * 0.4 + 0.3) * cellHeight;
      const finalTop = 25 + row * (75 / rows) + randomOffsetY * 0.8;
      let finalLeft = col * cellWidth + randomOffsetX;
      if (finalLeft < 15) finalLeft = 15;
      if (finalLeft > 85) finalLeft = 85;

      return {
        ...q,
        left: `${finalLeft}%`,
        top: `${finalTop}%`,
        delay: `${Math.random() * 3}s`,
        scale: 1.0 + Math.random() * 0.2, // 稍微縮小放大範圍
      };
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: 60, left: 60, zIndex: 10, pointerEvents: 'none' }}>
        <h1 style={{ fontSize: '3rem', color: '#1A1A1A', margin: 0, letterSpacing: '2px' }}>選一句最酸的</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', marginTop: 10, letterSpacing: '1px' }}>點擊氣泡，測出你的酸度成分。</p>
      </div>

      {bubbles.map((b, index) => (
        <button
          key={index}
          onClick={() => onNext(b.text)}
          className="bubble"
          style={{
            position: 'absolute',
            left: b.left,
            top: b.top,
            animationDelay: b.delay,
            ['--scale' as any]: b.scale,
            maxWidth: '320px',
            minWidth: '140px',
            textAlign: 'center',
          }}
        >
          {b.text}
        </button>
      ))}
    </div>
  );
}