import React from 'react';
import {getTeacherByIdApiCall} from '../../apiCalls/teachersApiCalls';
import {Link} from 'react-router-dom';
import TeachersDetailsData from './TeachersDetailsData';
import {withTranslation} from 'react-i18next';

class TeachersDetails extends React.Component {
    constructor(props) {
        super(props);
        let {teacherId} = props.match.params;
        this.state = {
            err: null,
            isLoaded: false,
            teacherId: teacherId,
            teacher: null,
            message: null,
        }
    }

    fetchTeachersDetails = () => {
        getTeacherByIdApiCall(this.state.teacherId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        teacher: null,
                        message: data.message
                    })
                } else {
                    this.setState({
                        teacher: data,
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
        this.fetchTeachersDetails()
    }

    render() {
        const { teacher, err, isLoaded, message } = this.state;
        let content;
        const {t} = this.props;
        if(err) {
            content = <p>{t('teachers.details.error')}: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>{t('teachers.details.loading')}...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <TeachersDetailsData teacherData={teacher}/>
        }

        return (
            <main>
                <h2>{t('teachers.details.teacherDetails')}</h2>
                {content}
                <p><Link to="/teachers" className="form-button-cancel">{t('list.action.return')}</Link></p>
            </main>
        )
    }
}

export default withTranslation() (TeachersDetails)
