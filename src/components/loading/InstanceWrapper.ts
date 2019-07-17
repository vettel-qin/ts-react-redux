import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';

class InstanceWrapper {
  private refCount: number = 0;
  private container: HTMLElement | null = null;
  private root: HTMLElement;

  constructor() {
    this.root = document.getElementById('react-modal');
  }

  public show() {
    this.refCount += 1;
    if (this.refCount === 1) {
      this.create();
    }
  }

  public hide() {
    this.refCount -= 1;
    if (this.refCount === 0) {
      this.destroy();
    } else if (this.refCount < 0) {
      this.refCount = 0;
    }
  }

  public reset() {
    this.refCount = 0;
    this.destroy();
  }

  private create() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.root.appendChild(this.container);

      ReactDOM.render(React.createElement(Loading), this.container);
    }
  }

  private destroy() {
    if (this.container) {
      this.root.removeChild(this.container);
      this.container = null;
    }
  }
}

export default InstanceWrapper;
