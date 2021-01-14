import { ApiDownloadStudents } from "./ApiService";

let students = undefined;

export function FindAllStudent() {
  return new Promise((resolve, reject) => {
    if (students) {
      resolve(students);
    }

    ApiDownloadStudents()
      .then((remote_students) => {
        students = remote_students;
        resolve(remote_students);
      })
      .catch(reject);
  });
}

export function FindStudentById(id) {
  return new Promise((resolve, reject) => {
    FindAllStudent()
      .then((students) =>
        resolve(students.filter((student) => student.id === id)[0])
      )
      .catch(reject);
  });
}

export function FindStudentsByBloc(bloc) {
  return new Promise((resolve, reject) => {
    FindAllStudent()
      .then((students) =>
        resolve(students.filter((student) => student.bloc === bloc))
      )
      .catch(reject);
  });
}

export function UpdateStudent(student) {
  console.log("FIXME: UpdateStudent()");
}
