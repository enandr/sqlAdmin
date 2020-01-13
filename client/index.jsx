import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

/* document.addEventListener('DOMContentLoaded', function () {
  const options = {
    dismissible: false
  };
    let acoptions = {
  }
  var modals = document.querySelectorAll('.modal');
  var instances = M.Modal.init(modals, options);
    var ac = document.querySelectorAll('.autocomplete');
  var acinstances = M.Autocomplete.init(ac, acOptions);

}); */
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
