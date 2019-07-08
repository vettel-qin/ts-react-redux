import * as React from 'react';
import { message } from 'antd';

// 这使用泛类灵活化state和props的interface
export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
  public $message = message;
}
