import React from 'react';
import getFormattedDate from '../../helpers/dateHelper';
import StudentDetailsDataRow from './StudentDetailsDataRow';
import { useTranslation } from 'react-i18next';

function StudentDetailsData(props){
    const stud = props.studData;
    const {t} = useTranslation();
    return(
        <React.Fragment>
            <p>{t('student.fields.firstName')}: {stud.firstName}</p>
            <p>{t('student.fields.lastName')}: {stud.lastName}</p>
            <p>{t('student.fields.age')}: {stud.age}</p>
            <p>{t('student.fields.level')}: {stud.level}</p>
            <p>{t('student.fields.date')}: {getFormattedDate(stud.date)}</p>
            <h2>{t('student.form.studentDetails')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('student.form.lessonName')}</th>
                        <th>{t('student.form.lessonLevel')}</th>
                    </tr>
                </thead>
                <tbody>
                    {stud.groups.map(lesson =>
                        <StudentDetailsDataRow lessonData={lesson} key={lesson._id}/>
                        )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default StudentDetailsData