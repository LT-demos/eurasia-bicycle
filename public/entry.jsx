import App from './app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
require('jquery');
require("bootstrap-webpack");

const router = <Router history={hashHistory}>
  <Route path="/" component={App}>
  </Route>
</Router>;

ReactDOM.render(
  router,
  document.getElementById("content")
);

console.log($('#content').text());

if (module.hot) {
  module.hot.accept();
}
