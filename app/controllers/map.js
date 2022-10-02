import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class MapController extends Controller {
  lat = 34.0791342193668;
  lng = -87.96256421882671;
  zoom = 10;

  get states() {
    let model = this.model.toArray();
    let states = []; let names = [];
    model.forEach(state => {
        if(state.geometryType == "Polygon") {
            states.push(state.coordinates[0].map(r => ({ lat: r[1], lng: r[0] })));
            names.push(state.name);
        }
        else if(state.geometryType == "MultiPolygon") {
            for(var index = 0; index < state.coordinates.length; index++) {
                states.push(state.coordinates[index][0].map(r => ({ lat: r[1], lng: r[0] })));
                names.push(state.name);
            }
        }
    })
    // let temp = {
    //     coordinates: states,
    //     names: names
    // }
    // console.log(temp);
    states.forEach(state => {
        delete(state[state.length-1]);
        state.length = state.length-1;
    })
    console.log(states);
    return states;
  }

  actions = {
    alert() {
      this.alert("ALERT");
    },
  };
}
