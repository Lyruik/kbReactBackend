const {
  camsToPush,
  camsFileToPush,
  headendToPush,
  headendFilesToPush,
  micsToPush,
  micsFilesToPush,
  strobesToPush,
  strobesFilesToPush,
  wallplatesToPush,
  wallplatesFilesToPush,
  speakersToPush,
  speakersFilesToPush,
  retiredAmpsFiles,
  retiredAmps,
  initImagesToCreate,
  seventyVoltAmps,
  seventyVoltAmpsFiles,
  CADevices,
  CADevicesFiles,
  initImageFilesToCreate,
  ampFileStuff,
  ampStuff,
  msDevices,
  msDevicesFiles,
} = require("./equipNameArrays");
const { makeImageObject } = require("./imageImportList");

const imagesToCreate = [];
const imageImport = (firstArr, secondArr) => {
  const resultArr = makeImageObject(firstArr, secondArr);
  resultArr.map((pic) => {
    imagesToCreate.push(pic);
  });
};

imageImport(initImagesToCreate, initImageFilesToCreate);
imageImport(ampStuff, ampFileStuff);
imageImport(msDevices, msDevicesFiles);
imageImport(seventyVoltAmps, seventyVoltAmpsFiles);
imageImport(CADevices, CADevicesFiles);
imageImport(camsToPush, camsFileToPush);
imageImport(headendToPush, headendFilesToPush);
imageImport(micsToPush, micsFilesToPush);
imageImport(strobesToPush, strobesFilesToPush);
imageImport(wallplatesToPush, wallplatesFilesToPush);
imageImport(speakersToPush, speakersFilesToPush);
imageImport(retiredAmps, retiredAmpsFiles);

module.exports = {
  imagesToCreate,
};
