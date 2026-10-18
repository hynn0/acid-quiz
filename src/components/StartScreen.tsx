type Props = { onNext: () => void };

export default function StartScreen({ onNext }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#1A1A1A', marginBottom: 20, letterSpacing: '4px' }}>
        酸度<br />測驗
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: 60, letterSpacing: '2px' }}>
        選一句最酸的，測出你的成分。
      </p>
      
      <button 
        onClick={onNext}
        style={{ 
          padding: '20px 60px', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          background: '#FAFAFA', 
          color: '#1A1A1A', 
          border: '3px solid #1A1A1A', 
          borderRadius: '999px',
          letterSpacing: '2px'
        }}
      >
        開始測驗
      </button>
    </div>
  );
}