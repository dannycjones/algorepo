<template>
  <v-expansion-panel-content>
    <div slot="header">Rule {{ index }}</div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              If...
            </v-flex>
            <v-flex xs12 sm4>
              <v-select v-model="rule.input" :items="availableOptions.inputs" label="Input"></v-select>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select v-model="rule.comparator" :items="availableOptions.comparators" label="Comparator"></v-select>
            </v-flex>
            <v-flex xs12 sm4>
              <v-text-field v-model="rule.value" label="Some Value"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select v-model="rule.outputType" @change="onOutputTypeChange" label="Then..." :items="availableOptions.outputTypes"></v-select>
              <template v-if="rule.outputType === 'rules'">
                <RulesPanel :rules="rule.output"></RulesPanel>
              </template>
              <v-text-field v-else v-model="rule.output" label="Output"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>

export default {
  name: 'Rule',
  components: { RulesPanel: () => import('./RulesPanel.vue') },
  props: {
    index: {
      type: Number,
      required: true
    },
    rule: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      availableOptions: {
        inputs: this.$store.state.calculators.editor.calculator.blocks.map(b => b.id),
        comparators: [
          { text: '<=', value: 'LESS_THAN_OR_EQUAL' },
          { text: '<', value: 'LESS_THAN' },
          { text: '>=', value: 'GREATER_THAN_OR_EQUAL' },
          { text: '>', value: 'GREATER_THAN' },
          { text: '==', value: 'EQUAL' },
          { text: '!=', value: 'NOT_EQUAL' }
        ],
        outputTypes: [
          { text: 'More rules!', value: 'rules' },
          { text: 'Value' , value: 'value' }
        ]
      }
    }
  },
  methods: {
    onOutputTypeChange (outputType) {
      this.rule.output = outputType === 'rules' ? [] : '';
    }
  }
}
</script>

<style>

</style>
