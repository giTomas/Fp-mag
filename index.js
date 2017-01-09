import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import './app/assets/css/reset.css';

const renderApp = () =>
    render(
      <App />,
      document.getElementById('root')
    );

renderApp();
