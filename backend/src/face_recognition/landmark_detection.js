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

function base64ToCanvas(base64) {
  var image = new Image();
  image.src = base64;

  var canvas = new Canvas.Canvas(image.width, image.height);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);

  return canvas;
}

function detectLandmarks(base64) {
  var canvas = base64ToCanvas(base64);
  var displaySize = { width: canvas.width, height: canvas.height };

  return faceapi
    .detectAllFaces(canvas, new faceapi.SsdMobilenetv1Options())
    .withFaceLandmarks()
    .then(function (detections) {
      var resizedDetections = faceapi.resizeResults(detections, displaySize);
      return resizedDetections.map(function (d) {
        return d.landmarks;
      });
    });
}

var base64String = "data:image/jpeg;base64,..."; // Replace with your base64 string URI

detectLandmarks(base64String)
  .then(function (landmarks) {
    console.log("Landmarks:", landmarks);
  })
  .catch(function (err) {
    console.error("Error:", err);
  });
