import { studentsLocalStorage } from '../../api/StudentsApi';
import getListOfStudents from '../../mock/students.js';
import getListOfColumnsNames from '../../mock/studentsTableColumns';
import { saveStudentsSuccess, saveColumnsNamesForStudentsTableSuccess, saveStudentsSuccessFlag, saveFilteredStudentsSuccess, saveFilteredFlag } from '../actions/actionsOfStudentsReducer';

export const getStudents = (key) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.getCurrentItem(key);
      if (response) {
        dispatch(saveStudentsSuccess(response));
      }
      else {
        const result = studentsLocalStorage.setItemWithoutChecking(key, getListOfStudents);
        dispatch(saveStudentsSuccess(result));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const addStudents = (key, value) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.setCurrentItem(key, value);
      dispatch(saveStudentsSuccess(response));
    }
    catch (error) {
      alert(error);
    }
  }
}

export const changeStudents = (key, value, markValue, mark) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.changeCurrentItem(key, value, markValue, mark);
      if (response !== null) {
        dispatch(saveStudentsSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const changeCurrentInfoInFullStudentsList = (commonKey, markForChangingKey, valuesBag, markForControlKey, markForControlValue) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.changeCurrentInfo(commonKey, markForChangingKey, valuesBag, markForControlKey, markForControlValue);
      if (response !== null) {
        dispatch(saveStudentsSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const getColumnsStudentsNames = (key) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.getCurrentItem(key);
      if (response) {
        dispatch(saveColumnsNamesForStudentsTableSuccess(response));
      }
      else {
        const result = studentsLocalStorage.setItemWithoutChecking(key, getListOfColumnsNames);
        dispatch(saveColumnsNamesForStudentsTableSuccess(result));
      }

    }
    catch (error) {
      alert(error);
    }
  }
}

export const addColumsNames = (key, value) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.setCurrentItem(key, value);
      dispatch(saveColumnsNamesForStudentsTableSuccess(response));
    }
    catch (error) {
      alert(error);
    }
  }
}

export const deleteStudent = (key, markValue, mark) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.deleteItem(key, markValue, mark);
      if (response !== null) {
        dispatch(saveStudentsSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const deleteStudentsItemFindingInGroupsArray = (commonKey, markForChangingKey, valuesBag, markForControlKey, markForControlValue) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.deleteItemFindingInGroupsArray(commonKey, markForChangingKey, valuesBag, markForControlKey, markForControlValue);
      if (response !== null) {
        dispatch(saveStudentsSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const getFilteredStudentsList = (key) => {
  return (dispatch) => {
    try {
      const response = studentsLocalStorage.getCurrentItem(key);
      if (response) {
        dispatch(saveFilteredStudentsSuccess(response));
      }
      else {
        const emptyArr = [];
        const json = JSON.stringify(emptyArr);
        studentsLocalStorage.setItemWithoutChecking(key, json);
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const setFilteredStudentsList = (fullListKey, filterListKey, mapForFilter, bool) => {
  return (dispatch) => {
    try {
      if (!mapForFilter.size) {
        dispatch(setEmptyFilter(filterListKey, bool));
      }
      else {
        const response = studentsLocalStorage.getFilteredItems(fullListKey, filterListKey, mapForFilter);
        if (response !== null) {
          dispatch(saveFilteredStudentsSuccess(response));
          dispatch(saveFilteredFlag(bool));
        }
        else {
          dispatch(setEmptyFilter(filterListKey, bool));
        }
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const setEmptyFilter = (filterListKey, bool) => {
  return (dispatch) => {
    const emptyArr = [];
    const json = JSON.stringify(emptyArr);
    studentsLocalStorage.setItemWithoutChecking(filterListKey, json);
    dispatch(saveFilteredStudentsSuccess(emptyArr));
    dispatch(saveFilteredFlag(bool));
  }
}

export const changeSuccessFlag = (flag) => {
  return (dispatch) => {
    dispatch(saveStudentsSuccessFlag(flag));
  }
}

