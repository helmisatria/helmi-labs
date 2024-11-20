import { useElementSize } from "@mantine/hooks";
import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";

import { useFaceApiModels } from "@/hooks/queries/useFaceApiModels";
import { useCamera } from "@/hooks/useCamera";

const FaceRecognitionApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: containerRef, width } = useElementSize();
  const aspectRatio = 4 / 3;
  const height = width / aspectRatio;

  const { isModelsLoaded, labeledDescriptors } = useFaceApiModels();
  const stream = useCamera(isModelsLoaded, videoRef);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Face detection
    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Set canvas size to match video dimensions
        canvas.width = video.width;
        canvas.height = video.height;

        timeout = setTimeout(detectFaces, 1);

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }

        if (!isModelsLoaded) {
          return;
        }

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        // Debug: Log number of detections
        // console.log("Number of faces detected:", detections.length);

        if (detections && labeledDescriptors && labeledDescriptors.length > 0) {
          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
          const dims = { width: video.width, height: video.height };
          const resizedResults = faceapi.resizeResults(detections, dims);

          // Draw detections for each face
          resizedResults.forEach((detection) => {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            const { x, y, width, height } = detection.detection.box;

            // console.log("bestMatch :>> ", bestMatch);

            // Draw box
            ctx.strokeStyle = bestMatch.distance < 0.6 ? "#00ff00" : "#ff0000";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);

            // Draw text background
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(x, y - 30, 200, 30);

            // Draw text
            ctx.fillStyle = "#fff";
            ctx.font = "16px DM Sans";
            ctx.fillText(
              `${bestMatch.label} (${(1 - bestMatch.distance).toFixed(2)})`,
              x,
              y - 10
            );

            // Draw face expressions if you want
            faceapi.draw.drawFaceExpressions(canvas, detection, 0.05);
            // faceapi.draw.drawDetections(canvas, detection);
            faceapi.draw.drawFaceLandmarks(canvas, detection);
          });
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    };

    if (isModelsLoaded && stream) {
      detectFaces();
    }

    return () => {
      // Clean up animation frame
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isModelsLoaded, stream]);

  // Add cleanup to component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <article className="flex flex-col items-center sm:px-5 mt-4 lg:mt-8 prose-sm lg:prose mx-auto">
      <div className="flex flex-col w-full lg:max-w-[580px]">
        <h1 className="text-stone-700 font-serif !mb-0">Face Recognition</h1>
        <p className="text-stone-700">
          This is a simple face recognition app built with face-api.js and
          TensorFlow.js technology. It uses pre-trained neural networks to
          detect faces and match them against a set of reference images in
          real-time.
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
          ></video>
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
