import React from 'react';
import { BasicGroupInfo, InfoAfterTotalDeletion } from './EditInfo';
import ModificateGroup from './ModificateGroup';
import ModificateFaculty from './ModificateFaculty';
import ModalInfo from '../common/Modal';
import PropTypes from 'prop-types';

const ScreenOfGroupsList = ({ groupInfo, submitFunc, reserveSubmitFunc, keyName, successFlag, successInfo, changeSuccessFlag, aim, lastId, changeCurrentInfoInFullStudentsList, deleteStudent, deleteStudentsItemFindingInGroupsArray }) => {

  const changeGroupInModalScreen = (initial) => {
    return <>
      <ModificateGroup submitFunc={submitFunc} reserveSubmitFunc={reserveSubmitFunc} keyName={keyName} successFlag={successFlag} successInfo={successInfo} initialObject={initial} aim={aim} lastId={lastId}
        groupInfo={groupInfo} changeCurrentInfoInFullStudentsList={changeCurrentInfoInFullStudentsList} deleteStudentsItemFindingInGroupsArray={deleteStudentsItemFindingInGroupsArray} />
    </>
  }

  const changeFacultyInModalScreen = (initial) => {
    return <>
      <ModificateFaculty submitFunc={submitFunc} keyName={keyName} successFlag={successFlag} successInfo={successInfo} initialObject={initial} aim={aim} lastId={lastId}
        groupInfo={groupInfo} changeCurrentInfoInFullStudentsList={changeCurrentInfoInFullStudentsList} deleteStudent={deleteStudent} />
    </>
  }

  const getRightNames = (item, aim) => {
    switch (aim) {
      case 'change':
        return <>Изменить {item}</>
      case 'delete':
        return <>Удалить {item}</>
      default:
        return <>Внести исправления в {item}</>
    }
  }

  return (<>
    {groupInfo.length > 0 ? groupInfo.map((p, index) => {
      const buttonFacultyTitle = getRightNames("факультет", aim);
      const buttonGroupTitle = getRightNames("группу", aim);
      const groupForInitial = {
        group: p.group,
        faculty: p.faculty,
        id: p.id
      }
      const facultyForInitial = {
        faculty: p.faculty,
        id: p.id
      }
      const initialFaculty = changeFacultyInModalScreen(facultyForInitial);
      const initialGroup = changeGroupInModalScreen(groupForInitial);
      return <div key={index}>
        <div><BasicGroupInfo faculty={p.faculty} /></div>
        <div><ModalInfo buttonName={buttonFacultyTitle} modalTitle={buttonFacultyTitle} modalBody={initialFaculty} successFlag={successFlag} changeSuccessFlag={changeSuccessFlag} /></div>
        <div><ModalInfo buttonName={buttonGroupTitle} modalTitle={buttonGroupTitle} modalBody={initialGroup} successFlag={successFlag} changeSuccessFlag={changeSuccessFlag} /></div><br /><br />

      </div>
    }
    ) : <InfoAfterTotalDeletion successFlag={successFlag} errorMessage={"Список пуст"} successInfo={successInfo} />

    }
  </>
  )
}

ScreenOfGroupsList.propTypes = {
  groupInfo: PropTypes.array.isRequired,
  submitFunc: PropTypes.func.isRequired,
  reserveSubmitFunc: PropTypes.func,
  keyName: PropTypes.string.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  changeSuccessFlag: PropTypes.func.isRequired,
  aim: PropTypes.string.isRequired,
  lastId: PropTypes.any,
  changeCurrentInfoInFullStudentsList: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  deleteStudentsItemFindingInGroupsArray: PropTypes.func
}

export default ScreenOfGroupsList; 