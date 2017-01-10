import React from 'react';
import { render} from 'react-dom';
// import App from './app/app';
// import {App, temps, t} from './app/app';
import {App, t} from './app/app';
import './app/assets/css/reset.css';
import { observable, when } from 'mobx';
import { Provider } from 'mobx-react';

const temps = observable([]);
//je potrebne pridat array ku kazdemu komponentu, ktory ju potrebuje

const renderApp = () =>
    render(
      <Provider temperatures={temps}>
        <App />
      </Provider>,
      document.getElementById('root')
      );

renderApp();

function isNice(t) {
  return t.temperatureCelsius > 19;
}

when(
  () => temps.some(isNice),
  () => {
    const t = temps.find(isNice);
    alert("Book now! " + t.location);
  }
)
