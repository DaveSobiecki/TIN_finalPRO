import React from 'react'
import {getLessonByIdApiCall} from '../../apiCalls/lessonsApiCalls'
import {Link, useParams} from 'react-router-dom'

function LessonsDetails(){
    let {lessonId} = useParams();
    lessonId = parseInt(lessonId)
    const lesson = getLessonByIdApiCall(lessonId);
    return (
        <main>
            <h2>Szczegóły Lekcji</h2>
            <div className="main-content-div">
            <p className="details-paragraph">Nazwa: {lesson.name}</p>
            <p className="details-paragraph">Poziom: {lesson.level}</p>
            <p className="details-paragraph">Godzina rozpoczęcia: {lesson.startHour}</p>
            <p className="details-paragraph">Godzina zakończenia: {lesson.endHour}</p>
            <p className="details-paragraph">Dzień tygodnia: {lesson.day}</p>
            <h2>Lista Lekcji</h2>
            <table className="table-list">
                <thead>
                    <tr>
                    <th>Uczeń</th>
                    <th>Nauczyciel</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {lesson.lessons.map(
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
            <Link to="/lessons" className="button-back" className="form-button-submit-Link">Powrót</Link>
            </div>
        </main>
    )
}
export default LessonsDetails