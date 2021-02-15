import React from 'react';
import '../src/App.css';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import store from './redux/redux-store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getStudents, addStudents, getColumnsStudentsNames, getFilteredStudentsList} from '../src/redux/func/studentsIntermediaryFunc';
import {getGroups, getColumnsGroupNames} from '../src/redux/func/groupsIntermediaryFunc';
import ListOfStudentsCover from './components/Students/ListOfStudents';
import ListOfGroupsCover from './components/Groups/ListOfGroups';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    }
  }

  componentDidMount() {
 // Если нужно очистить localStorage, можно убрать комментарий у строки ниже.
 // localStorage.clear();
    this.props.getStudents('fullStudentsList');
    this.props.getColumnsStudentsNames('studentsColumnsNames');
    this.props.getGroups('fullGroupsList');
    this.props.getColumnsGroupNames('groupsColumnsNames');
    this.props.getFilteredStudentsList('filteredStudentsList');  
}

  render() { 
    return (
    <div className="app-wrapper">
      <Navbar/>
      <div className='app-wrapper-content'>
      <Switch>
      <Route exact path='/'
              render={() => <Redirect to={'/students'} />} />
       <Route path='/students' render={() => <ListOfStudentsCover/>} />
       <Route path='/groups' render={() => <ListOfGroupsCover/>} /> 
       <Route path='*' render={() => <NotFound/>} />
      </Switch> 
      </div> 
    </div>
  );
  }
}

const mapStateToProps = (state) => ({
  availabilityFlag: state.studentsPage.availabilityFlag
 });

let AppContainer = compose(withRouter, connect(mapStateToProps, {getStudents, addStudents, getColumnsStudentsNames,  getGroups, getColumnsGroupNames, getFilteredStudentsList}))(App);

const MainApp = (props) => {
  return  <BrowserRouter>
       <Provider store={store}>
         <React.StrictMode>
           <AppContainer/>
         </React.StrictMode>
       </Provider>
     </BrowserRouter>
 }

export default MainApp;
