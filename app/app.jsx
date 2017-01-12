import React from 'react';
import { useStrict, action, observable, computed, extendObservable, asMap } from 'mobx';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

useStrict(true);
//observable sa mozeu menit iba akciami
const APPID = '2290ca0515d1d4165a22ff1baadbdfcf';

class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius =  25;
  @observable location = "Amsterdam, NL";
  @observable loading = true;

  constructor(location="Amsterdam, NL") {
    this.location = location;
    this.fetch()
  }

  // constructor(temperatureCelsius, unit) {
  //   extendObservable(this, {
  //     unit: unit,
  //     temperatureCelsius: temperatureCelsius
  //   })
  // }

  id = Math.random();


  @action fetch() {
    window.fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.location}&APPID=${APPID}`)
    //http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
      .then(res => res.json())
      .then(action(json=> {
        // console.log(json.list[0]);

        this.temperatureCelsius = (json.list[0].main.temp -273.15).toFixed();
        this.loading = false;
      }))
  }

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

// export const temps = observable([]);
// temps.push(new Temperature());
// temps.push(new Temperature(25, "F"));
// temps.push(new Temperature(20, "C"));


export const App =  inject('temperatures')(observer(({ temperatures }) => (
  <ul style={{margin: '10vh'}}>
    {/*  nie je treba - provider to zabezpeci*/}
    {/* <TemperatureInput temperatures={temperatures} /> */}
    <TemperatureInput/>
    {temperatures && temperatures.map(t =>
      <TView key={t.id} temperature={t}/>
    )}
    <DevTools />
  </ul>
)));

@inject('temperatures')
@observer class TemperatureInput extends React.Component {
  @observable input = "";
  render() {
    return (
      <li>
        Destination
        <input onChange={this.onChange}
               value={this.input} />
        <button onClick={this.onSubmit}>Add</button>
      </li>
    )
  }

  @action onChange = (e) => {
    this.input = e.target.value;
  }

  @action onSubmit = () => {
    this.props.temperatures.push(
      new Temperature(this.input)
    )
    this.input = "";
  }
}

const TView = inject('temperature')(observer(({ temperature }) => {
  const onTemperatureClick = action(() => temperature.inc());

  return (
  <li onClick={onTemperatureClick}>
    {temperature.location}: {temperature.temperature}
  </li>
  )
}));

// @observer(['temperatures']) class TView extends React.Component {
//   render() {
//     const t  = this.props.temperature;
//     return (
//     <li onClick={this.onTemperatureClick}>
//       {t.location}: {t.temperature}
//     </li>
//     )
//   }
//   @action onTemperatureClick = () => {this.props.temperature.inc()}
// }

export default App;
