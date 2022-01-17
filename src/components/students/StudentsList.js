import React from 'react';
import {Link} from 'react-router-dom';
import {getStudentsApiCall} from '../../apiCalls/studentsApiCalls'


function StudentsList() {
    const studentsList = getStudentsApiCall();
    return (
        <main>
            <h2>Nasi Uczniowie</h2>
            <div className="main-content-div">
                <table className="table-list" id="studentList">
                    <thead>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th className="age-column">Wiek</th>
                        <th>Poziom</th>
                        <th className="date-column">Data Dołączenia</th>
                        <th>Akcje</th>
                    </thead>
                    <tbody>
                        {studentsList.map(stud => 
                        <tr key={stud.id}>
                        <td>{stud.firstName}</td>
                        <td>{stud.lastName}</td>
                        <td className="age-column">{stud.age} </td>
                        <td>{stud.level}</td>
                        <td className="date-column">{stud.date.split(' ')[0]}</td>
                        <td>
                            <ul class="list-actions">
                                <li>
                                    <Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">Edytuj</Link>
                                </li>
                                <li>
                                    <Link to={`/students/details/${stud._id}`} className="list-actions-button-info">Szegóły</Link>
                                </li>
                                <li>
                                    <Link to={`/students/delete/${stud._id}`} className="list-actions-button-delete">Usuń</Link>
                                </li>
                            </ul>
                        </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <p><a href="students/add" className="button-add">Dodaj ucznia</a></p>
            </div>
        </main>
    )
}

export default StudentsList