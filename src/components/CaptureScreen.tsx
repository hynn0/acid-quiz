import { useEffect, useRef, useState } from 'react';
import FaceAvatar from '../assets/FaceAvatar';
import { type FaceFeatures } from '../types';

type Props = { 
  onNext: (features: FaceFeatures) => void 
};

export default function CaptureScreen({ onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('正在準備攝影機...');
  const [faceDetected, setFaceDetected] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let intervalId: number;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus('請將臉對準畫面中央');
      } catch (err) {
        setStatus('找不到攝影機，請使用下方測試按鈕。');
        setHasCamera(false);
      }
    }

    async function detectFace() {
      if (!('FaceDetector' in window) || !hasCamera) return;
      const faceDetector = new (window as any).FaceDetector();
      const video = videoRef.current;
      if (!video || video.readyState !== 4) return;

      try {
        const faces = await faceDetector.detect(video);
        if (faces.length > 0) {
          setFaceDetected(true);
          setStatus('偵測到臉部！請保持不動...');
          setTimeout(() => {
            if (stream) stream.getTracks().forEach(t => t.stop());
            
            // 隨機產生特徵 (配合最新的型別)
            onNext({ 
              hair: Math.random() > 0.5 ? 'long' : 'short',
              glasses: Math.random() > 0.5 ? 'square' : 'none',
              hasBeard: Math.random() > 0.5,
              accessory: Math.random() > 0.5 ? 'earring' : 'none',
            });
          }, 1500);
          clearInterval(intervalId);
        } else {
          setFaceDetected(false);
          setStatus('請將臉對準畫面中央');
        }
      } catch (e) {}
    }

    startCamera().then(() => {
      intervalId = window.setInterval(detectFace, 1000);
    });

    return () => {
      clearInterval(intervalId);
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [onNext, hasCamera]);

    const handleMockCapture = () => {
    const hairTypes = ['short', 'long', 'bangs', 'ponytail', 'bun', 'spiky', 'bald'] as const;
    const glassesTypes = ['none', 'square', 'round', 'sunglasses'] as const;
    const accessoryTypes = ['none', 'hat', 'earring', 'bowtie'] as const;

    onNext({ 
      hair: hairTypes[Math.floor(Math.random() * hairTypes.length)],
      glasses: glassesTypes[Math.floor(Math.random() * glassesTypes.length)],
      hasBeard: Math.random() > 0.5,
      accessory: accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)],
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#1A1A1A' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>拍一張臉，測出你的酸度</h1>
      
      <div style={{ position: 'relative', width: 480, height: 360, borderRadius: 20, overflow: 'hidden', border: faceDetected ? '5px solid #1A1A1A' : '5px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {hasCamera ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 這裡也要補上 hasBeard 參數，避免報錯 */}
            <FaceAvatar hair="short" glasses="none" hasBeard={false} accessory="none" expression="smile" />
            <p style={{ color: '#666', marginTop: 10 }}>（找不到攝影機）</p>
          </div>
        )}
      </div>

      <p style={{ fontSize: '1.5rem', marginTop: 20, color: '#666' }}>
        {status}
      </p>

      <button 
        onClick={handleMockCapture}
        style={{ marginTop: 30, padding: '12px 24px', fontSize: '1rem', background: '#FAFAFA', color: '#1A1A1A', border: '2px solid #1A1A1A', borderRadius: 999, fontWeight: 'bold' }}
      >
        👉 沒有鏡頭？點我模擬拍到臉
      </button>
    </div>
  );
}