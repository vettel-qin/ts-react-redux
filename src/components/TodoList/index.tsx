import React, { PureComponent } from 'react';
import TodoItem from '~/components/TodoItem';

// 创建类型接口
interface IProps {
  todos: any[];
  deleteItem: (num: number) => void;
}

class TodoList extends PureComponent<IProps> {
  public render() {
    const { todos } = this.props;

    return (
      <ul>
        {todos.map((item, index) => (
          <TodoItem item={item} deleteItem={this.handleItemDelete(index)} key={index} />
        ))}
      </ul>
    );
  }
  private handleItemDelete = (num: number) => () => {
    const { deleteItem } = this.props;
    deleteItem(num);
  };
}

export default TodoList;
