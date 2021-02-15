import { LOAD_COLUMNS_NAMES_FOR_TABLE, CHANGE_SUCCESS_FLAG } from './typesOfActions'

export const saveColumnsNamesForTableSuccess = (columns) => {
  return {
    type: LOAD_COLUMNS_NAMES_FOR_TABLE,
    columns
  }
}

export const saveSuccessFlag = (bool) => {
  return {
    type: CHANGE_SUCCESS_FLAG,
    bool
  }
}