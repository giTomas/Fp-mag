import React from 'react';
import CardsContainer from './c-container/cardsContainer';
import Counter from './c-container/counter';
import Cards from './c-presentational/cards';
import Card from './c-presentational/card';
import appState from './store/store';
import { observable } from 'mobx';

// const appState = observable({
//   count: 0,
//   hover: ''
// })
//
// //don't use arrow function!!!
// appState.increment = function() {
//   this.count++;
// }
//
// appState.decrement = function() {
//   this.count--;
// }
//
// appState.something = function(a) {
//   this.hover = a;
// }


const App = () =>
  <Counter store={appState} id={'Boooooooooooooo!!'}/>

export default App;
