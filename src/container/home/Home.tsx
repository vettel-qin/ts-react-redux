import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProvinceList } from '~/api';
import AddTodo from '~/components/AddTodo';
import TodoList from '~/components/TodoList';
import { changeValue, addItem, deleteItem } from '~/actions';

// 创建类型接口
export interface IHomeProps {
  inputValue: string;
  list: any[];
  changeValue: (e: any) => void;
  addItem: () => void;
  deleteItem: (index: number) => void;
}

export interface IHomeState {
  provinceData: any[];
}

// 使用类型接口代替PropTypes进行类型校验
class Home extends PureComponent<IHomeProps, IHomeState> {
  constructor(props: Readonly<IHomeProps>) {
    super(props);
    this.state = {
      provinceData: [],
    };
  }

  public componentDidMount() {
    getProvinceList()
      .then((res: any[]) => {
        this.setState(() => ({ provinceData: res }));
      })
      .catch((err: any) => { console.error(err);
      });
  }

  public render() {
    const { provinceData } = this.state;
    const { inputValue, list } = this.props;
    return (
      <section>
        <ul>
          {
            provinceData.map((data: { provinceId: number; provinceName: string }) => (
            <li key={data.provinceId}>{data.provinceName}</li>
            ))
          }
        </ul>
        <AddTodo inputValue={inputValue} onChange={this.handleChangeValue} submit={this.handleSubmit} />
        <TodoList todos={list} deleteItem={this.handleDeleteItem} />
      </section>
    );
  }

  private handleChangeValue = (e: any) => { this.props.changeValue(e.target.value); };

  private handleSubmit = () => { this.props.addItem(); };

  private handleDeleteItem = (index: number) => { this.props.deleteItem(index); };
}

const mapStateToProps = (state: any) => ({ inputValue: state.todoList.inputValue, list: [...state.todoList.list]});

const mapDispatchToProps = { changeValue, addItem, deleteItem };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

