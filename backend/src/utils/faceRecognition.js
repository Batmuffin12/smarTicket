const { model } = require("@tensorflow/tfjs-node");
const { Canvas, Image, ImageData } = require("canvas");

const base64ToCanvas = (base64) => {
  const image = new Image();
  image.src = base64;

  const canvas = new Canvas.Canvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);

  return canvas;
};

module.exports = base64ToCanvas;
