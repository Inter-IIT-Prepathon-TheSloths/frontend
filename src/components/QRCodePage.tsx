import { useEffect, useRef } from "react";
import QRCode from 'qrcode';

interface Props {
  url: string;
}

const QRCodeComponent: React.FC<Props> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        errorCorrectionLevel: 'H',
        width: 256,
      }, (error) => {
        if (error) console.error(error);
      });
    }
  }, []);

  return (
    <canvas ref={canvasRef} />
  )
}

export default QRCodeComponent