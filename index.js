import React from 'react';
import { render } from 'react-dom';
// import App from './app/app';
import {App, temps} from './app/app';
import './app/assets/css/reset.css';

const renderApp = () =>
    render(
      <App temperatures={temps} />,
      document.getElementById('root')
    );

renderApp();
