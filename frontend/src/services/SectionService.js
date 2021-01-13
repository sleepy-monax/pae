let TEST_AA = {
  name: "Mathématique",
  credits: 5,
};

let TEST_UE = {
  name: "Mathématique appliquée et traitement de données",
  AAs: [TEST_AA, TEST_AA],
};

let TEST_SECTION_IG = {
  id: "ig",
  name: "Bachelier en informatique de gestion",
  blocs: [
    {
      id: "1ig",
      name: "bloc 1",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "2ig",
      name: "bloc 2",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "3ig",
      name: "bloc 3",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
  ],
};

let TEST_SECTION_AD = {
  id: "ad",
  name: "Assistant·e de direction",
  blocs: [
    {
      id: "1ad",
      name: "bloc 1",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "2ad",
      name: "bloc 2",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "1ad",
      name: "bloc 3",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
  ],
};

let TEST_SECTION_CT = {
  id: "ct",
  name: "Comptabilité",
  blocs: [
    {
      id: "1ct",
      name: "bloc 1",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "2ct",
      name: "bloc 2",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
    {
      id: "3ct",
      name: "bloc 3",
      UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE],
    },
  ],
};

let TEST_SECTIONS = [TEST_SECTION_AD, TEST_SECTION_CT, TEST_SECTION_IG];

export function FindAllSections() {
  return TEST_SECTIONS;
}

export function FindSectionFromBlocId(id) {
  let sectionId = [id[1], id[2]].join("");

  return FindSectionById(sectionId);
}

export function FindSectionById(id) {
  return TEST_SECTIONS.filter((section) => section.id === id)[0];
}

export function FindBlockById(id) {
  let section = FindSectionFromBlocId(id);
  return section.blocs.filter((bloc) => bloc.id === id)[0];
}

export function SendAllSections(sections) {
  TEST_SECTIONS = sections;
}
