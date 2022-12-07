const { spawn } = require("child_process");

const callToPythonApi = (fileName, params) => {
  try {
    const fullPath = __dirname + "\\" + fileName;
    const python = spawn("python3", [fullPath, ...params]);
    return new Promise((res, rej) => {
      python.stdout.on("data", (data) => {
        const result = Buffer.from(data);
        res(result.toString());
      });
      python.stderr.on("data", (data) => {
        const err = Buffer.from(data);
        rej(err.toString());
      });
    });
  } catch (apiErr) {
    console.error(apiErr);
    return null;
  }
};

module.exports = { callToPythonApi };
