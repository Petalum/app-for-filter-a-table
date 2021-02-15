import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputControl, CheckboxControl } from '../common/FormControls/FormControls';
import { validateGroups } from './validators/validators';
import SuccessMessage from '../common/Success/Success';
import ErrorMessage from '../common/Errors/ErrorMessage';
import { passCurrentItemsInArray, comparePreviousAndFreshValues, clearArrayFromIdenticalValues } from '../common/func/functions';
import PropTypes from 'prop-types';

const ModificateGroup = ({ submitFunc, reserveSubmitFunc, keyName, successFlag, successInfo, initialObject, changeCurrentInfoInFullStudentsList, aim, deleteStudentsItemFindingInGroupsArray }) => {

  let [errorFlag, setError] = useState(false);

  const removeErrorFlag = () => {
    setError(false);
  }

  return (<>
    <Formik
      initialValues={!initialObject ? {
        group: [],
        faculty: '',
        id: '',
      } : initialObject}

      onSubmit={
        async (values) => {
          switch (aim) {
            case 'change':
              values.group = values.group.split(',');
              values.group = clearArrayFromIdenticalValues(values.group);
              let compareResult = [];
              if (initialObject) {
                if (values.group.length === initialObject.group.length) {
                  compareResult[0] = comparePreviousAndFreshValues(initialObject.group, values.group);
                  if (!compareResult[0].size) {
                    setError("Новые данные совпадают с предыдущими");
                    return null;
                  }
                }
                if (values.group.length < initialObject.group.length) {
                  setError("Неверная длина строки");
                  return null;
                }
              }
              await submitFunc(keyName, values, 'group', values.id, 'group', 'id');
              if (compareResult[0].size) {
                changeCurrentInfoInFullStudentsList('fullStudentsList', 'group', compareResult[0], 'faculty', initialObject.faculty);
              }
              break;
            case 'delete':
              if (!values.checked.length) {
                setError("Выберите группы для удаления");
                return null;
              }
              values.group = passCurrentItemsInArray(values.group, values.checked);
              await reserveSubmitFunc(keyName, values, 'group', values.id, 'group', 'id');
              deleteStudentsItemFindingInGroupsArray('fullStudentsList', 'group', values.checked, 'faculty', initialObject.faculty);
              break;
            default:
              return null;
          }
        }
      }

    >
      {({ errors, touched, values }) => (<Form>
        <div onClick={errorFlag ? removeErrorFlag : null}>
          {aim === 'change' && <div> <label>Измените названия групп факультета "{values.faculty}", сохраняя формат 1,2,3 и порядок групп. Новые группы вводите в конце. </label><br /><br />
            <InputControl labelName={"Группы"} mark="group" validator={validateGroups} errors={errors} touched={touched} /><br /><br />
          </div>}

          {aim === 'delete' && <>Факультет: {values.faculty} <br />
            {values.group.length ?
              values.group.map((p, index) => <div key={p}><CheckboxControl labelName={p} checkboxGroupName={'checked'} /><br /></div>) :
              <div>У данного факультета не набраны группы</div>}</>}

          {successFlag && <SuccessMessage message={successInfo} />}
          {errorFlag && <ErrorMessage message={errorFlag} />}
          {(aim !== 'delete' || (aim === 'delete' && values.group.length > 0)) && <button type="submit">ОК</button>} <br /><br />
        </div>
      </Form>

      )}
    </Formik>

  </>
  )
}

ModificateGroup.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  reserveSubmitFunc: PropTypes.func,
  keyName: PropTypes.string.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  initialObject: PropTypes.object,
  changeSuccessFlag: PropTypes.func,
  aim: PropTypes.string.isRequired,
  lastId: PropTypes.string,
  changeCurrentInfoInFullStudentsList: PropTypes.func.isRequired,
  deleteStudentsItemFindingInGroupsArray: PropTypes.func
}

export default ModificateGroup;