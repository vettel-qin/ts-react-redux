import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from '../constants';

export interface IChangeValueAction {
  value: any;
  type: CHANGE_VALUE;
}

export interface IAddItemAction {
  index: number;
  value: any;
  type: ADD_ITEM;
}

export interface IDeleteItemAction {
  index: number;
  value: any;
  type: DELETE_ITEM;
}

// 定义 TodoAction类型，包含IChangeValueAction | IAddItemAction | IDeleteItemAction
export type TodoAction = IChangeValueAction | IAddItemAction | IDeleteItemAction;

export const changeValue = (value: any): IChangeValueAction => ({
  type: CHANGE_VALUE,
  value,
});

export const addItem = () => ({
  type: ADD_ITEM,
});

export const deleteItem = (index: number) => ({
  index,
  type: DELETE_ITEM,
});
