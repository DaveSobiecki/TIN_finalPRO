import React from 'react'
import {getStudentByIdApiCall} from '../../apiCalls/studentsApiCalls'
import {Link, useParams} from 'react-router-dom'

function StudentsDetails(){
    let {studId} = useParams();
    studId = parseInt(studId)
    const student = getStudentByIdApiCall(studId);
    return (
        <main>
            <h2>Szczegóły Ucznia</h2>
            <div className="main-content-div">
            <p className="details-paragraph">Imię: {student.firstName}</p>
            <p className="details-paragraph">Nazwisko: {student.lastName}</p>
            <p className="details-paragraph">Wiek: {student.age}</p>
            <p className="details-paragraph">Poziom: {student.level}</p>
            <p className="details-paragraph">Data dołączenia: {student.date.split(' ')[0]}</p>
            <h2>Lista Lekcji</h2>
            <table className="table-list">
                <thead>
                    <tr>
                    <th>Nazwa Lekcji</th>
                    <th>Nauczyciel</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {student.lessons.map(
                        lesson => 
                        <tr key={lesson._id}>
                            <td>{lesson.name}</td>
                            <td>{lesson.className}</td>
                        </tr> 
                        
                    )}*/}
                    {//TODO: dokończ liste lekcji
                    }<div>TODO</div>
                </tbody>
            </table>
            <Link to="/students" className="button-back" className="form-button-submit-Link">Powrót</Link>
            </div>
        </main>
    )
}
export default StudentsDetails