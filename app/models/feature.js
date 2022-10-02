import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  foundation: DS.attr('string'),
  capital: DS.attr('string'),
  geometryType: DS.attr('string'),
  coordinates: DS.attr('array')
});
