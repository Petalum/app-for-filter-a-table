import { ADD_STUDENT, LOAD_COLUMNS_NAMES_FOR_STUDENTS_TABLE, CHANGE_STUDENTS_SUCCESS_FLAG, ADD_FILTERED_STUDENTS, CHANGE_FILTERED_SUCCESS_FLAG } from './typesOfActions'

export const saveStudentsSuccess = (item) => {
  return {
    type: ADD_STUDENT,
    item
  }
}

export const saveColumnsNamesForStudentsTableSuccess = (columns) => {
  return {
    type: LOAD_COLUMNS_NAMES_FOR_STUDENTS_TABLE,
    columns
  }
}

export const saveStudentsSuccessFlag = (bool) => {
  return {
    type: CHANGE_STUDENTS_SUCCESS_FLAG,
    bool
  }
}

export const saveFilteredStudentsSuccess = (filteredItems) => {
  return {
    type: ADD_FILTERED_STUDENTS,
    filteredItems
  }
}

export const saveFilteredFlag = (filterBool) => {
  return {
    type: CHANGE_FILTERED_SUCCESS_FLAG,
    filterBool
  }
}