const teachersBaseUrl = 'http://localhost:3000/api/teachers'

export function getTeachersApiCall(){
    const promise = fetch(teachersBaseUrl);
    return promise;
}

export function getTeacherByIdApiCall(teacherId){
    const url =`${teachersBaseUrl}/${teacherId}`;
    const promise = fetch(url);
    return promise;
}

export function addTeacherApiCall(teacher) {
    const teacherString = JSON.stringify(teacher);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: teacherString
    }

    const promise = fetch(teachersBaseUrl, options);
    return promise;
}

export function removeTeacherApiCall(teacherId) {
    const url = `${teachersBaseUrl}/${teacherId}`;
    const options = {
        method: 'DELETE',
    }
    const promise = fetch(url, options);
    return promise;
}

export function updateTeacherApiCall(teacherId, teacher) {
    const url = `${teachersBaseUrl}/${teacherId}`;
    const teacherString = JSON.stringify(teacher);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: teacherString
    }

    const promise = fetch(url, options);
    return promise;
}