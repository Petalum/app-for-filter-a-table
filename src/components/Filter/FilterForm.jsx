import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CheckboxControl } from '../common/FormControls/FormControls';
import PropTypes from 'prop-types';
import s from './Filter.module.css'

const FilterForm = ({ initialObject, setFilteredStudentsList, keyName }) => {
   let [errorFlag, setErrorFlag] = useState(false);

   const cancelErrorFlag = () => {
      setErrorFlag(false);
   }

   const cancelFilter = () => {
      let emptyData = new Map();
      setFilteredStudentsList(keyName, 'filteredStudentsList', emptyData, false);
   }

   return (<div className={s.filter}>
      <Formik
         initialValues={!initialObject ? {
            surnames: [],
            numbers: []
         } : initialObject}

         onSubmit={
            async (values) => {
               setErrorFlag(false);
               let filterData = new Map();
               if (Array.isArray(values.groupSurnames) && values.groupSurnames.length) {
                  filterData.set('surname', values.groupSurnames)
               }

               if (Array.isArray(values.groupNumbers) && values.groupNumbers.length) {
                  filterData.set('group', values.groupNumbers)
               }

               if (filterData.size) {
                  await setFilteredStudentsList(keyName, 'filteredStudentsList', filterData, true);
               }
               else {
                  setErrorFlag(true);
               }
            }
         }
      >
         {({ values }) => (<Form>
            <div onClick={errorFlag ? cancelErrorFlag : null}>
               <h5>Фамилии</h5><br />
               {(values.surnames.length > 0) ? values.surnames.map((p, index) => {
                  let keyVal = p + index;
                  return <div key={keyVal}>
                     <CheckboxControl labelName={p} checkboxGroupName={'groupSurnames'} />
                  </div>
               }) : <label>Фамилии отсутствуют</label>}<br />
               <h5>Группы</h5><br />
               {(values.numbers.length > 0) ? values.numbers.map((p, index) => {
                  let keyVal = p + index;
                  return <div key={keyVal}>
                     <CheckboxControl labelName={p} checkboxGroupName={'groupNumbers'} />
                  </div>
               }) : <label>Номера групп отсутствуют</label>}
               <button type='submit'>Отфильтвовать</button><br />
               {errorFlag && <label>Вы не выбрали параметры для фильтра</label>} <br />
            </div>
         </Form>)}
      </Formik>
      <button onClick={cancelFilter}>Сбросить</button><br />
   </div>
   )
}

FilterForm.propTypes = {
   initialObject: PropTypes.object,
   setFilteredStudentsList: PropTypes.func.isRequired,
   keyName: PropTypes.string.isRequired,
}

export default FilterForm;