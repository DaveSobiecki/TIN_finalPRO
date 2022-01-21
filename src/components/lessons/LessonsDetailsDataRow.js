import React from 'react';

function LessonsDetailsDataRow(props) {
    const lesson = props.lessonData;
    const student = props.studentData;
    const teacher = props.teacherData;

    return (
        <tr>
            <td>{student.firstName} {student.lastName}</td>
            <td>{teacher.firstName} {teacher.lastName}</td>
        </tr>
    )
}

export default LessonsDetailsDataRow