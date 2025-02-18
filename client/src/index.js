import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import Reducer from './_reducers';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
      <App />
  </Provider>
);

// const createStoreWithMiddleware=applyMiddleware(promiseMiddleware, thunk)(createStore);
// const rootNode = document.getElementById("root"); //오류 2 해결
// ReactDOM.createRoot(rootNode).render( // 오류 2 해결
//   <Provider 
//     store={createStoreWithMiddleware(Reducer,
//             window._REDUX_DEVTOOLS_EXTENSION_ &&
//             window._REDUX_DEVTOOLS_EXTENSION_()
//         )}
//   >
//     <App />
//   </Provider>
// ,document.getElementById('root'));







  // , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
