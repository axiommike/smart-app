import RESTSerializer from 'ember-data/serializers/rest';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    addresses: {
      embedded: 'always'
    },
    employments: {
      embedded: 'always'
    },
    incomes: {
      embedded: 'always'
    }
  }
});
