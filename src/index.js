import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import Root from './router'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
    <Root />
    </BrowserRouter>, 
    document.getElementById('root'));
    registerServiceWorker();
