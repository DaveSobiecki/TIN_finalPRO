import React from 'react';
import TeachersListTableRow from './TeachersListTableRow';


export default function TeachersListTable(props) {
    const teachers = props.teachersList;
    return (
        <table className="table-list" id="teacherList">
                    <thead>
                        <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>E-mail</th>
                        <th>Poziom</th>
                        <th>Pensja</th>
                        <th>Akcje</th>
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