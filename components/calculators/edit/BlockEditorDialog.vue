<template>
  <v-dialog v-model="isVisible" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Block Editor</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="block.id" label="Block ID" required></v-text-field>
        <v-text-field v-model="block.label" label="Block Label"></v-text-field>
        <v-radio-group label="Block Type" v-model="block.type" row>
          <v-radio v-for="blockType in availableOptions.types" :key="blockType" :label="blockType" :value="blockType"></v-radio>
        </v-radio-group>
        <template v-if="block.type === 'input'">
          <v-select v-model="block.content.type" label="Input Type" :items="availableOptions.inputTypes"></v-select>
          <template v-if="block.content.type === 'options'">
            <v-select v-model="block.content.dependencies" label="Dependencies" chips multiple :items="availableOptions.dependencies"></v-select>
            <v-card v-if="block.content.dependencies.length > 0">
              <!-- <DependencyTabs :dependencies="block.content.dependencies"></DependencyTabs> -->
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
          <v-select v-model="block.content.dependencies" label="Dependencies" chips multiple :items="availableOptions.dependencies"></v-select>
          <rules-panel :rules="block.content.rules"></rules-panel>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" flat @click.native="onCancelBtn">Cancel</v-btn>
        <v-btn color="blue" flat @click.native="onCloseBtn">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash';

// import DependencyTabs from './DependencyTabs.vue';
import RulesPanel from './RulesPanel.vue';

export default {
  model: {
    prop: 'visible',
    event: 'visibilityChange'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    block: {
      type: Object,
      required: true
    }
  },
  data () {
    const { calculator } = this.$store.state.calculators.editor;
    return {
      scratchBlock: _.cloneDeep(this.block),
      availableOptions: {
        types: ['input', 'formula', 'conditional'],
        inputTypes: ['options', 'number'],
        dependencies: calculator.blocks.map(b => b.id)
      }
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible;
      },
      set (value) {
        this.emit('visibilityChange', value);
      }
    }
  },
  components: { RulesPanel },
  methods: {
    onCancelBtn () {
      this.isVisible = false;
      this.resetBlock();
    },
    onCloseBtn () {
      this.isVisible = false;
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
      this.scratchBlock = _.deepCopy(this.block);
    }
  }
}
</script>
