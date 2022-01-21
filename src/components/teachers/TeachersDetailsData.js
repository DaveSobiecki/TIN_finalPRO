import React from 'react';
import TeachersDetailsDataRow from './TeachersDetailsDataRow';

function TeacherDetailsData(props){
    const teacher = props.teacherData;
    return(
        <React.Fragment>
            <p>Imię: {teacher.firstName}</p>
            <p>Nazwisko: {teacher.lastName}</p>
            <p>E-mail: {teacher.mail}</p>
            <p>Poziom: {teacher.level}</p>
            <p>Pensja: {teacher.salary}</p>
            <h2>Szczegóły Nauczyciela</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Nazwa Lekcji</th>
                        <th>Poziom</th>
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