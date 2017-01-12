import React from 'react';
import { useStrict, action, observable, computed, extendObservable, asMap } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

useStrict(true);
//observable sa mozeu menit iba akciami

export const t = new class Temperature {
  id = Math.random();
  @observable unit = "C";
  @observable temperatureCelsius = 20;

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

}

// t.unit = "K"

t.setUnit('K');
t.setCelsius(31);
t.setTemperatureAndUnit(27, 'F')


export const App = observer(({ temperature }) => (
  <div>
    {temperature.temperature}
    <DevTools />
  </div>
))

// export default App;
