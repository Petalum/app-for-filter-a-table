import React from 'react';
import { getStudents, addStudents, changeStudents, changeSuccessFlag, deleteStudent, setFilteredStudentsList } from '../../redux/func/studentsIntermediaryFunc';
import { connect } from 'react-redux';
import Table from '../common/Table';
import ModalInfo from '../common/Modal';
import ModificateStudent from '../EditScreens/ModificateStudent';
import FindStudent from '../EditScreens/FindStudent';
import FiltersContainer from '../Filter/FiltersContainer';
import { getKeys, getCellsNames } from '../common/func/functions';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/Errors/ErrorMessage';

class ListOfStudents extends React.Component {
  constructor(props) {
    super(props);
    this.tableCellsNames = [];
    this.warning = null;
    this.lastId = null;
    this.state = {
      flag: false
    }
  }

  componentDidMount() {
    new Promise((resolve) => resolve(setTimeout(() => this.props.changeSuccessFlag(false), 1000)));
    if (this.props.filteredFlag || this.props.filteredList.length) {
      this.warning = 1;
      this.setState({
        flag: !this.state.flag,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.students !== prevProps.students || this.props.successFlag !== prevProps.successFlag || this.props.filteredFlag !== prevProps.filteredFlag) {
      this.setState({
        flag: !this.state.flag,
      });
    }

    if(this.props.filteredList !== prevProps.filteredList) {
      this.warning = null;
      this.setState({
        flag: !this.state.flag,
      });
    }
  }

  getAddItemModalScreen() {
    return <>
      <ModificateStudent submitFunc={this.props.addStudents} groupInfo={this.props.groups} keyName={'fullStudentsList'} successFlag={this.props.successFlag} successInfo={"Студент успешно добавлен в список"} aim={'add'} lastId={this.lastId} />
    </>
  }

  changeStudentOfModalScreen() {
    return <>
      <FindStudent students={this.props.students} groupInfo={this.props.groups} submitFunc={this.props.changeStudents} keyName={'fullStudentsList'} successFlag={this.props.successFlag} successInfo={"Информация о студенте успешно изменена"} changeSuccessFlag={this.props.changeSuccessFlag} aim={'change'} lastId={this.lastId} />
    </>
  }

  deleteStudentOfModalScreen() {
    return <>
      <FindStudent students={this.props.students} groupInfo={this.props.groups} submitFunc={this.props.deleteStudent} keyName={'fullStudentsList'} successFlag={this.props.successFlag} successInfo={"Студент успешно удален из списка"} changeSuccessFlag={this.props.changeSuccessFlag} aim={'delete'} lastId={this.lastId} />
    </>
  }

  getCellsInfo() {
    if (this.props.filteredFlag || this.props.filteredList.length) {
      return this.props.filteredList;
    }

    return this.props.students;
  }

  render() {
    this.lastId = this.props.students.length && this.props.students[this.props.students.length - 1].id;
    const keysForTable = getKeys(this.props.students);
    if (keysForTable) {
      this.tableCellsNames = getCellsNames(keysForTable, this.props.columnsNames);
    }
    const modalBodyContentOfAddingStudent = this.getAddItemModalScreen();
    const modalBodyOfChangingStudent = this.changeStudentOfModalScreen();
    const modalBodyOfDeletionStudent = this.deleteStudentOfModalScreen();
    const getCells = this.getCellsInfo();

    return <div className="content">
      <Table cellsInfo={getCells} cellsNames={this.tableCellsNames} arrOfKeys={keysForTable} />
      <div className="content__modalNavigation">
        <div>
          <FiltersContainer students={this.props.students} groups={this.props.groups} keyName={'fullStudentsList'} setFilteredStudentsList={this.props.setFilteredStudentsList} />
        </div>
        <div>
          <ModalInfo buttonName={"Добавить"} modalTitle={"Добавить студента в список"} modalBody={modalBodyContentOfAddingStudent} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeSuccessFlag} /><br />
        </div>
        <div>
          <ModalInfo buttonName={"Изменить"} modalTitle={"Изменить информацию в списке студентов"} modalBody={modalBodyOfChangingStudent} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeSuccessFlag} /><br />
        </div>
        <div>
          <ModalInfo buttonName={"Удалить"} modalTitle={"Удалить студента из списка"} modalBody={modalBodyOfDeletionStudent} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeSuccessFlag} />
        </div>
      </div>
      {this.warning && <ErrorMessage message="Данные фильтра могли устареть" />}
    </div>

  }
}

ListOfStudents.propTypes = {
  students: PropTypes.array.isRequired,
  columnsNames: PropTypes.array.isRequired,
  successFlag: PropTypes.bool.isRequired,
  filteredList: PropTypes.array.isRequired,
  filteredFlag: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  students: state.studentsPage.students,
  groups: state.groupsPage.groups,
  columnsNames: state.studentsPage.columnsNames,
  successFlag: state.studentsPage.successFlag,
  filteredList: state.studentsPage.filteredList,
  filteredFlag: state.studentsPage.filteredFlag
});

const ListOfStudentsCover = connect(mapStateToProps, { getStudents, addStudents, changeSuccessFlag, changeStudents, deleteStudent, setFilteredStudentsList })(ListOfStudents);

export default ListOfStudentsCover;