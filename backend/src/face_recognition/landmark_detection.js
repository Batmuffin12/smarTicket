require("@tensorflow/tfjs-node");
const faceapi = require("face-api.js");
const Canvas = require("canvas");
const { base64ToCanvas } = require("../utils/faceRecognition");
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const setup = async () =>
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk("./models"),
    faceapi.nets.faceLandmark68Net.loadFromDisk("./models"),
  ]);

setup().then(() => console.log("models loaded successfully"));

const detectLandmarks = async (base64) => {
  const canvas = base64ToCanvas(base64);
  const displaySize = { width: canvas.width, height: canvas.height };
  return faceapi
    .detectAllFaces(canvas, new faceapi.SsdMobilenetv1Options())
    .withFaceLandmarks()
    .then((detections) => {
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      return resizedDetections.map((d) => d.landmarks);
    });
};

module.exports = {
  detectLandmarks,
};
