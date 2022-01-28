import React from 'react';
import {getStudentsApiCall} from '../../apiCalls/studentsApiCalls';
import StudentsListTable from './StudentsListTable';
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

class StudentsList extends React.Component {

    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            err: null,
            isLoaded: false,
            students: [],
            notice: notice
        }
    }

    fetchStudentsList = () => {
        getStudentsApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    students: data,
                    err: null
                });
            },
            (err) => {
                this.setState({
                    isLoaded: true,
                    err
                })
            }
        )
    }

    componentDidMount = () => {
        this.fetchStudentsList()
    }

    render() {
        const {err, isLoaded, students} = this.state;
        let content;
        const { t } = this.props;
        if (err){
            content = <p>{t('form.details.error')}: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>{t('students.details.loading')}...</p>
        } else {
            content = <StudentsListTable studList = {students} />
        }

        return (
            <main>
                <h2>{t('students.details.ourStudents')}</h2>
                {content}
                <p className="success">{this.state.notice}</p>
                { isAuthenticated() && <p><a href="students/add" className="button-add">{t('students.form.add.btnLabel')}</a></p>}
            </main>
        )
    }
}

export default withTranslation() (StudentsList)