import React from 'react';
import {getTeacherByIdApiCall} from '../../apiCalls/teachersApiCalls';
import {Link} from 'react-router-dom';
import TeachersDetailsData from './TeachersDetailsData'

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

        if(err) {
            content = <p>Błąd: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>Ładowanie danych Nauczyciela...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <TeachersDetailsData teacherData={teacher}/>
        }

        return (
            <main>
                <h2>Szczegóły Ucznia</h2>
                {content}
                <p><Link to="/teachers" className="form-button-cancel">Powrót</Link></p>
            </main>
        )
    }
}

export default TeachersDetails
