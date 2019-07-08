import React from 'react';
import TodoItem from '~/components/TodoItem';

//创建类型接口
interface IProps {
  todos: any[];
  handleDeleteItem: (index: number) => void;
}

const TodoList = ({ todos, handleDeleteItem }: IProps) => (
  <ul>
    {
      todos.map((item, index) => (
        <TodoItem item={item} deleteItem={() => handleDeleteItem(index)} key={index} />
      ))
    }
  </ul>
)

export default TodoList;