import React, { Component } from 'react';

// 创建类型接口
export interface IResultProps {
}

export interface IResultState {
}

// 使用类型接口代替PropTypes进行类型校验
class Result extends Component<IResultProps, IResultState> {

  public render() {
    return (
      <section>
        React Result
      </section>
    );
  }
}

export default Result;

