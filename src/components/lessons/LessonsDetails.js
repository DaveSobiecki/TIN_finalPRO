import React from 'react';
import {Link} from 'react-router-dom';
import {getLessonByIdApiCall} from '../../apiCalls/lessonsApiCalls';
import LessonsDetailsData from './LessonsDetailsData';
import {withTranslation} from 'react-i18next';

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
        const {t} = this.props;
        if(err) {
            content = <p>{t('lessons.details.error')}: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>{t('lessons.details.loading')}...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <LessonsDetailsData lessonData={lesson} studentData={student} teacherData={teacher}/>
        }

        return (
            <main>
                <h2>{t('lessons.details.privateLesson')}</h2>
                {content}
                <p><Link to="/lessons" className="form-button-cancel">{t('list.actions.return')}</Link></p>
            </main>
        )
    }
}

export default withTranslation() (LessonsDetails)
