import fs from 'fs';
import path from 'path';
import https from 'https';

const MODELS_DIR = path.join(process.cwd(), 'public', 'models');
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const MODELS: string[] = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1',
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
];

// Create models directory if it doesn't exist
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}

// Download function
const downloadFile = (url: string, dest: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => { });
      reject(err);
    });
  });
};

// Download all models
async function downloadModels(): Promise<void> {
  console.log('Downloading face-api.js models...');

  for (const model of MODELS) {
    const url = `${BASE_URL}/${model}`;
    const dest = path.join(MODELS_DIR, model);

    console.log(`Downloading ${model}...`);
    try {
      await downloadFile(url, dest);
      console.log(`Successfully downloaded ${model}`);
    } catch (error) {
      console.error(`Error downloading ${model}:`, error);
    }
  }

  console.log('Download complete!');
}

downloadModels(); 