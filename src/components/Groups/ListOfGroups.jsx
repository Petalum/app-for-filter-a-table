import React from 'react';
import { getGroups, addGroup, changeGroupSuccessFlag, changeFaculty, changeGroups, deleteGroup } from '../../redux/func/groupsIntermediaryFunc';
import { changeCurrentInfoInFullStudentsList, deleteStudent, deleteStudentsItemFindingInGroupsArray } from '../../redux/func/studentsIntermediaryFunc';
import { connect } from 'react-redux';
import Table from '../common/Table';
import ModalInfo from '../common/Modal';
import ScreenOfGroupsList from '../EditScreens/ScreenOfGroupsList';
import AddGroup from '../EditScreens/AddGroup';
import { getKeys, getCellsNames } from '../common/func/functions';
import PropTypes from 'prop-types';

class ListOfGroups extends React.Component {
  constructor(props) {
    super(props);
    this.tableCellsNames = [];
    this.modificateGroups = [];
    this.keysForTable = [];
    this.lastId = null;
    this.state = {
      flag: false
    }
  }

  componentDidMount() {
    new Promise((resolve) => resolve(setTimeout(() => this.props.changeGroupSuccessFlag(false), 1000)));
  }

  componentDidUpdate(prevProps) {
    if (this.props.groups !== prevProps.groups || this.props.successFlag !== prevProps.successFlag) {
      this.modificateGroups = this.getCellsInfo(this.props.groups);
      this.setState({
        flag: !this.state.flag,
      });
    }
  }

  addGroupsListOfModalScreen() {
    return <>
      <AddGroup groupInfo={this.props.groups} modificateGroups={this.modificateGroups} submitFunc={this.props.addGroup} keyName={'fullGroupsList'} buttonName={"Добавить"} successFlag={this.props.successFlag} successInfo={"Информация о факультете успешно добавлена в список"} aim={'add'} lastId={this.lastId} />
    </>
  }

  changeGroupOfModalScreen() {
    return <>
      <ScreenOfGroupsList groupInfo={this.props.groups} modificateGroups={this.modificateGroups} submitFunc={this.props.changeFaculty} keyName={'fullGroupsList'}
        buttonName={"Изменить"} successFlag={this.props.successFlag} successInfo={"Информация о факультете успешно изменена"} changeSuccessFlag={this.props.changeGroupSuccessFlag}
        aim={'change'} lastId={this.lastId} changeCurrentInfoInFullStudentsList={this.props.changeCurrentInfoInFullStudentsList} deleteStudent={this.props.deleteStudent} />
    </>
  }

  deleteGroupOfModalScreen() {
    return <>
      <ScreenOfGroupsList groupInfo={this.props.groups} modificateGroups={this.modificateGroups} submitFunc={this.props.deleteGroup} reserveSubmitFunc={this.props.changeFaculty} keyName={'fullGroupsList'}
        buttonName={"Удалить"} successFlag={this.props.successFlag} successInfo={"Информация успешно удалена из списка"} changeSuccessFlag={this.props.changeGroupSuccessFlag}
        aim={'delete'} lastId={this.lastId} changeCurrentInfoInFullStudentsList={this.props.changeCurrentInfoInFullStudentsList} deleteStudent={this.props.deleteStudent} deleteStudentsItemFindingInGroupsArray={this.props.deleteStudentsItemFindingInGroupsArray} />
    </>
  }

  getCellsInfo(arr) {
    let arrOfCellsInfo = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let [key, value] of Object.entries(arr[i])) {
        if (key === 'group') {
          value.map(p => {
            count++;
            arrOfCellsInfo.push({
              'id': count,
              'group': p,
              'faculty': arr[i].faculty,
            })
          })
        }
      }
    }
    return arrOfCellsInfo;
  }

  render() {
    if (this.props.groups.length) {
      this.modificateGroups = this.getCellsInfo(this.props.groups);
      this.keysForTable = getKeys(this.props.groups);
    }

    this.lastId = this.props.groups.length && this.props.groups[this.props.groups.length - 1].id;

    if (this.keysForTable) {
      this.tableCellsNames = getCellsNames(this.keysForTable, this.props.columnsNames);
    }
    const modalBodyContentOfAddingGroup = this.addGroupsListOfModalScreen();
    const modalBodyOfChangingGroup = this.changeGroupOfModalScreen();
    const modalBodyOfDeletionGroup = this.deleteGroupOfModalScreen();
    return <div>
      <Table cellsInfo={this.modificateGroups} cellsNames={this.tableCellsNames} />
      <ModalInfo buttonName={"Добавить"} modalTitle={"Добавить группу"} modalBody={modalBodyContentOfAddingGroup} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeGroupSuccessFlag} /><br />
      <ModalInfo buttonName={"Изменить"} modalTitle={"Изменить информацию о группе"} modalBody={modalBodyOfChangingGroup} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeGroupSuccessFlag} /><br />
      <ModalInfo buttonName={"Удалить"} modalTitle={"Удалить группу из списка"} modalBody={modalBodyOfDeletionGroup} successFlag={this.props.successFlag} changeSuccessFlag={this.props.changeGroupSuccessFlag} />

    </div>
  }
}

ListOfGroups.propTypes = {
  groups: PropTypes.array.isRequired,
  columnsNames: PropTypes.array.isRequired,
  successFlag: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  groups: state.groupsPage.groups,
  columnsNames: state.groupsPage.columnsNames,
  successFlag: state.groupsPage.successFlag
});

const ListOfGroupsCover = connect(mapStateToProps, {
  getGroups, addGroup, changeGroupSuccessFlag, changeFaculty, changeGroups, deleteGroup, changeCurrentInfoInFullStudentsList,
  deleteStudent, deleteStudentsItemFindingInGroupsArray
})(ListOfGroups);

export default ListOfGroupsCover;