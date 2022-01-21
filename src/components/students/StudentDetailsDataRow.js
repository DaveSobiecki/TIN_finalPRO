import React from 'react';

function StudentDetailsDataRow(props) {
    const lesson = props.lessonData;
    return (
        <tr>
            <td>{lesson.name}</td>
            <td>{lesson.level}</td>
        </tr>
    )
}

export default StudentDetailsDataRow