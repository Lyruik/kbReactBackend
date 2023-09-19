const {
  camsToPush,
  headendToPush,
  micsToPush,
  strobesToPush,
  wallplatesToPush,
  speakersToPush,
  retiredAmps,
  seventyVoltAmps,
  CADevices,
  ampStuff,
  initImagesToCreate,
  msDevices,
} = require("./equipNameArrays");

const equipmentToCreate = [];
const pushToEquipToCreate = (arr, catId) => {
  let imgCount = equipmentToCreate.length + 1;
  arr.map((name, idx) => {
    equipmentToCreate.push({
      equipType: name,
      imageId: imgCount + idx,
      categoryId: catId,
    });
  });
};

pushToEquipToCreate(initImagesToCreate, 8);
pushToEquipToCreate(ampStuff, 1);
pushToEquipToCreate(msDevices, 9);
pushToEquipToCreate(seventyVoltAmps, 10);
pushToEquipToCreate(CADevices, 11);
pushToEquipToCreate(camsToPush, 2);
pushToEquipToCreate(headendToPush, 3);
pushToEquipToCreate(micsToPush, 4);
pushToEquipToCreate(strobesToPush, 5);
pushToEquipToCreate(wallplatesToPush, 6);
pushToEquipToCreate(speakersToPush, 7);
pushToEquipToCreate(retiredAmps, 12);

module.exports = {
  equipmentToCreate,
};
