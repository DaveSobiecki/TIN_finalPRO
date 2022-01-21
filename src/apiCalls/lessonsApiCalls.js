const lessonsBaseUrl = 'http://localhost:3000/api/groups'

export function getLessonsListApiCall(){
    const promise = fetch(lessonsBaseUrl);
    return promise;
}

export function getLessonByIdApiCall(lessonId){
    const url =`${lessonsBaseUrl}/${lessonId}`;
    const promise = fetch(url);
    return promise;
}

export function addLessonApiCall(lesson) {
    const lessonString = JSON.stringify(lesson);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: lessonString
    }

    const promise = fetch(lessonsBaseUrl, options);
    return promise;
}

export function removeLessonApiCall(lessonId) {
    const url = `${lessonsBaseUrl}/${lessonId}`;
    const options = {
        method: 'DELETE',
    }
    const promise = fetch(url, options);
    return promise;
}

export function updateLessonApiCall(lessonId, lesson) {
    const url = `${lessonsBaseUrl}/${lessonId}`;
    const lessonString = JSON.stringify(lesson);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: lessonString
    }

    const promise = fetch(url, options);
    return promise;
}