import React from 'react'
import {getTeacherByIdApiCall} from '../../apiCalls/teachersApiCalls'
import {Link, useParams} from 'react-router-dom'

function TeachersDetails(){
    let {teacherId} = useParams();
    teacherId = parseInt(teacherId)
    const teacher = getTeacherByIdApiCall(teacherId);
    return (
        <main>
            <h2>Szczegóły Nauczyciela</h2>
            <div className="main-content-div">
            <p className="details-paragraph">Imię: {teacher.firstName}</p>
            <p className="details-paragraph">Nazwisko: {teacher.lastName}</p>
            <p className="details-paragraph">E-mail: {teacher.mail}</p>
            <p className="details-paragraph">Poziom: {teacher.level}</p>
            <p className="details-paragraph">Pensja: {teacher.salary}zł</p>
            <h2>Lista Lekcji</h2>
            <table className="table-list">
                <thead>
                    <tr>
                    <th>Nazwa Lekcji</th>
                    <th>Uczeń</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {teacher.lessons.map(
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
            <Link to="/teachers" className="button-back" className="form-button-submit-Link">Powrót</Link>
            </div>
        </main>
    )
}
export default TeachersDetails