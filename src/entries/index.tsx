import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import bootstrap from '~/core/bootstrap';
import App from '~/components/App';
import store from '~/store';

function Loading() {
  return <div>Loading...</div>;
}

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '~/container/home'),
  loading: Loading,
});

const Test = Loadable({
  loader: () => import(/* webpackChunkName: "test" */ '~/container/test'),
  loading: Loading,
});

const render = () => {
  ReactDOM.render(
    // tslint:disable-next-line:jsx-wrap-multiline
    <Provider store={store}>
      <App>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/test" component={Test} />
          </Switch>
        </Router>
      </App>
    </Provider>,
    document.querySelector('#react-root'),
  );
};

bootstrap().then(render);
