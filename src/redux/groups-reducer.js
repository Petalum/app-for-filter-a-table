import {ADD_GROUP, LOAD_COLUMNS_NAMES_FOR_GROUP_TABLE, CHANGE_GROUP_SUCCESS_FLAG} from './actions/typesOfActions'

let initialState = {
  groups: [],
  columnsNames: [],
 successFlag: false
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP: { 
      return { ...state, groups: action.item, successFlag: true};
    }
    case LOAD_COLUMNS_NAMES_FOR_GROUP_TABLE: {
      return { ...state, columnsNames: action.columns};
    }
    case CHANGE_GROUP_SUCCESS_FLAG: {
      return { ...state, successFlag: action.bool};
    }
    default:
      return state;
  }
}

export default groupsReducer;
