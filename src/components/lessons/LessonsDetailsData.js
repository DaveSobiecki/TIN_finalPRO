import React from 'react';
import LessonsDetailsDataRow from './LessonsDetailsDataRow';
import { useTranslation } from 'react-i18next';

function LessonsDetailsData(props){
    const {t} = useTranslation();
    const lesson = props.lessonData;
    const student = props.studentData;
    const teacher = props.teacherData;
    return(
        <React.Fragment>
            <p>{t('lessons.fields.name')}: {lesson.name}</p>
            <p>{t('lessons.fields.level')}: {lesson.level}</p>
            <p>{t('lessons.fields.startHour')}: {lesson.startHour}</p>
            <p>{t('lessons.fields.endHour')}: {lesson.endHour}</p>
            <p>{t('lessons.fields.day')}: {lesson.day}</p>
            <h2>{t('lessons.form.members')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('lessons.form.student')}</th>
                        <th>{t('lessons.form.teacher')}</th>
                    </tr>
                </thead>
                <tbody>
                    {<LessonsDetailsDataRow lessonData={lesson} studentData={student} teacherData={teacher} />}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default LessonsDetailsData