import React, { PureComponent } from 'react';

export interface ITestProps {} 

class Test extends PureComponent<ITestProps> {
  render() {
    return (
      <div>test</div>
    )
  }
}

export default Test;