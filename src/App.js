import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/fragments/MainContent';
import Footer from './components/fragments/Footer';
import StudentsList from './components/students/StudentsList';
import TeachersList from './components/teachers/TeachersList';
import LessonsList from './components/lessons/LessonsList';
import StudentDetails from './components/students/StudentDetails';
import TeachersDetails from './components/teachers/TeachersDetails';
import LessonsDetails from './components/lessons/LessonsDetails';
import StudentsForm from './components/students/StudentsForm';
import LessonsForm from './components/lessons/LessonsForm';
import TeachersForm from './components/teachers/TeachersForm';
import LoginForm from './components/form/LoginForm';
import { getCurrentUser } from './helpers/authHelper';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      prevPath: ''
    }
  }

  handleLogin = (user) => {
    localStorage.setItem("user", user);
    this.setState({
      user: user
    });
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({
      user: undefined
    })
  }

  componentDidMount(){
    const currentUser = getCurrentUser();
    this.setState({
      user:currentUser
    })
  }

  render() {
    return (
      <Router>
      <div>
        <Header />
        <Navigation handleLogout={this.handleLogout} />
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

          <Route exact path="/login" render={(props) => ( <LoginForm handleLogin={this.handleLogin} />)} />
        </Switch>
        <Footer />
      </div>
      </Router>
    );
  }

}

export default App;