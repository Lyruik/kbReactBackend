const {
  ms500Docs,
  ms250Docs,
  ms300Docs,
  JBLDocs,
  TOADocs,
  CA25Docs,
  CA50Docs,
  CA60Docs,
  CA70Docs,
  GL300Docs,
  ms320Docs,
  ms375Docs,
  ms400Docs,
  ms450Docs,
  ms600Docs,
  ms1000Docs,
  achieverDocs,
  elite2Docs,
  innovatorDocs,
  ir2007Docs,
  primeDocs,
  ra101Docs,
  sa16Docs,
  soloSolutionDocs,
  ultimate2000Docs,
  ultimate2SeDocs,
  ultimate3Docs,
  edu360BDocs,
  edu360CDocs,
  edu360PDocs,
  ptzDocs,
  ptzBDocs,
  ptzCDocs,
  claudiaDocs,
  consoleNucDocs,
  CA30Docs,
  ultimate2Docs,
  infoViewDocs,
  kioskDocs,
  mhh09Docs,
  mic360Docs,
  mtd09Docs,
  shh14Docs,
  std14Docs,
  beamDocs,
  beamProDocs,
  cs12Docs,
  fs21Docs,
  fs22Docs,
  ws09Docs,
  xdSoloDocs,
  aeStrobeDocs,
  algoStrobeDocs,
  itcDocs,
  wba60xDocs,
  wpa50xDocs,
  wpa70xDocs,
} = require("./documentsImport");
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

let docIdxStart = 1;
const addDocIdsToEquipment = (device, stopIdx) => {
  const arr = [];
  for (let i = docIdxStart; i < stopIdx + docIdxStart; i++) {
    arr.push(i.toString());
  }
  for (let key of equipmentToCreate) {
    if (key.equipType === device) {
      key.relatedDocIds = arr;
    }
  }
  docIdxStart = docIdxStart + arr.length;
};

addDocIdsToEquipment("MS-500", ms500Docs.length);
addDocIdsToEquipment("MS-250", ms250Docs.length);
addDocIdsToEquipment("MS-300", ms300Docs.length);
addDocIdsToEquipment("JBL-Amp", JBLDocs.length);
addDocIdsToEquipment("TOA-Amp", TOADocs.length);
addDocIdsToEquipment("CA-25", CA25Docs.length);
addDocIdsToEquipment("CA-30", CA30Docs.length);
addDocIdsToEquipment("CA-50", CA50Docs.length);
addDocIdsToEquipment("CA-60", CA60Docs.length);
addDocIdsToEquipment("CA-70", CA70Docs.length);
addDocIdsToEquipment("GL-300", GL300Docs.length);
addDocIdsToEquipment("MS-320", ms320Docs.length);
addDocIdsToEquipment("MS-375", ms375Docs.length);
addDocIdsToEquipment("MS-400", ms400Docs.length);
addDocIdsToEquipment("MS-450", ms450Docs.length);
addDocIdsToEquipment("MS-600", ms600Docs.length);
addDocIdsToEquipment("MS-1000", ms1000Docs.length);
addDocIdsToEquipment("Achiever", achieverDocs.length);
addDocIdsToEquipment("Elite-II", elite2Docs.length);
addDocIdsToEquipment("Innovator", innovatorDocs.length);
addDocIdsToEquipment("IR-2007", ir2007Docs.length);
addDocIdsToEquipment("Prime", primeDocs.length);
addDocIdsToEquipment("RA-101", ra101Docs.length);
addDocIdsToEquipment("SA-16", sa16Docs.length);
addDocIdsToEquipment("Solo-Solution", soloSolutionDocs.length);
addDocIdsToEquipment("Ultimate-2000", ultimate2000Docs.length);
addDocIdsToEquipment("Ultimate-II", ultimate2Docs.length);
addDocIdsToEquipment("Ultimate-II-SE", ultimate2SeDocs.length);
addDocIdsToEquipment("Ultimate-III", ultimate3Docs.length);
addDocIdsToEquipment("EduCam-360-B", edu360BDocs.length);
addDocIdsToEquipment("EduCam-360-C", edu360CDocs.length);
addDocIdsToEquipment("EduCam-360-P", edu360PDocs.length);
addDocIdsToEquipment("EduCam-PTZ", ptzDocs.length);
addDocIdsToEquipment("EduCam-PTZ-B", ptzBDocs.length);
addDocIdsToEquipment("EduCam-PTZ-C", ptzCDocs.length);
addDocIdsToEquipment("Claudia", claudiaDocs.length);
addDocIdsToEquipment("Console-NUC", consoleNucDocs.length);
addDocIdsToEquipment("InfoView", infoViewDocs.length);
addDocIdsToEquipment("Kiosk", kioskDocs.length);
addDocIdsToEquipment("MHH-09", mhh09Docs.length);
addDocIdsToEquipment("MIC-360", mic360Docs.length);
addDocIdsToEquipment("MTD-09", mtd09Docs.length);
addDocIdsToEquipment("SHH-14", shh14Docs.length);
addDocIdsToEquipment("STD-14", std14Docs.length);
addDocIdsToEquipment("BEAM", beamDocs.length);
addDocIdsToEquipment("BEAM-PRO", beamProDocs.length);
addDocIdsToEquipment("CS-12", cs12Docs.length);
addDocIdsToEquipment("FS-21", fs21Docs.length);
addDocIdsToEquipment("FS-22", fs22Docs.length);
addDocIdsToEquipment("WS-09", ws09Docs.length);
addDocIdsToEquipment("XD-SOLO", xdSoloDocs.length);
addDocIdsToEquipment("AE-Strobe", aeStrobeDocs.length);
addDocIdsToEquipment("Algo-Strobe", algoStrobeDocs.length);
addDocIdsToEquipment("ITC", itcDocs.length);
addDocIdsToEquipment("WBA-60x", wba60xDocs.length);
addDocIdsToEquipment("WPA-50x", wpa50xDocs.length);
addDocIdsToEquipment("WPA-70x", wpa70xDocs.length);

module.exports = {
  equipmentToCreate,
};
