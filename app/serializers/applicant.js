import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
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