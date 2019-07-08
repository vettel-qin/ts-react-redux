import React from 'react';
import { Checkbox, Button } from 'antd';
import { ComponentExt } from '~/utils/reactExt';

class Layout extends ComponentExt {
  handleMsg = () => {
    this.$message.success('提交成功！');
  };

  render() {
    return (
      <section>
        <Checkbox>Checkbox</Checkbox>
        <Button onClick={this.handleMsg} type="primary">提交</Button>
      </section>
    );
  }
}

export default Layout;
