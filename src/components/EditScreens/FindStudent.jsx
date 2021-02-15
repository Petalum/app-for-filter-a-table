import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { InputControl } from '../common/FormControls/FormControls';
import { validateLetters } from './validators/validators'
import { BasicStudentInfo, InfoAfterTotalDeletion } from './EditInfo';
import ModificateStudent from './ModificateStudent';
import ModalInfo from '../common/Modal';
import PropTypes from 'prop-types';

const FindStudent = ({ students, submitFunc, keyName, successFlag, successInfo, changeSuccessFlag, aim, lastId, groupInfo }) => {

  let [searchedStudents, setSearchedStudents] = useState(null);
  let [surnameInInput, setSurname] = useState(null);
  let [flag, setFlag] = useState(false);

  const searchStudent = (arr, surname) => {
    let surnames = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].surname.toLowerCase() === surname.toLowerCase()) {
        surnames.push(arr[i]);
      }
    }
    return surnames;
  }

  useEffect(() => {
    if (surnameInInput) {
      const searchList = searchStudent(students, surnameInInput);
      setSearchedStudents(searchList);
    }
  }, [students]);


  const changeInfoInModalScreen = (initial) => {
    return <>
      <ModificateStudent submitFunc={submitFunc} keyName={keyName} successFlag={successFlag} successInfo={successInfo} initialObject={initial} aim={aim} lastId={lastId} groupInfo={groupInfo} />
    </>
  }

  return (<>
    <Formik
      initialValues={{
        searchSurname: '',
      }}
      onSubmit={
        (values) => {
          setSurname(values.searchSurname);
          const searchList = searchStudent(students, values.searchSurname);
          setSearchedStudents(searchList);
          setFlag(true);
        }
      }
    >
      {({ errors, touched, values }) => (<Form>
        <InputControl labelName="Фамилия" mark="searchSurname" validator={validateLetters} errors={errors} touched={touched} /><br />
        <button type="submit">Поиск</button><br /><br />
        {flag && (searchedStudents.length > 0 ?
          searchedStudents.map((p, index) => {
            const initial = changeInfoInModalScreen({
              name: p.name,
              surname: p.surname,
              patronymic: p.patronymic,
              birthday: p.birthday,
              group: p.group,
              faculty: p.faculty,
              id: p.id,
            });
            let keyValue = p.id + index + 1;
            return <div key={keyValue}>
              <BasicStudentInfo surname={p.surname} name={p.name} patronymic={p.patronymic} birthday={p.birthday} group={p.group} faculty={p.faculty} />
              {aim === 'change' && <ModalInfo buttonName={"Изменить"} modalTitle={"Изменить информацию о студенте"} modalBody={initial} successFlag={successFlag} changeSuccessFlag={changeSuccessFlag} />}<br />
              {aim === 'delete' && <ModalInfo buttonName={"Удалить"} modalTitle={"Удалить студента из списка"} modalBody={initial} successFlag={successFlag} changeSuccessFlag={changeSuccessFlag} />}<br />
            </div>
          }) : <div><InfoAfterTotalDeletion successFlag={successFlag} errorMessage={"Поиск не дал результатов"} successInfo={successInfo} /></div>)
        }
      </Form>
      )}
    </Formik>

  </>
  )
}

FindStudent.propTypes = {
  students: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  changeSuccessFlag: PropTypes.func.isRequired,
  aim: PropTypes.string.isRequired,
  lastId: PropTypes.any,
  groupInfo: PropTypes.array.isRequired
}

export default FindStudent; 