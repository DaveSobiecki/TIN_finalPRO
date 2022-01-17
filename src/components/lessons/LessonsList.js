import React from 'react';
import {Link} from 'react-router-dom';
import { getLessonsListApiCall } from '../../apiCalls/lessonsApiCalls';

function LessonsList(){
    const lessonsList = getLessonsListApiCall();
    return (
        <main>
            <h2>Nasze Prywatne Grupy Lekcyjne</h2>
            <div className="main-content-div">
                <table className="table-list" id="lessonList">
                    <thead>
                    <th>Nazwa</th>
                    <th className="lvl-column">Poziom</th>
                    <th className="start-time-column">Zajęcia od</th>
                    <th className="end-time-column">Zajęcia do</th>
                    <th>Dzień</th>
                    <th>Akcje</th>
                    </thead>
                    <tbody>
                        {lessonsList.map(lesson => 
                            <tr key={lesson._id}>
                            <td> {lesson.name} </td>
                            <td className="lvl-column"> {lesson.level} </td>
                            <td className="start-time-column"> {lesson.startHour.split(":")[0] + ":" + lesson.startHour.split(":")[1]} </td>
                            <td className="end-time-column"> {lesson.endHour.split(":")[0] + ":" + lesson.endHour.split(":")[1]} </td>
                            <td> {lesson.day} </td>
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/lessons/edit/${lesson._id}`} className="list-actions-button-edit">Edytuj</Link>
                                    </li>
                                    <li>
                                        <Link to={`/lessons/details/${lesson._id}`} className="list-actions-button-info">Szegóły</Link>
                                    </li>
                                    <li>
                                        <Link to={`/lessons/delete/${lesson._id}`} className="list-actions-button-delete">Usuń</Link>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        )}  
                    </tbody>
                </table>
                <p className="left-button"><a href="lessons/add" className="button-add">Dodaj nową grupę</a></p>
            </div>
        </main>
    )
}

export default LessonsList