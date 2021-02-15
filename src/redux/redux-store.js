import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import studentsReducer from './students-reducer';
import groupsReducer from './groups-reducer';


let reducers = combineReducers({
    studentsPage: studentsReducer,
    groupsPage: groupsReducer
    
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;