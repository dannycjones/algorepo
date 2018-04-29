<template>
  <v-container class="">
    <v-expansion-panel popout>
      <Rule v-for="(rule, index) in rules" :rule="rule" :index="index" :key="index"></Rule>
    </v-expansion-panel>
    <v-btn @click="addNewRule">Add New Rule</v-btn>
  </v-container>
</template>

<script>
export default {
  components: {
    Rule: () => import('./Rule.vue')
  },
  name: 'RulesPanel',
  props: {
    rules: {
      type: Array,
      required: true
    }
  },
  methods: {
    addNewRule () {
      this.rules.push({
        input: '',
        output: '',
        outputType: 'value',
        value: '',
        comparator: ''
      });
    }
  }
}
</script>
