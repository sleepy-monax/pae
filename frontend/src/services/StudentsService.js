export function FindAll() {

}

let MOCK_STUDENT = {
    firstname: "John",
    lastname: "Smith",
}


export let MOCK_STUDENTS = [
    {
        id: "la199234",
        firstname: "John",
        lastname: "Smith",
    },
    {
        id: "la124234",
        firstname: "Carrote",
        lastname: "Doe",
    },
    {  
        id: "la188015",
        firstname: 'Dhaeyer',  
        lastname: 'Sasha',
    }
];

export function FindById(student) {
    let searchedStudent = MOCK_STUDENTS.indexOf(student);
    return searchedStudent;
}

export function Update(student) {

}