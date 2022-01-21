import React from 'react'
import Header from './components/fragments/Header'
import Navigation from './components/fragments/Navigation'
import MainContent from './components/fragments/MainContent'
import Footer from './components/fragments/Footer'
import StudentsList from './components/students/StudentsList'
import TeachersList from './components/teachers/TeachersList'
import LessonsList from './components/lessons/LessonsList'
import StudentDetails from './components/students/StudentDetails'
import TeachersDetails from './components/teachers/TeachersDetails'
import LessonsDetails from './components/lessons/LessonsDetails'
import StudentsForm from './components/students/StudentsForm'
import LessonsForm from './components/lessons/LessonsForm'
import TeachersForm from './components/teachers/TeachersForm'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <Header />
      <Navigation />
      <Switch>
        <Route exact path="/" component={MainContent} />
        <Route exact path="/students" component={StudentsList} />
        <Route exact path="/teachers" component={TeachersList} />
        <Route exact path="/lessons" component={LessonsList} />
        <Route exact path="/students/details/:studId" component={StudentDetails} />
        <Route exact path="/teachers/details/:teacherId" component={TeachersDetails} />
        <Route exact path="/lessons/details/:lessonId" component={LessonsDetails} />
        <Route exact path="/students/add" component={StudentsForm} />
        <Route exact path="/lessons/add" component={LessonsForm} />
        <Route exact path="/teachers/add" component={TeachersForm} />
        <Route exact path="/students/edit/:studId" component={StudentsForm} />
        <Route exact path="/teachers/edit/:teacherId" component={TeachersForm} />
        <Route exact path="/lessons/edit/:lessonId" component={LessonsForm} />
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;