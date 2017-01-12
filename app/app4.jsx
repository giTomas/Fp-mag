import React from 'react';
import { useStrict, action, observable, computed, extendObservable, asMap } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

// useStrict(true);
//observable sa mozeu menit iba akciami

class Temperature {

    @observable unit = unit;
    @observable temperatureCelsius =  temperatureCelsius;

    constructor(degrees, unit) {
      this.setTemperatureAndUnit(degrees, unit)
    }


  // constructor(temperatureCelsius, unit) {
  //   extendObservable(this, {
  //     unit: unit,
  //     temperatureCelsius: temperatureCelsius
  //   })
  // }

  id = Math.random();

  @computed get temperatureFahrenheit() {
    console.log("calculating Fahrenheit");
    return this.temperatureCelsius * (9/5) + 32;
  }

  @computed get temperatureKelvin() {
    console.log("calculating Kelvin")
    return this.temperatureCelsius + 273.15;
  }

  @computed get temperature() {
    console.log("calculating temperature");
    switch(this.unit) {
      case "K": return this.temperatureKelvin + "°K";
      case "F": return this.temperatureFahrenheit + "°F";
      case "C": return this.temperatureCelsius + "°C";
    }
  }

  @action setUnit(newUnit) {
    this.unit = newUnit;
  }

  @action setCelsius(degrees) {
    this.temperatureCelsius = degrees;
  }

  @action("set temperature and unit")
    setTemperatureAndUnit(degrees, unit) {
      this.setCelsius(degrees);
      this.setUnit(unit);
  }

  @action inc() {
    this.setCelsius(this.temperatureCelsius + 1);
  }
}

// t.unit = "K"
export const temps = observable([]);
temps.push(new Temperature(20, "K"));
temps.push(new Temperature(25, "F"));
temps.push(new Temperature(20, "C"));


export const App = observer(({ temperatures }) => (
  <ul style={{margin: '10vh'}}>
    {temperatures.map(t =>
      <TView key={t.id} temperature={t}/>
    )}
    <DevTools />
  </ul>
))

// const TView = observer(({temperature}) => {
//   const onTemperatureClick = () => temperatures.inc();
//
//   return (
//   <li onClick={onTemperatureClick}>
//     {temperature.temperature}
//   </li>
//   )
// });

@observer class TView extends React.Component {
  render() {
    const t  = this.props.temperature;
    return (
    <li onClick={this.onTemperatureClick}>
      {t.temperature}
    </li>
    )
  }
  @action onTemperatureClick = () => {this.props.temperature.inc()}
}

export default App;
