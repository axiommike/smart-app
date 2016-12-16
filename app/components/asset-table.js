import Ember from 'ember';
import EditableMixin from '../mixins/editable';
const { A, Component, computed, String: { capitalize } } = Ember;

export default Component.extend(EditableMixin, {
  tagName: 'asset-table',
  attributeBindings: ['title'],
  valueTypes: [
    { value: 'estimated', 'label': 'Estimated' },
    { value: 'purchased', 'label': 'Purchased' },
    { value: 'appraised', 'label': 'Appraised' }
  ],
  title: null,
  showApplicant: false,
  caption: null,
  assets: A(),
  type: null,
  typeName: computed('type', function() {
    return this.get('type') ? capitalize(this.get('type')) : 'Asset';
  }),
  hasAssets: computed.notEmpty('assets'),
  assetCount: computed.alias('assets.length'),
  values: computed.mapBy('assets', 'value'),
  totalAssets: function() {
    // let assets = this.get("filteredAssets");
    return 0;
  }.property('filteredAssets.@each.value'),
  onAdd: null,
  onRemove: null,
  actions: {
    addAsset() {
      this.sendAction('onAdd', this.get('type'));
    },
    removeAsset(asset) {
      return asset.destroyRecord().then((deletedAsset) => {
        this.sendAction('onRemove', deletedAsset);
      });
    }
  }
});
