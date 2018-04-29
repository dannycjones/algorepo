import Vuex from 'vuex';
import _ from 'lodash';

import axios from '~/plugins/axios';

export const state = () => ({
  calculator: null,
  blockEditor: {
    index: -1,
    visible: false
  },
  saving: false,
  dirty: false
});

export const mutations = {
  setCalculator (state, { calculator }) {
    state.calculator = calculator;
  },
  setCalculatorFields (state, { name = null, description = null }) {
    if (name !== null) {
      state.calculator.name = name;
    }
    if (description !== null) {
      state.calculator.description = description;
    }
  },
  setBlockEditorIndex (state, { blockIndex }) {
    state.blockEditor.index = blockIndex;
  },
  storeBlock (state, { block }) {
    state.calculator.blocks.splice(state.blockEditor.index, 1, block);
  },
  dirty (state) {
    state.dirty = true;
  },
  saving (state) {
    state.dirty = false;
    state.saving = true;
  },
  saved (state) {
    state.saving = false;
  },
  deleting (state) {
    state.deleting = true;
  },
  deleted (state) {
    state.deleting = false;
  },
  moveBlock (state, { blockIndex, delta }) {
    const block = state.calculator.blocks[blockIndex];
    const newIndex = blockIndex + delta;
    if (newIndex >= 0 && newIndex < state.calculator.blocks.length) {
      state.calculator.blocks.splice(blockIndex, 1); // Delete block
      state.calculator.blocks.splice(newIndex, 0, block); // Reinsert it
    }
  },
  appendBlock (state, { block }) {
    state.calculator.blocks.push(block);
  },
  setBlockEditorVisibility(state, { visible }) {
    state.blockEditor.visible = visible;
  }
};

export const actions = {
  addNewBlock ({ commit, state }, { type }) {
    const block = {
      id: Date.now(),
      type,
      content: null,
      label: '',
      display: true
    };

    if (type === 'input') {
      block.content = {
        dependencies: [],
        display: 'radio',
        options: []
      };
    } else if (type === 'conditional') {
      block.content = {
        rules: [],
        dependencies: []
      };
    }

    commit('appendBlock', { block });
    commit('setBlockEditorIndex', { blockIndex: state.calculator.blocks.length - 1 });
    commit('setBlockEditorVisibility', { visible: true });
  },
  save ({ commit, state }, payload) {
    commit('saving', {});
    axios.put('/api/calculators/' + state.calculator._id, { calculator: state.calculator }).then(res => {
      commit('saved', {});
    });
  },
  delete ({ commit }, payload) {
    commit('deleting');
    // commit('deleting', {});
    window.alert('Not implemented');
    // commit('deleted', {});
  },
  openBlockInEditor ({ commit, state }, { blockIndex }) {
    commit('setBlockEditorVisibility', { visible: true });
    commit('setBlockEditorIndex', { blockIndex });
  }
};
