import React from 'react';
import {getTeachersApiCall} from '../../apiCalls/teachersApiCalls';
import TeachersListTable from './TeachersListTable';
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

class TeachersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoaded: false,
            teachers: []
        }
    }

    fetchTeachersList = () => {
        getTeachersApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    teachers: data,
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
        this.fetchTeachersList()
    }

    render() {
        const {err, isLoaded, teachers} = this.state;
        let content;
        const { t } = this.props;
        if (err){
            content = <p>{t('form.details.error')}: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>{t('teachers.details.loading')}...</p>
        } else {
            content = <TeachersListTable teachersList = {teachers} />
        }

        return (
            <main>
                <h2>{t('teachers.details.ourTeachers')}</h2>
                {content}
                { isAuthenticated() && <p><a href="teachers/add" className="button-add">{t('teachers.form.add.btnLabel')}</a></p>}
            </main>
        )
    }
}

export default withTranslation() (TeachersList)