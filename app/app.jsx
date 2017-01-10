import React from 'react';
import { observable, computed, extendObservable, asMap } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class Temperature {
  id = Math.random();
  @observable unit = "C";
  @observable temperatureCelsius = 20;

  // constructor() {
  //   extendObservable(this, {
  //     unit: "C",
  //     temperatureCelsius: 25
  //   })
  // }

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
}

// export const temps = observable([]);
// temps.push(new Temperature());
// temps[0].unit = "F";
// temps.push(new Temperature());
// temps[1].temperatureCelsius = 15;

//maps

export const temps = observable(asMap({
  "Amsterdam": new Temperature(),
  "Rome": new Temperature()
}))

temps.get("Amsterdam").unit = 'K';
temps.set("Tel Aviv", new Temperature());
temps.get("Tel Aviv").temperatureCelsius = 30;

// export const t = observable({
//   unit: "C",
//   temperatureCelsius: 25,
//   temperatureFahrenheit: computed(function() {
//     console.log("calculating Fahrenheit");
//     return this.temperatureCelsius * (9/5) + 32;
//   }),
//   temperatureKelvin: computed(function() {
//     console.log("calculating Kelvin")
//     return this.temperatureCelsius + 273.15;
//   }),
//   temperature: computed(function() {
//     console.log("calculating temperature");
//     switch(this.unit) {
//       case "K": return this.temperatureKelvin + "°K";
//       case "F": return this.temperatureFahrenheit + "°F";
//       case "C": return this.temperatureCelsius + "°C";
//     }
//   })
// })


export const App = observer(({ temperatures }) => (
  <div>
    {temperatures.entries().map(([city, t]) =>
      <div key={t.id}>{city}: {t.temperature}</div>
    )}
    <DevTools />
  </div>
))

// export default App;
