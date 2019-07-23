import React, { Component } from 'react';

interface IProps {}

interface IState {}
class Test extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <section>test</section>;
  }
}

export default Test;
