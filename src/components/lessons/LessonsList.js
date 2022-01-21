import React from 'react';
import {getLessonsListApiCall} from '../../apiCalls/lessonsApiCalls';
import LessonsListTable from './LessonsListTable';

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

        if (err){
            content = <p>Błąd: {err.message}</p>;
        } else if (!isLoaded){
            content = <p>Ładowanie danych Nauczycieli...</p>
        } else {
            content = <LessonsListTable lessonsList = {lessons} />
        }

        return (
            <main>
                <h2>Prywatne Lekcje</h2>
                {content}
                <p><a href="lessons/add" className="button-add">Dodaj Lekcję</a></p>
            </main>
        )
    }
}

export default LessonsList