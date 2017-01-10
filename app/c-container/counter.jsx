import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';


@observer
class MobXComponent2 extends React.Component {

  handleInc = () =>
    this.props.store.increment();

  handleDec = () =>
    this.props.store.decrement();

  render() {
    return (
      <div>
        Counter: {this.props.store.count} <br/>
        <button onClick={this.handleInc}>+</button>
        <button onClick={this.handleDec}>-</button>
      </div>
    )
  }
}

const Counter = ({store, id}) => {

  const handleInc = () =>
    store.increment();

  const handleDec = () =>
    store.decrement();

  const handle = () => {
    // console.log(store.hover);
    if (store.hover) {
      store.something('')
    } else {
      store.something(id)
    }
  }

    return (
      <div>
        <Devtools/>
        Counter: {store.count} <br/>
        <button onClick={handleInc}>+</button>
        <button onClick={handleDec}>-</button> <hr/>
        Something: {store.hover}
        <button onClick={handle}>{store.hover ? '-' : '+'}</button>
      </div>
    )
  };

export default observer(Counter);
