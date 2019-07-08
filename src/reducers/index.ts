import { combineReducers } from 'redux';
import todoList from './todoList';

const reducer = combineReducers({
  todoList,
});

export default reducer;