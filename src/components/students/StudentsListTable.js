import { React } from 'react';
import StudentsListTableRow from './StudentsListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

export default function StudentsListTable(props) {
    const students = props.studList; 
    const {t} = useTranslation();
    return (
        <table className="table-list" id="studentList">
                    <thead>
                        <tr>
                        <th>{t('students.fields.firstName')}</th>
                        <th>{t('students.fields.lastName')}</th>
                        <th className="age-column">{t('students.fields.age')}</th>
                        <th>{t('students.fields.level')}</th>
                        <th className="date-column">{t('students.fields.date')}</th>
                        { isAuthenticated() && <th>{t('list.actions.actionTableName')}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(stud => 
                            <StudentsListTableRow studData={stud} key={stud._id} />
                        )}
                    </tbody>
                </table>
    )
}