import React, { Component } from 'react';
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
import { getProvinceList, login } from 'api';

// 创建类型接口
export interface IHomeProps {
  inputValue: string;
  list: any[];
  changeValue: (e: any) => void;
  addItem: () => void;
  deleteItem: (index: number) => void;
}

// 使用类型接口代替PropTypes进行类型校验
class Home extends Component<IHomeProps> {
  public componentDidMount() {
    getProvinceList({
      provinceId: 10,
    })
      .then(res => {})
      .catch(err => {});
  }

  public handleChangeValue = (e: any) => {
    this.props.changeValue(e.target.value);
  };

  public handleSubmit = () => {
    this.props.addItem();
  };

  public handleDeleteItem = (index: number) => {
    this.props.deleteItem(index);
  };

  public render() {
    const { inputValue, list } = this.props;

    return (
      <section className={s.root}>
        <Layout />
        <AddTodo inputValue={inputValue} onChange={this.handleChangeValue} submit={this.handleSubmit} />
        <TodoList todos={list} deleteItem={this.handleDeleteItem} />
        <img src={grm} />
        <Money fill="red" />
        <div>
          <Link to="/test">Test pagesdfsdrfewr</Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  inputValue: state.todoList.inputValue,
  list: [...state.todoList.list],
});

const mapDispatchToProps = {
  changeValue,
  addItem,
  deleteItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
