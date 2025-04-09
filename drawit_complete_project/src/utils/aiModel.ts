import * as tmImage from '@teachablemachine/image';

const modelURL = 'https://teachablemachine.withgoogle.com/models/lXXY4PSI2/model.json';
const metadataURL = 'https://teachablemachine.withgoogle.com/models/lXXY4PSI2/metadata.json';

let model: tmImage.CustomMobileNet | null = null;

// Carrega o modelo da Teachable Machine
export async function loadModel() {
  model = await tmImage.load(modelURL, metadataURL);
}

// Classifica uma imagem capturada do canvas
export async function classifyDrawing(imageData: HTMLCanvasElement) {
  if (!model) throw new Error('Model not loaded');
  const prediction = await model.predict(imageData);
  return prediction;
}
