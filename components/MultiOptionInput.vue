<template>
  <div>
    <v-checkbox v-for="option in options" :label="option.text" v-model="selected" :key="option.text" :disabled="optionsIsEmpty"></v-checkbox>
  </div>
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
  data () {
    return {
      selected: this.value
    };
  },
  watch: {
    selected () {
      this.$emit('input', this.selected);
    }
  },
  computed: {
    optionsIsEmpty () {
      const options = this.options;
      return !(Array.isArray(options) && options.length > 0);
    }
  }
};
</script>