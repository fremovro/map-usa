import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { get, set } from '@ember/object';

export default Controller.extend({
  lat: 38.54043108357777,
  lng: -98.68178915360373,
  zoom: 4.5,

  states: computed('model', function () {
    let model = this.model.toArray();
    let states = [];

    model.forEach((state) => {
      console.log(state.name);
      if (state.geometryType == 'Polygon') {
        let temp = {
          coordinates: state.coordinates[0].map((r) => ({
            lat: r[1],
            lng: r[0],
          })),
          name: state.name,
          capital: state.capital,
          foundation: state.foundation,
        };
        states.push(temp);
      } else if (state.geometryType == 'MultiPolygon') {
        for (var index = 0; index < state.coordinates.length; index++) {
          let temp = {
            coordinates: state.coordinates[index][0].map((r) => ({
              lat: r[1],
              lng: r[0],
            })),
            name: state.name,
            capital: state.capital,
            foundation: state.foundation,
          };
          states.push(temp);
        }
      }
    });

    states.forEach((state) => {
      delete state[state.length - 1];
      state.length = state.length - 1;
    });

    console.log(states);
    return states;
  }),

  actions: {
    center(e) {
      set(this, 'lat', e.latlng.lat);
      set(this, 'lng', e.latlng.lng);
      // set(this, 'zoom', 6);
    },
  },
});