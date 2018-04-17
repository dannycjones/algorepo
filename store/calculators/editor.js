import Vuex from 'vuex';
import _ from 'lodash';

import axios from '~/plugins/axios';

export const state = () => ({
  calculator: null,
  blockEditor: {
    block: null,
    index: -1,
    visible: false
  },
  saving: false,
  dirty: false
});

export const mutations = {
  setCalculator (state, calculator) {
    state.calculator = calculator;
  },
  setBlockEditor (state, { blockIndex }) {
    state.blockEditor.block = _.cloneDeep(state.calculator.blocks[blockIndex]);
    state.blockEditor.index = blockIndex;
  },
  storeBlock (state, block) {
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
    // Do nothing
  },
  updateBlock (state, block) {
    state.blockEditor.block = block;
  },
  moveBlock (state, blockIndex, delta) {
    const block = state.calculator.blocks[blockIndex];
    const newIndex = blockIndex + delta;
    if (newIndex >= 0 && newIndex < state.calculator.blocks.length) {
      state.calculator.blocks.splice(blockIndex, 1); // Delete block
      state.calculator.blocks.splice(newIndex, 0, block); // Reinsert it
    }
  },
  setBlockEditorVisibility(state, visible) {
    state.blockEditor.visible = visible;
  }
};

export const actions = {
  setCalculator ({ commit }, { calculator }) {
    commit('setCalculator', calculator);
  },
  save ({ commit, state }, payload) {
    commit('saving');
    axios.put('/api/calculators/' + state.calculator._id, { calculator: state.calculator }).then(res => {
      commit('saved');
    });
  },
  delete ({ commit }, payload) {
    commit('deleting');
    // commit('deleting');
    window.alert('Not implemented');
    // commit('deleted');
  },
  moveBlockUp ({ commit }, { blockIndex }) {
    commit('moveBlock', blockIndex, -1);
  },
  moveBlockDown ({ commit }, { blockIndex }) {
    commit('moveBlock', blockIndex, +1);
  },
  openBlockInEditor ({ commit, state }, { blockIndex }) {
    commit('setBlockEditorVisibility', true);
    commit('setBlockEditor', { blockIndex });
  },
  closeBlockEditor ({ commit, state }, { save }) {
    commit('setBlockEditorVisibility', false);
    if (save) {
      commit('storeBlock', state.blockEditor.block);
    }
  },
  setBlockEditorVisibility ({ commit }, { visible }) {
    commit('setBlockEditorVisibility', visible);
  },
  updateBlock ({ commit }, { block }) {
    commit('updateBlock', block);
  }
};
