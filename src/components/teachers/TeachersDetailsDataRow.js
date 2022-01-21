import React from 'react';

function TeachersDetailsDataRow(props) {
    const lesson = props.lessonData;
    return (
        <tr>
            <td>{lesson.name}</td>
            <td>{lesson.level}</td>
        </tr>
    )
}

export default TeachersDetailsDataRow