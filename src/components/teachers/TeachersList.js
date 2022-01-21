import React from 'react';
import {getTeachersApiCall} from '../../apiCalls/teachersApiCalls';
import TeachersListTable from './TeachersListTable';

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

        if (err){
            content = <p>Błąd: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>Ładowanie danych Uczniów...</p>
        } else {
            content = <TeachersListTable teachersList = {teachers} />
        }

        return (
            <main>
                <h2>Nasi Nauczyciele</h2>
                {content}
                <p><a href="teachers/add" className="button-add">Dodaj Nauczyciela</a></p>
            </main>
        )
    }
}

export default TeachersList