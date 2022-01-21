import React from 'react';
import {Link} from 'react-router-dom';
import { removeTeacherApiCall } from '../../apiCalls/teachersApiCalls'

function TeachersListTableRow(props) {
    const teacher = props.teacherData;
    return (
        <tr>
            <td>{teacher.firstName}</td>
            <td>{teacher.lastName}</td>
            <td>{teacher.mail} </td>
            <td>{teacher.level}</td>
            <td>{teacher.salary}zł</td>
            <td>
                <ul class="list-actions">
                    <li>
                        <Link to={`/teachers/edit/${teacher._id}`} className="list-actions-button-edit">Edytuj</Link>
                    </li>
                    <li>
                        <Link to={`/teachers/details/${teacher._id}`} className="list-actions-button-info">Szegóły</Link>
                    </li>
                    <li>
                        <button className="list-actions-button-delete" onClick={(e) => {handleClick(e, teacher._id)}}>Usuń</button>
                    </li>
                </ul>
            </td>
       </tr>
    )
}

export default TeachersListTableRow

function handleClick(event, teacherId){
    event.preventDefault();
    removeTeacherApiCall(teacherId)
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