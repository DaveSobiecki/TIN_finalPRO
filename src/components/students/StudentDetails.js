import React from 'react';
import {getStudentByIdApiCall} from '../../apiCalls/studentsApiCalls';
import {Link} from 'react-router-dom';
import StudentDetailsData from './StudentDetailsData'

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

        if(err) {
            content = <p>Błąd: {err.message}</p>;
        } else if(!isLoaded){
            content = <p>Ładowanie danych Ucznia</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <StudentDetailsData studData={student}/>
        }

        return (
            <main>
                <h2>Szczegóły Ucznia</h2>
                {content}
                <p><Link to="/students" className="form-button-cancel">Powrót</Link></p>
            </main>
        )
    }
}

export default StudentDetails
