import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import Signin from './components/auth/sign-in';
import Signout from './components/auth/sign-out';
import Signup from './components/auth/sign-up';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import SearchContainer from './components/search-books/search-container';
import AllBooksContainer from './components/all-books/all-books-container';
import BookShelf from './components/profile/book-shelf';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
//if we have a token, consider user to be signed in
if(token) {
  //we need to update application state
  store.dispatch({ type: AUTH_USER })
}
ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={AllBooksContainer}/>
      <Route path="search-books" component={SearchContainer}/>
      <Route path="signin" component={Signin}/>
      <Route path="signout" component={Signout}/>
      <Route path="signup" component={Signup}/>
      <Route path="user/:id" component={RequireAuth(BookShelf)}/>
    </Route>
  </Router>
  </Provider>
  , document.querySelector('.container'));
