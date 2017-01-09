import { observable } from 'mobx';

const appState = observable({
  count: 0,
  hover: ''
})

//don't use arrow function!!!
appState.increment = function() {
  this.count++;
}

appState.decrement = function() {
  this.count--;
}

appState.something = function(a) {
  this.hover = a;
}

export default appState;
