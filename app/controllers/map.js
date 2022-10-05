import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { get, set } from '@ember/object';

export default Controller.extend({
  lat: 38.54043108357777,
  lng: -98.68178915360373,
  zoom: 4,

  states: computed('model', function () {
    let model = this.model.toArray();
    let states = [];

    model.forEach((state) => {
      if (state.geometryType == 'Polygon') {
        let temp = {
          coordinates: state.coordinates[0].map((r) => ({
            lat: r[1],
            lng: r[0],
          })),
          name: state.name,
          capital: state.capital,
          foundation: state.foundation,
          geometryType: state.geometryType,
        };
        states.push(temp);
      } else if (state.geometryType == 'MultiPolygon') {
        let tempCoordinates = [];
        for (var index = 0; index < state.coordinates.length; index++) {
          tempCoordinates.push(state.coordinates[index][0].map((r) => ({
            lat: r[1],
            lng: r[0],
          })));
        }
        let temp = {
          coordinates: tempCoordinates,
          name: state.name,
          capital: state.capital,
          foundation: state.foundation,
          geometryType: state.geometryType
        };
        states.push(temp);
      }
    });

    states.forEach((state) => {
      delete state[state.length - 1];
      state.length = state.length - 1;
    });

    return states;
  }),

  setAverageLngLat(state) {
    let maxLng = -1000, minLng = 1000, maxLat = -1000, minLat = 1000, averageLng=this.lat, averageLat=this.lng;
    if(state.geometryType == 'Polygon') {
      state.coordinates.forEach(cState =>{
        if(cState.lng > maxLng) maxLng = cState.lng; 
        if(cState.lng < minLng) minLng = cState.lng;
        if(cState.lat > maxLat) maxLat = cState.lat; 
        if(cState.lat < minLat) minLat = cState.lat;
      })
      averageLng = (minLng - maxLng) / 2 + maxLng;
      averageLat = (maxLat - minLat) / 2 + minLat;
    }
    else if(state.geometryType == 'MultiPolygon') {
      for (var index = 0; index < state.coordinates.length; index++) {
        state.coordinates[index].forEach(cState =>{
          if(cState.lng > maxLng) maxLng = cState.lng; 
          if(cState.lng < minLng) minLng = cState.lng;
          if(cState.lat > maxLat) maxLat = cState.lat; 
          if(cState.lat < minLat) minLat = cState.lat;
        });
      }
      averageLng = (minLng - maxLng) / 2 + maxLng;
      averageLat = (maxLat - minLat) / 2 + minLat;
    }
    set(this, 'lat', averageLat);
    set(this, 'lng', averageLng);
    setTimeout(()=>{
      set(this, 'zoom', 5);
    }, 1);
  },

  actions: {
    choseStateIntoClick(state, e) {
      set(this, 'chosenState', state);
      this.setAverageLngLat(state);
    },
    choseStateIntoSelect(state, e) {
      let tempState = get(this, 'states').find(({ name }) => name == state.name);
      set(this, 'chosenState', tempState);
      this.setAverageLngLat(tempState);
    }
  },
});