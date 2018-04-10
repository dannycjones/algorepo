<template>
  <b-form-group :label="label">
    <b-form-select v-if="displayAs === 'select'" v-model="selected" :options="options" @change="updateValue()"></b-form-select>
    <b-form-radio-group v-else v-model="selected" :options="options" @change="updateValue()" :buttons="displayAs === 'buttons'" :button-variant="variant" :id="'radioGroup' + this._uid" :name="'radioGroup' + this._uid"></b-form-radio-group>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: String,
    value: null,
    options: Array,
    displayAs: {
      validator (value) {
        return ['select', 'radio', 'buttons'].indexOf(value) !== -1;
      },
      required: true
    },
    variant: {
      validator (value) {
        return ['primary', 'secondary', 'success', 'outline-success', 'warning', 'danger', 'link'].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.selected);
    }
  },
  data () {
    return {
      selected: this.value
    };
  }
};
</script>