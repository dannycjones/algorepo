<template>
  <div v-if="dependencies.length < 1">
    <v-data-table :headers="[{ text: 'Label', sortable: false, value: 'text' }, { text: 'Value', sortable: false, value: 'value' }]" :items="options" class="elevation-1" hide-actions>
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog @open="props.item._text = props.item.text; focusEditTextDialog();" @cancel="props.item.text = props.item._text || props.item.text"> {{ props.item.text }}
            <v-text-field slot="input" label="Text Label" :value="props.item.text" @change.native="e => props.item.text = e.target.value" counter required ref="editTextDialog"></v-text-field>
          </v-edit-dialog>
        </td>
        <td>
          <v-edit-dialog @open="props.item._value = props.item.value; focusEditValueDialog();" @cancel="props.item.value = props.item._value || props.item.value"> {{ props.item.value }}
            <v-text-field slot="input" label="Value" :value="props.item.value" v-on:change.native="e => props.item.value = e.target.value" counter required ref="editValueDialog"></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="options.push({ text: 'New Option', value: 'newvalue'})">Add New Option</v-btn>
  </div>
  <v-tabs v-else grow>
    <v-tabs-slider></v-tabs-slider>
    <v-tab v-for="prevOption in previousOptions" :key="prevOption">{{ prevOption }}</v-tab>
    <v-tab-item v-for="prevOption in previousOptions" :key="prevOption">
      <DependencyTabs :dependencies="tail" :block="block" :previous-dependency-selections="[...previousDependencySelections, prevOption]"></DependencyTabs>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  props: {
    dependencies: {
      type: Array,
      required: true
    },
    previousDependencySelections: {
      type: Array,
      default () {
        return [];
      }
    },
    block: {
      type: Object,
      required: true
    }
  },
  name: 'DependencyTabs',
  computed: {
    head () {
      return this.dependencies[0];
    },
    tail () {
      return this.dependencies.slice(1);
    },
    previousOptions () {
      if (this.head === undefined) {
        return null;
      }

      // let options = this.allBlocks.find(b => b.id === this.head).content.options;
      // console.log('options', options, this.previousDependencySelections);
      // const reduced = this.previousDependencySelections.reduce((acc, val) => acc[val], options);
      // console.log('reduced', reduced);
      // return reduced.map(o => o.value);

      // console.log('head', this.head);
      // console.log('find hting', );
      return this.allBlocks.find(b => b.id === this.head).content.options.map(o => o.value);
    },
    allBlocks () {
      return this.$store.state.calculators.editor.calculator.blocks;
    },
    options () {
      const initialAccumulator = this.block.content.options;
      console.log('initialAccumulator', initialAccumulator);
      console.log('this.dependencies', this.dependencies);
      if (Array.isArray(this.previousDependencySelections) && this.previousDependencySelections.length < 1) {
        return Array.isArray(initialAccumulator) ? initialAccumulator : undefined;
      }
      const prevDeps = [...this.previousDependencySelections];
      console.log('prevDeps', prevDeps);
      return prevDeps.reduce((acc, val) => acc[val], initialAccumulator);;
    }
  }
}
</script>
