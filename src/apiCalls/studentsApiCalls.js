import {studentsList} from './mockData/studentsApiMockData'

export function getStudentsApiCall() {
    return studentsList;
}

export function getStudentByIdApiCall(studId){
    const stud = studentsList.find(stud => stud._id === studId);
    return stud;
}