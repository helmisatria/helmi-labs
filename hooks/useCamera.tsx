import { useState, useEffect } from "react";

export const useCamera = (
  isModelsLoaded: boolean,
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!isModelsLoaded) return;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user",
          },
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, [isModelsLoaded]);

  return stream;
};
