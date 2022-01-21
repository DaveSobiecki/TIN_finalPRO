const studentsBaseUrl = 'http://localhost:3000/api/students'

export function getStudentsApiCall() {
    const promise = fetch(studentsBaseUrl);
    return promise;
}

export function getStudentByIdApiCall(studId) {
    const url =`${studentsBaseUrl}/${studId}`;
    const promise = fetch(url);
    return promise;
}

export function addStudentApiCall(student) {
    const studentString = JSON.stringify(student);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: studentString
    }

    const promise = fetch(studentsBaseUrl, options);
    return promise;
}

export function removeStudentApiCall(studId) {
    const url = `${studentsBaseUrl}/${studId}`;
    const options = {
        method: 'DELETE',
    }
    const promise = fetch(url, options);
    return promise;
}

export function updateStudentApiCall(studId, student) {
    const url = `${studentsBaseUrl}/${studId}`;
    const studentString = JSON.stringify(student);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: studentString
    }

    const promise = fetch(url, options);
    return promise;
}