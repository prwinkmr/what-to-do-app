import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

console.log("App is running...");
ReactDOM.render(<TodoApp />, document.getElementById('app'));
