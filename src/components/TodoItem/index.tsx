import React from 'react';

// 创建类型接口
interface IProps {
  item: string;
  deleteItem: () => void;
}

const TodoItem = ({item, deleteItem}: IProps) => (
  <li onClick={deleteItem}>
    {item}
  </li>
)

export default TodoItem;