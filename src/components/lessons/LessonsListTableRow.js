import React from 'react';
import {Link} from 'react-router-dom';
import {removeLessonApiCall} from '../../apiCalls/lessonsApiCalls'

function LessonsListTableRow(props) {
    const lesson = props.lessonData;
    return (
        <tr>
            <td>{lesson.name}</td>
            <td>{lesson.level}</td>
            <td>{lesson.startHour} </td>
            <td>{lesson.endHour}</td>
            <td>{lesson.day}</td>
            <td>
                <ul class="list-actions">
                    <li>
                        <Link to={`/lessons/edit/${lesson._id}`} className="list-actions-button-edit">Edytuj</Link>
                    </li>
                    <li>
                        <Link to={`/lessons/details/${lesson._id}`} className="list-actions-button-info">Szegóły</Link>
                    </li>
                    <li>
                        <button className="list-actions-button-delete" onClick={(e) => {handleClick(e, lesson._id)}}>Usuń</button>
                    </li>
                </ul>
            </td>
       </tr>
    )
}

export default LessonsListTableRow

function handleClick(event, lessonId){
    event.preventDefault();
    removeLessonApiCall(lessonId)
    .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    console.log(data.message);
                } else {
                    console.log(data)
                }
            },
            (err) => {
                console.log(err);
            }
        );
    document.location.reload(true);
}