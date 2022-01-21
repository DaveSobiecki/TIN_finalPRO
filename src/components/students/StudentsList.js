import React from 'react';
import {getStudentsApiCall} from '../../apiCalls/studentsApiCalls';
import StudentsListTable from './StudentsListTable';

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

        if (err){
            content = <p>Błąd: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>Ładowanie danych Uczniów...</p>
        } else {
            content = <StudentsListTable studList = {students} />
        }

        return (
            <main>
                <h2>Nasi Uczniowie</h2>
                {content}
                <p className="success">{this.state.notice}</p>
                <p><a href="students/add" className="button-add">Dodaj Ucznia</a></p>
            </main>
        )
    }
}

export default StudentsList