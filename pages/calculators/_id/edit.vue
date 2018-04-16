<template>
  <div>
    <v-card>
      <v-toolbar card prominent>
        <v-toolbar-title>{{ calculator.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn icon>
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
    <block-editor-dialog v-model="blockEditor.visible" v-if="blockEditor.index >= 0" :block-to-edit="calculator.blocks[blockEditor.index]" :all-blocks="calculator.blocks"></block-editor-dialog>
  </div>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';
import CalculatorForm from '~/components/CalculatorForm.vue';
import BlockEditorDialog from '~/components/calculators/edit/BlockEditorDialog.vue';

export default {
  asyncData ({ params, error }) {
    const initialData = {
      blockEditor: {
        index: -1,
        visible: false
      }
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
    }
  },
  computed: {
    blockIds () {
      return this.calculator.blocks.map(block => block.id);
    }
  },
  components: {
    CalculatorForm,
    BlockEditorDialog
  }
};
</script>
<style scoped>
</style>
