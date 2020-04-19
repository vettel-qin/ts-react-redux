import React, { Fragment } from 'react';

// 创建类型接口
interface IProps {
  inputValue: string;
  onChange: (e: any) => void;
  submit: () => void;
}

const AddTodo = ({ onChange, inputValue, submit }: IProps) => (
  <Fragment>
    <input value={inputValue} onChange={onChange} />
    <button onClick={submit}>提交</button>
  </Fragment>
);

export default AddTodo;

