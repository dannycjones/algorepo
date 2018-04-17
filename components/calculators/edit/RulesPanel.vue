<template>
  <v-container class="">
    <v-expansion-panel popout>
      <v-expansion-panel-content v-for="(rule, index) in localRules" :key="index">
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
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
export default {
  props: {
    rules: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      availableOptions: {
        inputs: [],
        comparators: [
          { text: '>=', value: 'GREATER_THAN_OR_EQUAL' }
        ]
      },
      localRules: _.cloneDeep(this.rules)
    };
  },
  methods: {
  }
}
</script>
