import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import store from './redux/redux-store';
import reportWebVitals from './reportWebVitals';

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <MainApp/>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state)
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
