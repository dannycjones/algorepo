<template>
  <b-form-group :label="label">
    <b-form-checkbox-group v-if="displayAs === 'checkboxes'" v-model="selected" :options="options" @change="updateValue()"></b-form-checkbox-group>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: String,
    value: Array,
    options: Array,
    displayAs: {
      validator (value) {
        return ['checkboxes'].indexOf(value) !== -1;
      },
      required: true
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