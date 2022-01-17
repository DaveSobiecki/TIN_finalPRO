import {teachersList} from './mockData/teacherApiMockData'

export function getTeachersApiCall(){
    return teachersList;
}

export function getTeacherByIdApiCall(teacherId){
    const teacher = teachersList.find(teacher => teacher._id === teacherId);
    return teacher;
}