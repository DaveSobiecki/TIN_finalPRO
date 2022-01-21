import { React } from 'react';
import StudentsListTableRow from './StudentsListTableRow';


export default function StudentsListTable(props) {
    const students = props.studList; 
    return (
        <table className="table-list" id="studentList">
                    <thead>
                        <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th className="age-column">Wiek</th>
                        <th>Poziom</th>
                        <th className="date-column">Data Dołączenia</th>
                        <th>Akcje</th>
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