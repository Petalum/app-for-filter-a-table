import { groupsLocalStorage } from '../../api/GroupsApi';
import getListOfGroups from '../../mock/groups.js';
import getListOfGroupTableColumns from '../../mock/groupsTableColumns';
import { saveGroupSuccess, saveColumnsNamesForGroupsTableSuccess, saveGroupSuccessFlag } from '../actions/actionsOfGroupsReducer';

export const getGroups = (key) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.getCurrentItem(key);
      if (response) {
        dispatch(saveGroupSuccess(response));
      }
      else {
        const result = groupsLocalStorage.setItemWithoutChecking(key, getListOfGroups);
        dispatch(saveGroupSuccess(result));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const addGroup = (key, value, mark) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.setCurrentItem(key, value, mark);
      if (response === 'error') {
        throw new Error("Такое название уже присутствует в базе");
      }
      dispatch(saveGroupSuccess(response));
    }
    catch (error) {
      alert(error);
    }
  }
}


export const changeGroups = (key, value, markValue, mark) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.changeCurrentItem(key, value, markValue, mark);
      if (response !== null) {
        dispatch(saveGroupSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const changeFaculty = (key, newvalue, mark, idValue, modifyAim, idKey) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.changeCurrentFaculty(key, newvalue, mark, idValue, modifyAim, idKey);
      if (response !== null && response !== 'error') {
        dispatch(saveGroupSuccess(response));
      }
      if (response === 'error') {
        throw new Error("Такое название уже присутствует в базе");
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const getColumnsGroupNames = (key) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.getCurrentItem(key);
      if (response) {
        dispatch(saveColumnsNamesForGroupsTableSuccess(response));
      }
      else {
        const result = groupsLocalStorage.setItemWithoutChecking(key, getListOfGroupTableColumns);
        dispatch(saveColumnsNamesForGroupsTableSuccess(result));
      }

    }
    catch (error) {
      alert(error);
    }
  }
}

export const addColumsGroupNames = (key, value) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.setCurrentItem(key, value);
      dispatch(saveColumnsNamesForGroupsTableSuccess(response));
    }
    catch (error) {
      alert(error);
    }
  }
}


export const deleteGroup = (key, markValue, mark) => {
  return (dispatch) => {
    try {
      const response = groupsLocalStorage.deleteItem(key, markValue, mark);
      if (response !== null) {
        dispatch(saveGroupSuccess(response));
      }
    }
    catch (error) {
      alert(error);
    }
  }
}

export const changeGroupSuccessFlag = (flag) => {
  return (dispatch) => {
    dispatch(saveGroupSuccessFlag(flag));
  }
}