import React from 'react';
import LessonsListTableRow from './LessonsListTableRow';
import { useTranslation } from 'react-i18next';

export default function LessonsListTable(props) {
    const lessonsList = props.lessonsList;
    const {t} = useTranslation();
    return (
        <table className="table-list" id="lessonentList">
                    <thead>
                        <tr>
                        <th>{t('lessons.fields.name')}</th>
                        <th>{t('lessons.fields.level')}</th>
                        <th>{t('lessons.fields.startHour')}</th>
                        <th>{t('lessons.fields.endHour')}</th>
                        <th>{t('lessons.fields.day')}</th>
                        <th>{t('list.actions.actionTableName')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessonsList.map(lesson => 
                            <LessonsListTableRow lessonData={lesson} key={lesson._id} />
                        )}
                    </tbody>
                </table>
    )
}