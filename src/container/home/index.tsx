import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '~/components/Layout';
import AddTodo from '~/components/AddTodo';
import TodoList from '~/components/TodoList';
import { changeValue, addItem, deleteItem } from '~/actions';
// import * as actions from '~/actions';
import s from './home.scss';
import Money from '~/assets/money.svg';
import grm from '../../assets/grm.png';

// 创建类型接口
export interface IHomeProps {
  inputValue: string;
  list: any[];
  // handleChangeValue: (e: any) => void;
  // handleSubmit: () => void;
  // handleDeleteItem: (index: number) => void;
  changeValue: (e: any) => void;
  addItem: () => void;
  deleteItem: (index: number) => void;
}

// 使用类型接口代替PropTypes进行类型校验
class Home extends PureComponent<IHomeProps> {
  public handleChangeValue = (e: any) => {
    this.props.changeValue(e.target.value);
  }

  public handleSubmit = () => {
    this.props.addItem();
  }

  public handleDeleteItem = (index: number) => {
    this.props.deleteItem(index);
  }

  render() {
    const {inputValue, list} = this.props;
    
    return (
      <section className={s.root}>
        <Layout />
        <AddTodo
          inputValue={inputValue}
          onChange={(e: any) => { this.handleChangeValue(e)}}
          submit={this.handleSubmit}
        />
        <TodoList
          todos={list}
          handleDeleteItem={this.handleDeleteItem}
        />
        <img src={grm} />
        <Money fill="red" />
        <div>
          <Link to="/test">Test pagesdfsdrfewr</Link>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state: any) => ({
  inputValue: state.todoList.inputValue,
  list: [...state.todoList.list],
})

const mapDispatchToProps = {
  changeValue,
  addItem,
  deleteItem,
}

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   handleChangeValue(e: any) {
//     dispatch(changeValue(e.target.value));
//   },
//   handleSubmit() {
//     dispatch(addItem())
//   },
//   handleDeleteItem(index: number) {
//     dispatch(deleteItem(index))
//   }
// })

export default connect(mapStateToProps, mapDispatchToProps)(Home);