import {lessonsList} from './mockData/lessonApiMockData'

export function getLessonsListApiCall(){
    return lessonsList;
}

export function getLessonByIdApiCall(lessonId){
    const lesson = lessonsList.find(lesson => lesson._id === lessonId);
    return lesson;
}