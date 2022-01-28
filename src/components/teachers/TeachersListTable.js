import React from 'react';
import TeachersListTableRow from './TeachersListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

export default function TeachersListTable(props) {
    const teachers = props.teachersList;
    const {t} = useTranslation();
    return (
        <table className="table-list" id="teacherList">
                    <thead>
                        <tr>
                        <th>{t('teachers.fields.firstName')}</th>
                        <th>{t('teachers.fields.lastName')}</th>
                        <th>{t('teachers.fields.mail')}</th>
                        <th>{t('teachers.fields.level')}</th>
                        <th>{t('teachers.fields.salary')}</th>
                        { isAuthenticated() && <th>{t('list.actions.actionTableName')}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => 
                            <TeachersListTableRow teacherData={teacher} key={teacher._id} />
                        )}
                    </tbody>
                </table>
    )
}