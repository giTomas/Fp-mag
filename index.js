import React from 'react';
import { render } from 'react-dom';
// import App from './app/app';
// import {App, temps, t} from './app/app';
import {App, t} from './app/app';
import './app/assets/css/reset.css';

const renderApp = () =>
    render(
      // <App temperatures={temps} />,
      <App temperature={t} />,
      document.getElementById('root')
    );

renderApp();
