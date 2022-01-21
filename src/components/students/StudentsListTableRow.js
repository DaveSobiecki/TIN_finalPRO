import React from 'react';
import {Link} from 'react-router-dom';
import getFormattedDate from '../../helpers/dateHelper'
import { removeStudentApiCall } from '../../apiCalls/studentsApiCalls'


function StudentsListTableRow(props) {
    const stud = props.studData;
    return (
        <tr>
            <td>{stud.firstName}</td>
            <td>{stud.lastName}</td>
            <td className="age-column">{stud.age} </td>
            <td>{stud.level}</td>
            <td className="date-column">{getFormattedDate(stud.date)}</td>
            <td>
                <ul class="list-actions">
                    <li>
                        <Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">Edytuj</Link>
                    </li>
                    <li>
                        <Link to={`/students/details/${stud._id}`} className="list-actions-button-info">Szegóły</Link>
                    </li>
                    <li>
                        <button className="list-actions-button-delete" onClick={(e) => {handleClick(e, stud._id)}}>Usuń</button>
                    </li>
                </ul>
            </td>
       </tr>
    )
}

export default StudentsListTableRow

function handleClick(event, studId){
    event.preventDefault();
    removeStudentApiCall(studId)
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