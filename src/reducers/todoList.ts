import { TodoAction } from '../actions';
import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from '../constants';

export interface IDefaultState {
  inputValue: string;
  list: any[];
}

const defaultState: IDefaultState = {
  inputValue: '',
  list: [],
};

// 处理并返回state

export default function(state = defaultState, action: TodoAction) {
  switch (action.type) {
    case CHANGE_VALUE:
      return { ...state, inputValue: action.value };
    case ADD_ITEM:
      return { ...state, list: [...state.list, state.inputValue], inputValue: '' };
    case DELETE_ITEM:
      const newState = { ...state };
      newState.list.splice(action.index, 1);
      return newState;
    default:
      return state;
  }
}
