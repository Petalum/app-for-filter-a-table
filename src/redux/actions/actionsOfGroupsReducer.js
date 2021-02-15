import { ADD_GROUP, LOAD_COLUMNS_NAMES_FOR_GROUP_TABLE, CHANGE_GROUP_SUCCESS_FLAG } from './typesOfActions'

export const saveGroupSuccess = (item) => {
  return {
    type: ADD_GROUP,
    item
  }
}

export const saveColumnsNamesForGroupsTableSuccess = (columns) => {
  return {
    type: LOAD_COLUMNS_NAMES_FOR_GROUP_TABLE,
    columns
  }
}

export const saveGroupSuccessFlag = (bool) => {
  return {
    type: CHANGE_GROUP_SUCCESS_FLAG,
    bool
  }
}