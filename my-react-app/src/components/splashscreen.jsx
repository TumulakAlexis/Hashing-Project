import { useEffect, useRef } from 'react';
import './splashscreen.css';

function SplashScreen({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    video.onended = () => {
      onFinish(); // callback to hide splash and show app
    };
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <video
        ref={videoRef}
        src="/splash.mp4"
        autoPlay
        muted
        playsInline
        className="splash-video"
      />
    </div>
  );
}

export default SplashScreen;
