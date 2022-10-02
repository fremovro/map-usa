import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class MapRoute extends Route {
  model() {
    // let features = this.store.findAll('feature');
    // let temp = model[0].coordinates[0].map(r => ({ lat: r[0], lng: r[1] }));
    // console.log(temp);
    // return RSVP.hash({
    //   features: features,
    //   state: temp
    // });
    return this.store.findAll('feature');
  }
}
