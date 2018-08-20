import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { setState } from './actionCreators';
import Bootstrap from './Bootstrap';
import { RouteAddAnnouncementContainer } from './routes/RouteAddAnnouncement';
import { RouteViewAnnouncementContainer } from './routes/RouteViewAnnouncement';
import { RouteEditAnnouncementContainer } from './routes/RouteEditAnnouncement';
import { RouteManageAnnouncementsContainer } from './routes/RouteManageAnnouncements';

// create store, set state
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setState(_.merge(
  _.pick(Bootstrap, [
    'apiSettings',
  ]),
  _.pick(Bootstrap.audiencesAndProgrammes, [
    'audiences',
    'programmes',
  ]),
)));

// create routes
const routes = [
  <Route key="manage" path="/" component={RouteManageAnnouncementsContainer} exact />,
  <Route key="view" path="/view/:id" component={RouteViewAnnouncementContainer} exact />,
  <Route key="add" path="/add" component={RouteAddAnnouncementContainer} exact />,
  <Route key="edit" path="/edit/:id" component={RouteEditAnnouncementContainer} exact />,
];

// render
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.querySelector('#root'),
);
