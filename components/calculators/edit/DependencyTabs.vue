<template>
  <v-tabs grow>
    <v-tabs-slider></v-tabs-slider>
    <v-tab v-for="prevOption in previousOptions" :key="prevOption">{{ prevOption }}</v-tab>
    <v-tab-item v-for="prevOption in previousOptions" :key="prevOption">
      <DependencyTabs v-if="dependencies.length > 1" :dependencies="tail" :previous-dependency-selections="[...previousDependencySelections, prevOption]"></DependencyTabs>
      
      <v-data-table v-else :headers="[{ text: 'Label', sortable: false, value: 'text' }, { text: 'Value', sortable: false, value: 'value' }]" :items="getOptions(prevOption)" class="elevation-1" hide-actions>
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
      return this.allBlocks.find(b => b.id === this.head).content.options.map(o => o.value);
    },
    allBlocks () {
      return this.$store.state.calculators.editor.calculator.blocks;
    },
    block () {
      return _.cloneDeep(this.$store.state.calculators.editor.blockEditor.block);
    }
  },
  watch: {
    block: {
      deep: true,
      handler (val) {
        console.log("BLOCK CHANGED WOOOOOAHHHHH");
        this.$store.dispatch('calculators/editor/updateBlock', { val });
      }
    }
  },
  methods: {
    getOptions (lastOption) {
      const initialAccumulator = this.block.content.options;
      return [...new Set([...this.previousDependencySelections, lastOption].reduce((acc, val) => acc[val], initialAccumulator))]
    }
  }
}
</script>

