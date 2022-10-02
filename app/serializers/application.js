import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.forEach((feature) => {
      feature.name = feature.properties.name;
      feature.foundation = feature.properties.foundation;
      feature.capital = feature.properties.capital;
      delete feature.properties;

      feature.geometryType = feature.geometry.type;
      feature.coordinates = feature.geometry.coordinates;
      delete feature.geometry;
    });

    return this._super(...arguments);
  },
});
