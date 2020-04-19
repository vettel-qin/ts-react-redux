import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '~/components/App';
import Home from '~/container/home';
import Result from '~/container/result';
import store from '~/store';
import s from './index.scss';
import logo from '~/assets/logo.png';


function render() {
  return ReactDOM.render(
    <Provider store={store}>
      <App>
        <section className={s.wrapper}>
          <p>Hello, react + redux</p>
          <img src={logo} alt="logo" className={s.logo} />
        </section>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/result" component={Result} />
          </Switch>
        </Router>
      </App>
    </Provider>,
    document.getElementById('react-root')
  );
}

render();

if (module.hot) {
  module.hot.accept(['~/components/App'], render);
  module.hot.accept(() => window.location.reload(true));
}
