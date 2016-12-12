import RESTSerializer from 'ember-data/serializers/rest';
import DS from 'ember-data';

export default RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        applicants: {
            embedded: 'always'
        },
        otherProperties: {
            embedded: 'always'
        },
        assets: {
            embedded: 'always'
        },
        vehicles: {
            embedded: 'always'
        },
        liabilities: {
            embedded: 'always'
        }
    }
});