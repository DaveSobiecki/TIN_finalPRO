import React from 'react';
import {Link} from 'react-router-dom';
import {getTeachersApiCall} from '../../apiCalls/teachersApiCalls'

function TeachersList(){
    const teachersList = getTeachersApiCall();
    return (
        <main>
            <h2>Nasi Nauczyciele</h2>
            <div className="main-content-div">
                <table className="table-list" id="teacherList">
                    <thead>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th className="mail-column">E-mail</th>
                    <th className="lvl-column">Poziom</th>
                    <th className="salary-column">Pensja</th>
                    <th>Akcje</th>
                    </thead>
                    <tbody>
                        {teachersList.map(teacher => 
                        <tr key={teacher._id}>
                        <td> {teacher.firstName} </td>
                        <td> {teacher.lastName} </td>
                        <td className="mail-column"> {teacher.mail} </td>
                        <td className="lvl-column"> {teacher.level} </td>
                        <td className="salary-column"> {teacher.salary} zł</td>
                        <td>
                            <ul className="list-actions">
                                <li>
                                    <Link to={`/teachers/edit/${teacher._id}`} className="list-actions-button-edit">Edytuj</Link>
                                </li>
                                <li>
                                    <Link to={`/teachers/details/${teacher._id}`} className="list-actions-button-info">Szegóły</Link>
                                </li>
                                <li>
                                    <Link to={`/teachers/delete/${teacher._id}`} className="list-actions-button-delete">Usuń</Link>
                                </li>
                            </ul>
                        </td>
                        </tr>
                        )} 
                    </tbody>
                </table>
                <p><a href="teachers/add" className="button-add">Dodaj nauczyciela</a></p>
            </div>
        </main>
    )
}

export default TeachersList