import { useFaceApiModels } from "@/hooks/queries/useFaceApiModels";
import { useCamera } from "@/hooks/useCamera";
import { useElementSize } from "@mantine/hooks";
import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";

const FaceRecognitionApp = () => {
  const { ref: containerRef, width } = useElementSize();
  const aspectRatio = 4 / 3;
  const height = width / aspectRatio;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load face-api models
  const { isModelsLoaded } = useFaceApiModels();

  const stream = useCamera(isModelsLoaded, videoRef);

  // Face detection

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas size to match video dimensions
      canvas.width = video.width;
      canvas.height = video.height;

      timeout = setTimeout(detectFaces, 100);

      if (!isModelsLoaded) {
        return;
      }

      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detection) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          // Draw new detection
          const dims = { width: video.width, height: video.height };
          const resizedResults = faceapi.resizeResults(detection, dims);

          faceapi.draw.drawDetections(canvas, resizedResults);
          faceapi.draw.drawFaceExpressions(canvas, resizedResults, 0.05);
          faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    };

    if (isModelsLoaded && stream) {
      detectFaces();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isModelsLoaded, stream]);

  return (
    <article className="flex flex-col items-center sm:px-5 mt-4 lg:mt-8 prose-sm lg:prose mx-auto">
      <div className="flex flex-col w-full lg:max-w-[580px]">
        <h1 className="text-stone-700 !mb-0 font-serif">
          Face Expression Recognition
        </h1>
        <p className="text-stone-700">
          This is a simple face expression recognition app built with
          face-api.js and TensorFlow.js technology. It detects faces and their
          expressions in real-time using neural networks.
        </p>

        <div className="relative w-full max-w-[640px]" ref={containerRef}>
          <video
            ref={videoRef}
            className="rounded-lg transform w-full h-auto !m-0"
            autoPlay
            playsInline
            muted
            width={width}
            height={height}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-10 !m-0"
            width={width}
            height={height}
          />
        </div>

        <p className="text-stone-500 mt-2 text-xs">
          Your privacy is protected — the camera feed is processed entirely in
          your browser and is never recorded or transmitted to any external
          servers.
        </p>

        {!isModelsLoaded && (
          <div className="mt-4 text-gray-600">
            Loading models... Please wait.
          </div>
        )}
      </div>
    </article>
  );
};

export default FaceRecognitionApp;
