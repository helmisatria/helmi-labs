import { useQuery } from "@tanstack/react-query";
import * as faceapi from "face-api.js";

export function useFaceApiModels() {
  const { isSuccess: isModelsLoaded, data: labeledDescriptors } = useQuery({
    queryKey: ["faceApiModels"],
    queryFn: async () => {
      const MODEL_URL = "/models";

      // Load models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);

      // Load and process reference images
      const referenceImages = [
        // { path: "/photos/Helmi Satria.jpeg", label: "Helmi Satria" },
        // { path: "/photos/Satria.jpeg", label: "Satria" },
        { path: "/photos/jokowi.png", label: "Jokowi" },
      ];

      const labeledDescriptors: faceapi.LabeledFaceDescriptors[] = [];

      for (const { path, label } of referenceImages) {
        const descriptors: Float32Array[] = [];
        const img = await faceapi.fetchImage(path);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          descriptors.push(detection.descriptor);
          const labeledDescriptor = new faceapi.LabeledFaceDescriptors(
            label,
            descriptors
          );
          labeledDescriptors.push(labeledDescriptor);
        }
      }

      return labeledDescriptors;
    },
  });

  return { isModelsLoaded, labeledDescriptors };
}
