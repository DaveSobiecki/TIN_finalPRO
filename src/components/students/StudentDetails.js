import React from 'react';
import {getStudentByIdApiCall} from '../../apiCalls/studentsApiCalls';
import {Link} from 'react-router-dom';
import StudentDetailsData from './StudentDetailsData';
import {withTranslation} from 'react-i18next';

class StudentDetails extends React.Component {
    constructor(props) {
        super(props);
        let {studId} = props.match.params;
        this.state = {
            err: null,
            isLoaded: false,
            studId: studId,
            student: null,
            message: null,
        }
    }

    fetchStudentsDetails = () => {
        getStudentByIdApiCall(this.state.studId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        student: null,
                        message: data.message
                    })
                } else {
                    this.setState({
                        student: data,
                        message: null
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
        this.fetchStudentsDetails()
    }

    render() {
        const { student, err, isLoaded, message } = this.state;
        let content;
        const {t} = this.props;
        if(err) {
            content = <p>{t('students.details.error')}: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>{t('students.details.loading')}: {}</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <StudentDetailsData studData={student}/>
        }

        return (
            <main>
                <h2>{t('students.details.studentDetails')}</h2>
                {content}
                <p><Link to="/students" className="form-button-cancel">{t('list.action.return')}</Link></p>
            </main>
        )
    }
}

export default withTranslation() (StudentDetails)
