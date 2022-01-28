import React from 'react';
import {Link} from 'react-router-dom';
import {removeLessonApiCall} from '../../apiCalls/lessonsApiCalls'
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function LessonsListTableRow(props) {
    const {t} = useTranslation();
    const lesson = props.lessonData;
    return (
        <tr>
            <td>{lesson.name}</td>
            <td>{lesson.level}</td>
            <td>{lesson.startHour} </td>
            <td>{lesson.endHour}</td>
            <td>{lesson.day}</td>
            {isAuthenticated() &&
            <td>
                <ul class="list-actions">
                    <li>
                        <Link to={`/lessons/edit/${lesson._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                    </li>
                    <li>
                        <Link to={`/lessons/details/${lesson._id}`} className="list-actions-button-info">{t('list.actions.details')}</Link>
                    </li>
                    <li>
                        <button className="list-actions-button-delete" onClick={(e) => {handleClick(e, lesson._id)}}>{t('list.actions.delete')}</button>
                    </li>
                </ul>
            </td>}
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