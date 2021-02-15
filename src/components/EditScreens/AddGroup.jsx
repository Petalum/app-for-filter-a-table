import React from 'react';
import { Formik, Form } from 'formik';
import { InputControl } from '../common/FormControls/FormControls';
import { validateLetters, validateGroups } from './validators/validators'
import SuccessMessage from '../common/Success/Success';
import { clearArrayFromIdenticalValues } from '../common/func/functions';
import PropTypes from 'prop-types';

const AddGroup = ({ submitFunc, keyName, successFlag, successInfo, initialObject, lastId }) => {
  const emptyInitialValues = {
    group: '',
    faculty: '',
    id: '',
  };
  return (<>
    <Formik
      initialValues={!initialObject ? emptyInitialValues : initialObject}
      onSubmit={
        async (values) => {
          values.group = values.group.split(',');
          values.group = clearArrayFromIdenticalValues(values.group);
          values.id = (+lastId + 1).toString();
          await submitFunc(keyName, values, 'faculty');
        }
      }
    >
      {({ errors, touched }) => (<Form>
        <InputControl labelName="Факультет" mark="faculty" validator={validateLetters} errors={errors} touched={touched} successFlag={successFlag} /><br />
        <label>Введите список групп в формате 1,2,3</label><br />
        <InputControl labelName={"Группы"} mark="group" validator={validateGroups} errors={errors} touched={touched} /><br /><br />
        {successFlag && <SuccessMessage message={successInfo} />}
        <button type="submit">ОК</button><br /><br />

      </Form>
      )}
    </Formik>

  </>
  )
}

AddGroup.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  initialObject: PropTypes.object,
  lastId: PropTypes.any,
}

export default AddGroup;