const equipmentToCreate = [
  {
    equipType: "Amplifiers",
    imageId: 2,
  },
  {
    equipType: "Cameras",
    imageId: 3,
  },
  {
    equipType: "EPIC-Headend",
    imageId: 4,
  },
  {
    equipType: "Microphones",
    imageId: 5,
  },
  {
    equipType: "Strobes",
    imageId: 6,
  },
  {
    equipType: "Wallplates",
    imageId: 7,
  },
  {
    equipType: "Speakers",
    imageId: 8,
  },
  {
    equipType: "70V-Amplifiers",
    imageId: 9,
    categoryId: 1,
  },
  {
    equipType: "CA-Devices",
    imageId: 10,
    categoryId: 1,
  },
  {
    equipType: "MS-Devices",
    imageId: 11,
    categoryId: 1,
  },
  {
    equipType: "Retired-Amps",
    imageId: 12,
    categoryId: 1,
  },
  {
    equipType: "MS-500",
    imageId: 13,
    categoryId: 9,
  },
];

const additionalMSEquip = [
  "MS-250",
  "MS-300",
  "MS-320",
  "MS-375",
  "MS-400",
  "MS-450",
  "MS-600",
  "MS-700",
  "MS-1000",
];

const imgCount = 14;
additionalMSEquip.map((name, idx) => {
  console.log(idx);
  console.log(imgCount + idx);
  equipmentToCreate.push({
    equipType: name,
    imageId: imgCount + idx,
    categoryId: 9,
  });
});
console.log(equipmentToCreate);

module.exports = {
  equipmentToCreate,
};
