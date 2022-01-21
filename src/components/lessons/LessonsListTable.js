import React from 'react';
import LessonsListTableRow from './LessonsListTableRow';


export default function LessonsListTable(props) {
    const lessonsList = props.lessonsList;
    return (
        <table className="table-list" id="lessonentList">
                    <thead>
                        <tr>
                        <th>Nazwa Lekcji</th>
                        <th>Poziom</th>
                        <th>Początek zajęć</th>
                        <th>Koniec zajęć</th>
                        <th>Dzień tygodnia</th>
                        <th>Akcje</th>
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