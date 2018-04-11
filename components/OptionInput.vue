<template>
    <v-select v-if="displayAs === 'select'" :items="options" v-model="selected" :label="label" single-line :disabled="optionsIsEmpty"></v-select>
    <v-radio-group :label="label" v-else-if="displayAs === 'radio'" v-model="selected" row :disabled="optionsIsEmpty">
      <v-radio v-for="option in options" :key="option.text" :label="option.text" :value="option.value"></v-radio>
    </v-radio-group>
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
  watch: {
    selected () {
      this.$emit('input', this.selected);
    }
  },
  data () {
    return {
      selected: this.value
    };
  },
  computed: {
    optionsIsEmpty () {
      const options = this.options;
      return !(Array.isArray(options) && options.length > 0);
    }
  }
};
</script>