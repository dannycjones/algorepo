<template>
  <b-form>
    <b-container>
      <b-form-row v-for="block in calculator.blocks" :key="block.id">
        <b-col v-if="block.type === 'input'">
          <div v-if="block.content.type === 'options'">
            <option-input v-if="['select', 'radio', 'buttons'].indexOf(block.content.display) !== -1" :label="block.label" v-model=formData[block.id] :options="getOptions(block.content)" :display-as="block.content.display" variant="primary"></option-input>
            <multi-option-input v-else :label="block.label" v-model="formData[block.id]" :options="getOptions(block.content)" :display-as="block.content.display"></multi-option-input>
          </div>
          <b-form-group v-if="block.content.type === 'text'" :label="block.label">
            <b-form-input v-model="formData[block.id]" type="text" :placeholder="block.content.placeholder"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-else-if="block.type === 'result'">
          <b-form-group :label="block.label" :description="statusCaption">
            <b-form-input plaintext :value="valueOrPlaceholder(resultBlockValues[block.id])"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
  </b-form>
</template>

<script>
import { debounce } from 'lodash';

import axios from '~/plugins/axios';
import MultiOptionInput from '~/components/MultiOptionInput.vue';
import OptionInput from '~/components/OptionInput.vue';

const debounceDuration = 1000; // ms

export default {
  props: {
    calculator: Object
  },
  data () {
    return {
      resultBlockValues: this.calculator.blocks.filter(block => block.type === 'result').map(block => block.id).reduce((acc, id) => {
        acc[id] = undefined;
        return acc;
      }, {}),
      formData: this.calculator.blocks.filter(block => block.type === 'input').map(block => block.id).reduce((acc, id) => {
        acc[id] = undefined;
        return acc;
      }, {}),
      dirty: false,
      fetching: false,
      failed: false
    };
  },
  methods: {
    valueOrPlaceholder (value, placeholder = '-') {
      return value === undefined ? placeholder : value;
    },
    onChange () {
      this.failed = false;
      this.dirty = true;
      this.calculate();
    },
    calculate: debounce(function () {
      this.fetching = true;
      return axios.post(`/api/calculators/${this.calculator._id}/calculate`, { formData: this.formData })
        .then(res => {
          Object.entries(res.data.results).forEach(([key, value]) => {
            this.resultBlockValues[key] = value;
          });
          this.fetching = false;
          this.dirty = false;
        })
        .catch((e) => {
          this.failed = true;
          console.error(e);
        });
    }, debounceDuration),
    getOptions (blockContent) {
      const { options, dependencies } = blockContent;
      return dependencies.reduce((acc, dep) => acc[this.formData[dep]], options);
    }
  },
  components: {
    MultiOptionInput,
    OptionInput
  },
  computed: {
    statusCaption () {
      if (this.failed) {
        return 'Failed.';
      } else if (this.fetching) {
        return 'Calculating... ⟳';
      } else if (this.dirty) {
        return 'Waiting for you to finish...';
      } else {
        return 'Done.';
      }
    }
  },
  watch: {
    formData: {
      deep: true,
      handler () {
        this.onChange();
      }
    }
  }
};
</script>