<template>
  <v-dialog v-model="isVisible" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Block Editor</span>
      </v-card-title>
      <v-card-text v-if="block">
        <v-text-field v-model="block.id" label="Block ID" required></v-text-field>
        <v-text-field v-model="block.label" label="Block Label"></v-text-field>
        <v-checkbox label="Visible" v-model="block.display"></v-checkbox>
        <template v-if="block.type === 'input'">
          <v-select v-model="block.content.type" label="Input Type" :items="availableOptions.inputTypes"></v-select>
          <template v-if="block.content.type === 'options'">
            <v-select v-model="block.content.display" label="Display As" :items="availableOptions.displayTypes"></v-select>
            <v-select v-model="block.content.dependencies" label="Dependencies" @change="onDependenciesChange" chips multiple :items="availableDependencyOptions"></v-select>
            <v-card>
              <DependencyTabs :block="block" :dependencies="block.content.dependencies"></DependencyTabs>
            </v-card>
          </template>
          <template v-else-if="block.content.type === 'number'">
            <v-text-field v-model="block.content.step" label="Step" required disabled></v-text-field>
            <v-text-field v-model="block.content.min" label="Minimum" disabled></v-text-field>
            <v-text-field v-model="block.content.max" label="Maximum" disabled></v-text-field>
            <v-text-field v-model="block.content.default" label="Default" disabled></v-text-field>
          </template>
        </template>
        <template v-if="block.type === 'formula'">
          <v-text-field v-model="block.content" label="Formula" required hint="Details about the expressions and functions can be found in the FAQ."></v-text-field>
        </template>
        <template v-if="block.type === 'conditional'">
          <rules-panel :rules="block.content.rules"></rules-panel>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" flat @click.native="onCancelBtn">Cancel</v-btn>
        <v-btn color="blue" flat @click.native="onCloseBtn" :disabled="!block">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash';

import DependencyTabs from './DependencyTabs.vue';
import RulesPanel from './RulesPanel.vue';

export default {
  model: {
    prop: 'visible',
    event: 'visibilityChange'
  },
  data () {
    const { calculator } = this.$store.state.calculators.editor;
    return {
      block: {
        id: null,
        type: null,
        content: null,
        label: null,
        display: null
      },
      availableOptions: {
        inputTypes: ['options', 'number'],
        displayTypes: ['radio', 'select']
      }
    }
  },
  computed: {
    isVisible () {
      return this.$store.state.calculators.editor.blockEditor.visible;
    },
    blockIndex () {
      return this.$store.state.calculators.editor.blockEditor.index;
    },
    realBlock () {
      return this.$store.state.calculators.editor.calculator.blocks[this.blockIndex];
    },
    dependencies () {
      if (this.block && this.block.content) {
        return this.block.content.dependencies; 
      } else {
        return [];
      }
    },
    calculator () {
      return this.$store.state.calculators.editor.calculator;
    },
    availableDependencyOptions () {
      return this.calculator.blocks.map(b => b.id).filter(b => b.id !== this.block.id);
    }
  },
  watch: {
    realBlock () {
      this.resetBlock();
    }
  },
  components: { DependencyTabs, RulesPanel },
  methods: {
    onCancelBtn () {
      this.$store.commit('calculators/editor/setBlockEditorVisibility', { visible: false });
      this.resetBlock();
    },
    onCloseBtn () {
      this.$store.commit('calculators/editor/storeBlock', { block: this.block });
      this.$store.commit('calculators/editor/setBlockEditorVisibility', { visible: false });
      this.block = this.scratchBlock;
      this.resetBlock();
    },
    focusEditTextDialog () {
      this.$refs.editTextDialog.focus();
    },
    focusEditValueDialog () {
      this.$refs.editValueDialog.focus();
    },
    resetBlock () {
      this.block = _.cloneDeep(this.realBlock);
    },
    onDependenciesChange (newValue) {
      this.block.content.options = this.createOptions(newValue);
    },
    createOptions (tailDeps, prevSelect = []) {
      if (tailDeps.length < 1) {
        return [];
      } else {
        const head = tailDeps[0];
        let optsForDep = this.calculator.blocks.find(b => b.id === head).content.options;
        console.log('prevSelect', prevSelect, 'optsForDep', optsForDep);
        optsForDep = optsForDep.map(o => o.value);
        let options = {};
        for (let opt of optsForDep) {
          options[opt] = this.createOptions(tailDeps.slice(1), [...prevSelect, opt]);
        }
        return options;
      }
    }
  }
}
</script>
