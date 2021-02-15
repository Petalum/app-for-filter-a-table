import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputControl, RadioControl } from '../common/FormControls/FormControls';
import { compareObjects } from '../common/func/functions'
import { validateDate, validateLetters } from './validators/validators'
import SuccessMessage from '../common/Success/Success';
import ErrorMessage from '../common/Errors/ErrorMessage';
import PropTypes from 'prop-types';

const ModificateStudent = ({ submitFunc, keyName, successFlag, successInfo, initialObject, aim, lastId, groupInfo }) => {
  const [deletionSuccessFlag, setDeletionSuccessFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [checkedFaculty, saveCheckedFaculty] = useState(null);
  const [checkedGroup, saveCheckedGroup] = useState(null);

  const saveFacultyInfo = (faculty, group) => {
    saveCheckedFaculty(faculty);
    saveCheckedGroup(group);
  }

  const removeErrorFlag = () => {
    setErrorFlag(false);
  }

  return (<>
    <Formik
      initialValues={!initialObject ? {
        name: '',
        surname: '',
        patronymic: '',
        birthday: '',
        group: '',
        faculty: '',
        id: '',
      } : initialObject}
      onSubmit={
        async (values) => {
          if (aim !== 'delete') {
            if (!checkedFaculty || !checkedGroup) {
              setErrorFlag("Выберите группу");
              return null;
            }
            values.faculty = checkedFaculty;
            values.group = checkedGroup;
          }
          switch (aim) {
            case 'add':
              values.id = (+lastId + 1).toString();
              await submitFunc(keyName, values);
              break;
            case 'change':
              if (initialObject) {
                const identicalResult = compareObjects(initialObject, values);
                if (!identicalResult.length) {
                  setErrorFlag("Данные остались без изменений");
                  return null;
                }
              }
              await submitFunc(keyName, values, values.id, 'id');
              break;
            case 'delete':
              await submitFunc(keyName, values.id, 'id');
              setDeletionSuccessFlag(true);
              break;
            default:
              return null;
          }
        }
      }
    >
      {({ errors, touched }) => (<Form>
        <div onClick={errorFlag ? removeErrorFlag : null}>
          {aim === 'delete' ? <>
            {!deletionSuccessFlag && <label>Вы действительно хотите удалить студента из списка?</label>}
          </> :
            <> <InputControl labelName="Имя" mark="name" validator={validateLetters} errors={errors} touched={touched} />
              <InputControl labelName="Фамилия" mark="surname" validator={validateLetters} errors={errors} touched={touched} />
              <InputControl labelName="Отчество" mark="patronymic" validator={validateLetters} errors={errors} touched={touched} />
              <InputControl labelName="Дата Рождения (в формате YYYY-MM-DD)" mark="birthday" validator={validateDate} errors={errors} touched={touched} />
              <label>Группа:</label>
              {aim === 'change' && initialObject && <label>{initialObject.group} {initialObject.faculty}</label>}
              <br />
              {groupInfo.map((p, index) => {
                let keyVal = p.id + index;
                let countForKey = 0;
                return <div key={keyVal}>
                  {p.group.map((g, index) => {
                    let keyValue = g + index + countForKey; countForKey++;
                    return <div key={keyValue}><RadioControl labelName={g + ' ' + p.faculty} radioGroupName={'groupsNumbers'} clickFunc={() => saveFacultyInfo(p.faculty, g)} /><br /></div>
                  })}
                </div>
              })}
            </>
          }
          {successFlag && <SuccessMessage message={successInfo} />}
          {errorFlag && <ErrorMessage message={errorFlag} />}
          {!deletionSuccessFlag && <button type="submit">ОК</button>}<br /><br />
        </div>
      </Form>
      )}
    </Formik>

  </>
  )
}

ModificateStudent.propTypes = {
  groupInfo: PropTypes.array.isRequired,
  submitFunc: PropTypes.func.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  initialObject: PropTypes.object,
  lastId: PropTypes.any,
  aim: PropTypes.string.isRequired,
}

export default ModificateStudent;