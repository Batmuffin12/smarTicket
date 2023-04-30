require("@tensorflow/tfjs-node");
const faceapi = require("face-api.js");
const { base64ToCanvas } = require("../utils/faceRecognition");
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const setup = async () =>
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk("./models"),
    faceapi.nets.faceLandmark68Net.loadFromDisk("./models"),
  ]);

setup().then(() => console.log("models loaded successfully"));
