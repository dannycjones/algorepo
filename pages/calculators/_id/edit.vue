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
                        <v-icon :color="`grey ${index <= 0 ? 'lighten-3' : ''}`" @click.stop="moveBlockPos(index, 'up')">arrow_upward</v-icon>
                        <v-icon :color="`grey ${index >= calculator.blocks.length - 1 ? 'lighten-3' : ''}`" @click.stop="moveBlockPos(index, 'down')">arrow_downward</v-icon>
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
    <block-editor-dialog @close="onBlockEditorClose" v-model="blockEditor.visible" v-if="blockEditor.index >= 0" :block-to-edit="calculator.blocks[blockEditor.index]" :all-blocks="calculator.blocks"></block-editor-dialog>
  </div>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';
import BlockEditorDialog from '~/components/calculators/edit/BlockEditorDialog.vue';

export default {
  asyncData ({ params, error }) {
    const initialData = {
      blockEditor: {
        index: -1,
        visible: false
      },
      saving: false,
      deleting: false,
      dirty: false
    };

    return axios.get('/api/calculators/' + params.id)
      .then((res) => {
        return { calculator: res.data, ...initialData };
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Calculator not found' });
      });
  },
  head () {
    return {
      title: `Edit Calculator: ${this.calculator.name}`
    };
  },
  methods: {
    onBlockEditorClose (block) {
      // Vue.JS can't watch direct replacements via index
      this.calculator.blocks.splice(this.blockEditor.index, 1, block);
    },
    openBlockEditor (index) {
      this.blockEditor.visible = true;
      this.blockEditor.index = index;
    },
    moveBlockPos (initialIndex, direction) {
      const block = this.calculator.blocks[initialIndex];
      const delta = direction === 'up' ? -1 : 1;
      const newIndex = initialIndex + delta;
      if (newIndex >= 0 && newIndex < this.calculator.blocks.length) {
        this.calculator.blocks.splice(initialIndex, 1);
        this.calculator.blocks.splice(newIndex, 0, block);
      }
    },
    onSaveClick () {
      this.dirty = false;
      this.saving = true;
      axios.put('/api/calculators/' + this.calculator._id, { calculator: this.calculator }).then(res => {
        console.log('NICE, RESPONSE', res);
        this.saving = false;
      });
    },
    onDeleteClick () {
      this.deleting = true;
      window.alert('Not implemented');
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
      return this.calculator.blocks.map(block => block.id);
    }
  },
  components: {
    BlockEditorDialog
  }
};
</script>
<style scoped>
</style>
