<template>
  <div>
    <v-card>
      <v-toolbar card prominent>
        <v-toolbar-title>{{ calculator.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn slot="activator" nuxt :to="{ name: 'calculators-id', params: { id: calculator._id } }" icon :disabled="saving || dirty">
          <v-icon>pageview</v-icon>
        </v-btn>
          <span>View Calculator</span>
        </v-tooltip>
        <v-btn @click="onSaveClick" :loading="saving" :disabled="saving || !dirty" icon>
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn @click="onDeleteClick" icon disabled>
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="Name" v-model="calculator.name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Description" v-model="calculator.description" required multi-line></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card>
                <v-list two-line>
                  <template v-for="(block, index) in calculator.blocks">
                    <v-list-tile avatar ripple :key="block.id" @click.stop="openBlockEditor(index)">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ block.label }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ block.id }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ block.type }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon :color="`grey ${index <= 0 ? 'lighten-3' : ''}`" @click.stop="onUpClick(index)">arrow_upward</v-icon>
                        <v-icon :color="`grey ${index >= calculator.blocks.length - 1 ? 'lighten-3' : ''}`" @click.stop="onDownClick(index)">arrow_downward</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < calculator.blocks.length" :key="index"></v-divider>
                  </template>
                </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
    <block-editor-dialog @close="onBlockEditorClose" v-if="blockEditor.index >= 0"></block-editor-dialog>
  </div>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';
import BlockEditorDialog from '~/components/calculators/edit/BlockEditorDialog.vue';

export default {
  data () {
    return {
      blockEditorVisible: false,
      saving: false,
      deleting: false,
      dirty: false
    };
  },
  fetch ({ store, params }) {
    return axios.get('/api/calculators/' + params.id)
      .then((res) => {
        return store.dispatch('calculators/editor/setCalculator', { calculator: res.data });
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Calculator not found' });
      });
  },
  head () {
    return {
      // title: `Edit Calculator: ${this.calculator.name}`
    };
  },
  methods: {
    onBlockEditorClose (block) {
      // Vue.JS can't watch direct replacements via index
      this.calculator.blocks.splice(this.blockEditor.index, 1, block);
    },
    openBlockEditor (blockIndex) {
      this.$store.dispatch('calculators/editor/openBlockInEditor', { blockIndex });
      this.blockEditorVisible = true;
    },
    onUpClick (blockIndex) {
      this.$store.dispatch('moveBlockUp', { blockIndex });
    },
    onDownClick (blockIndex) {
      this.$store.dispatch('moveBlockDown', { blockIndex });
    },
    onSaveClick () {
      this.$store.dispatch('save');
    },
    onDeleteClick () {
      this.$store.dispatch('delete');
    }
  },
  watch: {
    calculator: {
      deep: true,
      handler () {
        this.dirty = true;
      }
    }
  },
  computed: {
    blockIds () {
      return this.$store.state.calculators.editor.calculator.blocks.map(block => block.id);
    },
    calculator () {
      return this.$store.state.calculators.editor.calculator;
    },
    blockEditor () {
      return this.$store.state.calculators.editor.blockEditor;
    }
  },
  components: {
    BlockEditorDialog
  }
};
</script>
<style scoped>
</style>
