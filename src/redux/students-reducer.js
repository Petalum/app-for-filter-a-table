import {ADD_STUDENT, LOAD_COLUMNS_NAMES_FOR_STUDENTS_TABLE, CHANGE_STUDENTS_SUCCESS_FLAG, ADD_FILTERED_STUDENTS, CHANGE_FILTERED_SUCCESS_FLAG} from './actions/typesOfActions'

let initialState = {
  students: [],
  columnsNames: [],
 successFlag: false,
 filteredList: [],
 filteredFlag: false
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT: { 
      return { ...state, students: action.item, successFlag: true};
    }
    case LOAD_COLUMNS_NAMES_FOR_STUDENTS_TABLE: {
      return { ...state, columnsNames: action.columns};
    }
    case CHANGE_STUDENTS_SUCCESS_FLAG: {
      return { ...state, successFlag: action.bool};
    }
    case ADD_FILTERED_STUDENTS: {
      return {...state, filteredList: action.filteredItems}
    }
    case CHANGE_FILTERED_SUCCESS_FLAG: {
      return {...state, filteredFlag: action.filterBool}
    }
    default:
      return state;
  }
}

export default studentsReducer;
