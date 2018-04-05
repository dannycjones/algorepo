<template>
  <b-form>
    <b-container>
      <b-form-row v-for="block in calculator.blocks" :key="block.id">
        <b-col v-if="block.type === 'input'">
          <div v-if="block.content.type === 'options'">
            <multi-option-input :label="block.label" v-model="formData[block.id]" :options="block.content.options" :display-as="block.content.display" variant="primary"></multi-option-input>
          </div>
          <b-form-group v-if="block.content.type === 'text'" :label="block.label">
            <b-form-input v-model="formData[block.id]" type="text" :placeholder="block.content.placeholder"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-else-if="block.type === 'result'">
          <b-form-group :label="block.label">
            <b-form-input plaintext :value="valueOrPlaceholder(resultBlockValues[block.id])"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
  </b-form>
</template>

<script>
import axios from '~/plugins/axios';
import MultiOptionInput from '~/components/MultiOptionInput.vue';

export default {
  props: {
    calculator: Object
  },
  data () {
    return {
      resultBlockValues: {
        endResult: 12
      },
      formData: {}
    };
  },
  methods: {
    valueOrPlaceholder (value, placeholder = '-') {
      return value || placeholder;
    }
  },
  components: {
    MultiOptionInput
  },
  watch: {
    formData: {
      deep: true,
      handler () {
        return axios.post(`/api/calculators/${this.calculator._id}/calculate`, { formData: this.formData })
          .then(res => {
            Object.entries(res.data.results).forEach(([key, value]) => {
              this.resultBlockValues[key] = value;
            });
          })
          .catch(console.error);
      }
    }
  }
};
</script>