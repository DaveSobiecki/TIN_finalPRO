import React from 'react';
import LessonsDetailsDataRow from './LessonsDetailsDataRow';

function LessonsDetailsData(props){
    const lesson = props.lessonData;
    const student = props.studentData;
    const teacher = props.teacherData;
    return(
        <React.Fragment>
            <p>Nazwa: {lesson.name}</p>
            <p>Poziom: {lesson.level}</p>
            <p>Godzina rozpoczęcia: {lesson.startHour}</p>
            <p>Godzina zakończenia: {lesson.endHour}</p>
            <p>Dzień tygodnia: {lesson.day}</p>
            <h2>Szczegóły Lekcji</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Uczeń</th>
                        <th>Nauczyciel</th>
                    </tr>
                </thead>
                <tbody>
                    {<LessonsDetailsDataRow lessonData={lesson} studentData={student} teacherData={teacher} />}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default LessonsDetailsData