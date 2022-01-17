import React from 'react'
import Header from './components/fragments/Header'
import Navigation from './components/fragments/Navigation'
import MainContent from './components/fragments/MainContent'
import Footer from './components/fragments/Footer'
import StudentsList from './components/students/StudentsList'
import TeachersList from './components/teachers/TeachersList'
import LessonsList from './components/lessons/LessonsList'
import StudentDetails from './components/students/StudentDetails'
import TeacherDetails from './components/teachers/TeachersDetails'
import LessonDetails from './components/lessons/LessonsDetails'
import StudentsForm from './components/students/StudentsForm'
import LessonsForm from './components/lessons/LessonsForm'
import TeachersForm from './components/teachers/TeachersForm'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Header />
      <Navigation />
      <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/students" element={<StudentsList/>} />
        <Route exact path="/teachers" element={<TeachersList/>} />
        <Route exact path="/lessons" element={<LessonsList/>} />
        <Route exact path="/students/details/:studId" element={<StudentDetails/>} />
        <Route exact path="/teachers/details/:teacherId" element={<TeacherDetails/>} />
        <Route exact path="/lessons/details/:lessonId" element={<LessonDetails/>} />
        <Route exact path="/students/add" element={<StudentsForm/>} />
        <Route exact path="/lessons/add" element={<LessonsForm/>} />
        <Route exact path="/teachers/add" element={<TeachersForm/>} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;


// ----------------------------------------------------------------
// React Tutorial 1
// Zacznij od "Nawigacja między komponentami"
// ----------------------------------------------------------------