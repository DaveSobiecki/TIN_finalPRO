import React from 'react';
import getFormattedDate from '../../helpers/dateHelper';
import StudentDetailsDataRow from './StudentDetailsDataRow';

function StudentDetailsData(props){
    const stud = props.studData;
    return(
        <React.Fragment>
            <p>Imię: {stud.firstName}</p>
            <p>Nazwisko: {stud.lastName}</p>
            <p>Wiek: {stud.age}</p>
            <p>Poziom: {stud.level}</p>
            <p>Data dołączenia: {getFormattedDate(stud.date)}</p>
            <h2>Szczegóły Ucznia</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Nazwa Lekcji</th>
                        <th>Poziom</th>
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