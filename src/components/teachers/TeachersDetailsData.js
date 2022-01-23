import React from 'react';
import TeachersDetailsDataRow from './TeachersDetailsDataRow';
import { useTranslation } from 'react-i18next';

function TeacherDetailsData(props){
    const teacher = props.teacherData;
    const {t} = useTranslation();
    return(
        <React.Fragment>
            <p>{t('teachers.fields.firstName')}: {teacher.firstName}</p>
            <p>{t('teachers.fields.lastName')}: {teacher.lastName}</p>
            <p>{t('teachers.fields.mail')}: {teacher.mail}</p>
            <p>{t('teachers.fields.level')}: {teacher.level}</p>
            <p>{t('teachers.fields.salary')}: {teacher.salary}</p>
            <h2>{t('teachers.form.teacherDetails')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('teachers.form.lessonName')}</th>
                        <th>{t('teachers.form.lessonLevel')}</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.groups.map(lesson =>
                        <TeachersDetailsDataRow lessonData={lesson} key={lesson._id}/>
                        )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default TeacherDetailsData