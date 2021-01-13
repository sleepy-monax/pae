export let MOCK_STUDENTS = [
  {
    id: "la199234",
    firstname: "John",
    lastname: "Smith",
    bloc: "1ig",
  },
  {
    id: "la124234",
    firstname: "Carrote",
    lastname: "Doe",
    bloc: "1ig",
  },
  {
    id: "la188015",
    firstname: "Dhaeyer",
    lastname: "Sasha",
    bloc: "1ig",
  },
];

export function FindAllStudent() {
  return MOCK_STUDENTS;
}

export function FindStudentById(id) {
  return MOCK_STUDENTS.filter((student) => student.id === id)[0];
}

export function FindStudentsByBloc(bloc) {
  return MOCK_STUDENTS.filter((student) => student.bloc === bloc);
}

export function UpdateStudent(student) {
  let index = MOCK_STUDENTS.findIndex((s) => s.id === student.id);
  MOCK_STUDENTS[index] = student;
}
