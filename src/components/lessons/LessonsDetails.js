import React from 'react';
import {Link} from 'react-router-dom';
import {getLessonByIdApiCall} from '../../apiCalls/lessonsApiCalls';
import LessonsDetailsData from './LessonsDetailsData';

class LessonsDetails extends React.Component {
    constructor(props) {
        super(props);
        let {lessonId} = props.match.params;
        this.state = {
            err: null,
            isLoaded: false,
            lessonId: lessonId,
            lesson: null,
            message: null,
            student: null,
            teacher: null
        }
    }

    fetchLessonsDetails = () => {
        getLessonByIdApiCall(this.state.lessonId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        lesson: null,
                        message: data.message
                    })
                } else {
                    this.setState({
                        lesson: data,
                        message: null,
                        student: data.students,
                        teacher: data.teachers
                    })
                }
                this.setState({
                    isLoaded:true
                })
            },
            (err) => {
                this.setState({
                    isLoaded: true,
                    err
                })
            }
        )
    }

    componentDidMount() {
        this.fetchLessonsDetails()
    }

    render() {
        const { lesson, err, isLoaded, message, student, teacher } = this.state;
        let content;

        if(err) {
            content = <p>Błąd: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>Ładowanie danych Lekcji...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <LessonsDetailsData lessonData={lesson} studentData={student} teacherData={teacher}/>
        }

        return (
            <main>
                <h2>Lekcja Prywatna</h2>
                {content}
                <p><Link to="/lessons" className="form-button-cancel">Powrót</Link></p>
            </main>
        )
    }
}

export default LessonsDetails
