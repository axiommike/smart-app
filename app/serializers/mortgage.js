import RESTSerializer from 'ember-data/serializers/rest';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    applicants: {
      embedded: 'always'
    },
    assets: {
      embedded: 'always'
    },
    liabilities: {
      embedded: 'always'
    },
    otherProperties: {
      embedded: 'always'
    },
    vehicles: {
      embedded: 'always'
    }
  }
});
