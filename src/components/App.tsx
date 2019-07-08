import { hot } from 'react-hot-loader';
import './App.css';

const App = (props: { children: any }) => {
  return props.children;
};

export default hot(module)(App);
