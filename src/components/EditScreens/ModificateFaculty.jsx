import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputControl } from '../common/FormControls/FormControls';
import { validateLetters } from './validators/validators'
import SuccessMessage from '../common/Success/Success';
import PropTypes from 'prop-types';

const ModificateFaculty = ({ submitFunc, changeCurrentInfoInFullStudentsList, keyName, successFlag, successInfo, initialObject, aim, lastId, deleteStudent }) => {

  const [deletionSuccessFlag, setDeletionSuccessFlag] = useState(false);

  return (<>
    <Formik
      initialValues={!initialObject ? {
        group: '',
        faculty: '',
        id: '',
      } : initialObject}
      onSubmit={
        async (values) => {
          switch (aim) {
            case 'add':
              values.id = (+lastId + 1).toString();
              await submitFunc(keyName, values, 'faculty', values.id, 'faculty', 'id');
              break;
            case 'change':
              await submitFunc(keyName, values, 'faculty', values.id, 'faculty', 'id');
              if (initialObject) {
                let valuesBag = new Map();
                valuesBag.set(initialObject.faculty, values.faculty);
                changeCurrentInfoInFullStudentsList('fullStudentsList', 'faculty', valuesBag);
              }
              break;
            case 'delete':
              await deleteStudent('fullStudentsList', initialObject.faculty, 'faculty');
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
        {aim === 'delete' ? <> {!deletionSuccessFlag && <label>Вы действительно хотите удалить факультет?</label>}</> :
          <><InputControl labelName="Факультет" mark="faculty" validator={validateLetters} errors={errors} touched={touched} /><br /></>
        }
        {successFlag && <SuccessMessage message={successInfo} />}
        {!deletionSuccessFlag && <button type="submit">ОК</button>}<br /><br />

      </Form>
      )}
    </Formik>

  </>
  )
}

ModificateFaculty.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  successFlag: PropTypes.bool.isRequired,
  successInfo: PropTypes.string,
  aim: PropTypes.string.isRequired,
  lastId: PropTypes.string,
  initialObject: PropTypes.object,
  changeCurrentInfoInFullStudentsList: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
}

export default ModificateFaculty;