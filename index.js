import React from 'react';
import { render } from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
// import App from './app/app';
// import {App, temps, t} from './app/app';
import { App } from './app/app';
import './app/assets/css/reset.css';
// import { observable, when } from 'mobx';


const temps = observable([]);
// je potrebne pridat array ku kazdemu komponentu, ktory ju potrebuje

const renderApp = () =>
    render(
      <Provider temperatures={temps}>
        <App />
      </Provider>,
      document.getElementById('root')
      );

renderApp();

// function isNice(t) {
//   return t.temperatureCelsius > 25;
// }
//
// when(
//   () => temps.some(isNice),
//   () => {
//     const t = temps.find(isNice);
//   console.log("Book now! " + t.location);
//   }
// )
