const { camsToPush, camsFileToPush } = require("./equipNameArrays");

const makeImageObject = (nameArr, fileArr) => {
  const resultArr = [];
  nameArr.map((device, idx) => {
    resultArr.push({
      name: device + "Pic",
      file: fileArr[idx],
    });
  });
  return resultArr;
};

module.exports = { makeImageObject };
