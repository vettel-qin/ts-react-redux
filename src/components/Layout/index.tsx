import React from 'react';
import { Checkbox, Button } from 'antd';
import { ComponentExt } from '~/utils/reactExt';

class Layout extends ComponentExt {
  public handleMsg = () => {
    this.$message.success('提交成功！');
  };

  public render() {
    return (
      <section>
        <Checkbox>Checkbox</Checkbox>
        <Button onClick={this.handleMsg} type="primary">
          提交
        </Button>
      </section>
    );
  }
}

export default Layout;
