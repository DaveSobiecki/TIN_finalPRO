import React from 'react';
import {getLessonsListApiCall} from '../../apiCalls/lessonsApiCalls';
import LessonsListTable from './LessonsListTable';
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

class LessonsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoaded: false,
            lessons: []
        }
    }

    fetchLessonsList = () => {
        getLessonsListApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    lessons: data,
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
        this.fetchLessonsList()
    }

    render() {
        const {err, isLoaded, lessons} = this.state;
        let content;
        const { t } = this.props;
        if (err){
            content = <p>{t('form.details.error')}: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>{t('lessons.details.loading')}...</p>
        } else {
            content = <LessonsListTable lessonsList = {lessons} />
        }

        return (
            <main>
                <h2>{t('lessons.details.privateLessons')}</h2>
                {content}
                { isAuthenticated() && <p><a href="lessons/add" className="button-add">{t('lessons.form.add.btnLabel')}</a></p>}
            </main>
        )
    }
}

export default withTranslation() (LessonsList)