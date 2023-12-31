import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JoinLobbyView } from './components/joinView/JoinLobbyView';
import { Hub } from './components/Hub.js/Hub';
import reportWebVitals from './reportWebVitals';
import { ArticleSearch } from './components/lobby/ArticleSearch';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Hub/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
