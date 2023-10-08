const data = {
  1: {
    title: "խմիչք",
    id: 1,
    parentId: null,
    sub: [
      {
        title: "ալկոհոլյին խմիչք",
        id: 10,
        parentId: 1,
      },
      {
        title: "ոչ ալկոհոլյին խմիչք",
        id: 11,
        parentId: 1,
      },
      {
        title: "տաք/սառ խմիչք",
        id: 12,
        parentId: 1,
      },
    ],
  },
  2: {
    title: "ուտեստ",
    id: 2,
    parentId: null,
    sub: [],
  },
  10: {
    title: "ալկոհոլյին խմիչք",
    id: 10,
    parentId: 1,
    sub: [
      {
        title: "կոնյակ",
        id: 100,
        parentId: 10,
      },
      {
        title: "օղի",
        id: 101,
        parentId: 10,
      },
    ],
  },
  11: {
    title: "ոչ ալկոհոլյին խմիչք",
    id: 11,
    parentId: 1,
    sub: [
      {
        title: "հյութ",
        id: 201,
        parentId: 11,
      },
      {
        title: "ֆրեշ",
        id: 202,
        parentId: 11,
      },
    ],
  },
  12: {
    title: "տաք/սառ խմիչք",
    id: 12,
    parentId: 1,
    sub: [
      {
        title: "թեյ",
        id: 301,
        parentId: 12,
      },
      {
        title: "սուրճ",
        id: 301,
        parentId: 12,
      },
    ],
  },
  100: {
    title: "կոնյակ",
    id: 100,
    parentId: 10,
    sub: [],
  },
  101: {
    title: "օղի",
    id: 101,
    parentId: 10,
    sub: [],
  },
  201: {
    title: "հյութ",
    id: 201,
    parentId: 11,
    sub: [],
  },
  202: {
    title: "ֆրեշ",
    id: 202,
    parentId: 11,
    sub: [],
  },
  301: {
    title: "սուրճ",
    id: 301,
    parentId: 12,
    sub: [],
  },
};

export default data;
