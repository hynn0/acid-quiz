import { useState } from 'react';
import StartScreen from './components/StartScreen';
import CaptureScreen from './components/CaptureScreen';
import SelectScreen from './components/SelectScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import { type AcidResult } from './lib/acidEngine';
import { type FaceFeatures } from './types';

type Step = 'start' | 'capture' | 'select' | 'loading' | 'result';

function App() {
  const [step, setStep] = useState<Step>('start');
  const [quote, setQuote] = useState('');
  const [result, setResult] = useState<AcidResult | null>(null);
  
  // 更新初始狀態，符合新的 FaceFeatures 型別
 const [face, setFace] = useState<FaceFeatures>({ 
  hair: 'short', 
  glasses: 'none', 
  hasBeard: false,
  accessory: 'none' 
});

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'sans-serif' }}>
      {step === 'start' && <StartScreen onNext={() => setStep('capture')} />}
      
      {step === 'capture' && (
        <CaptureScreen 
          onNext={(features) => {
            setFace(features);
            setStep('select');
          }} 
        />
      )}
      
      {step === 'select' && (
        <SelectScreen
          onNext={(q) => {
            setQuote(q);
            setStep('loading');
          }}
        />
      )}
      
      {step === 'loading' && (
        <LoadingScreen
          quote={quote}
          onDone={(res) => {
            setResult(res);
            setStep('result');
          }}
        />
      )}
      
      {step === 'result' && result && (
        <ResultScreen
          result={result}
          quote={quote}
          face={face}
          onRestart={() => setStep('start')}
        />
      )}
    </div>
  );
}

export default App;