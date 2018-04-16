<template>
  <div>
    <v-dialog v-model="visible" persistent max-width="500px">
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
            <v-select v-model="block.content.dependencies" label="Dependencies" chips multiple :items="availableOptions.dependencies"></v-select>
            <v-card v-if="block.content.dependencies.length > 0">
              <DependencyTabs :block="block" :dependencies="block.content.dependencies" :all-blocks="allBlocks"></DependencyTabs>
            </v-card>
          </template>
          <template v-if="block.type === 'formula'">
            <v-text-field v-model="block.content" label="Formula" required hint="Details about the expressions and functions can be found in the FAQ."></v-text-field>
          </template>
          <template v-if="block.type === 'conditional'">
            <v-select v-model="block.content.dependencies" label="Dependencies" chips multiple :items="availableOptions.dependencies"></v-select>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click.native="closeBlockEditor">Cancel</v-btn>
          <v-btn color="blue" flat @click.native="onBlockEditorCloseBtn">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

import DependencyTabs from './DependencyTabs.vue';

export default {
  props: {
    blockToEdit: {
      type: Object,
      required: true
    },
    allBlocks: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      block: _.cloneDeep(this.blockToEdit),
      availableOptions: {
        types: ['input', 'formula', 'conditional'],
        dependencies: this.allBlocks.map(b => b.id)
      },
      tab: 0
    }
  },
  computed: {
    visible: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    }
  },
  components: { DependencyTabs },
  watch: {
    blockToEdit: {
      handler (newValue) {
        this.block = _.cloneDeep(newValue);
      },
      deep: true
    }
  },
  methods: {
    closeBlockEditor () {
      this.visible = false;
    },
    onBlockEditorCloseBtn () {
      // this.calculator.blocks[this.index] = this.block;
      this.closeBlockEditor();
    },
    focusEditTextDialog () {
      this.$refs.editTextDialog.focus();
    },
    focusEditValueDialog () {
      this.$refs.editValueDialog.focus();
    }
  }
}
</script>