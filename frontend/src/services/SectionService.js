import { ApiDownloadSection, ApiUploadSection } from "./ApiService";

let sections = undefined;

export function FindAllSections() {
  return new Promise((resolve, reject) => {
    if (sections) {
      resolve(sections);
    }

    ApiDownloadSection()
      .then((remote_sections) => {
        sections = remote_sections;
        resolve(remote_sections);
      })
      .catch(reject);
  });
}

export function FindSectionById(id) {
  return new Promise((resolve, reject) => {
    FindAllSections()
      .then((sections) =>
        resolve(sections.filter((section) => section.id == id)[0])
      )
      .catch(reject);
  });
}

export function FindSectionFromBlocId(id) {
  let sectionId = [id[1], id[2]].join("");

  return FindSectionById(sectionId);
}

export function FindBlockById(id) {
  return new Promise((resolve, reject) => {
    FindSectionFromBlocId(id)
      .then((section) => {
        resolve(section.blocs.filter((bloc) => bloc.id === id)[0]);
      })
      .catch(reject);
  });
}

export function SendAllSections(s) {
  sections = s;
  return ApiUploadSection(s);
}
