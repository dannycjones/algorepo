<template>
  <v-form class="calculator-form">
    <template v-for="block in calculator.blocks">
      <template v-if="block.type === 'input'">
        <template v-if="block.content.type === 'options'">
          <option-input :key="block.id" v-if="['select', 'radio', 'buttons'].indexOf(block.content.display) !== -1" :label="block.label" v-model=formData[block.id] :options="getOptions(block.content)" :display-as="block.content.display" variant="primary"></option-input>
          <multi-option-input :key="block.id" v-else :label="block.label" v-model="formData[block.id]" :options="getOptions(block.content)" :display-as="block.content.display"></multi-option-input>
        </template>
        <template v-else>
          <v-text-field v-bind="block.content" :key="block.id" :label="block.label" v-model="formData[block.id]"></v-text-field>
        </template>
      </template>
      <template v-else-if="['formula', 'conditional'].includes(block.type)">
        <v-text-field :label="block.label" :value="valueOrPlaceholder(resultBlockValues[block.id])" readonly :hint="statusCaption" persistent-hint :key="block.id" :error="failed"></v-text-field>
      </template>
    </template>
  </v-form>
</template>

<script>
import { debounce } from 'lodash';

import axios from '~/plugins/axios';
import MultiOptionInput from '~/components/calculators/view/MultiOptionInput.vue';
import OptionInput from '~/components/calculators/view/OptionInput.vue';

const debounceDuration = 1000; // ms

function* basicIdGenerator() {
  let index = 0;
  while (index < index + 1)
    yield index++;
}

const calcReqIdGen = basicIdGenerator();

export default {
  props: {
    calculator: Object
  },
  data () {
    return {
      resultBlockValues: this.calculator.blocks.filter(block => ['formula', 'conditional'].includes(block.type)).map(block => block.id).reduce((acc, id) => {
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
      const token = calcReqIdGen.next().value;
      this.failed = false;
      this.fetching = true;
      this.lastToken = token;
      return axios.post(`/api/calculators/${this.calculator._id}/calculate`, { formData: this.formData, token })
        .then(res => {
          if (this.lastToken === token) {
            // Only update if this was the last request made.
            Object.entries(res.data.values).forEach(([key, value]) => {
              this.resultBlockValues[key] = value;
            });
            this.fetching = false;
            this.dirty = false;
          }
        })
        .catch((e) => {
          this.failed = true;
          console.error(e);
        });
    }, debounceDuration),
    getOptions (blockContent) {
      const { options, dependencies } = blockContent;
      if (options == null)
        return [];
      return dependencies.reduce((acc, dep) => {
        if (this.formData[dep] == null)
          return [];
        return acc[this.formData[dep]]
      }, options);
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

<style>
.calculator-form {
  width: 100%;
}
</style>
