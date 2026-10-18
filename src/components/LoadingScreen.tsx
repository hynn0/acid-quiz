import { useEffect } from 'react';
import { generateResult, type AcidResult } from '../lib/acidEngine';

type Props = {
  quote: string;
  onDone: (result: AcidResult) => void;
};

export default function LoadingScreen({ quote, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = generateResult(quote);
      onDone(result);
    }, 2500);
    return () => clearTimeout(timer);
  }, [quote, onDone]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1A1A1A', marginBottom: 20, letterSpacing: '2px' }}>正在分析...</h1>
      <p style={{ fontSize: '1.5rem', color: '#666', border: '2px solid #E5E5E5', padding: '15px 30px', borderRadius: 20 }}>
        「{quote}」
      </p>
      <div className="spinner"></div>
    </div>
  );
}