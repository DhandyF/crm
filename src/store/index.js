import Vue from 'vue'
import Vuex from 'vuex'
import { getCallLogs, getContactList, storeCallLog, updateContact } from '@/api/crm';
import { getAxiosErrorMessage } from '@/lib/helper';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    callLogs: [],
  },
  getters: {
    contactList: state => state.contacts,
    callLogs: state => state.callLogs,
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    updateContacts(state, updatedContact) {
      const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
      if (index > -1) {
        Vue.set(state.contacts, index, updatedContact);
      }
    },
    setCallLogs(state, callLogs) {
      state.callLogs = callLogs;
    },
    addCallLog(state, callLog) {
      state.callLogs.push(callLog);
    },
  },
  actions: {
    async fetchContactList({ commit, state }, params) {
      try {
        if (state.contacts.length <= 0) {
          const response = await getContactList(params);
          const contacts = response?.data ?? [];
          commit('setContacts', contacts);
        }
      } catch (error) {
        console.error('Failed to fetch contact: ', getAxiosErrorMessage(error));
      }
    },
    async setFavoriteContact({ commit }, params) {
      try {
        const response = await updateContact(params, params.contactId);
        const updatedContact = response?.data ?? {};
        commit('updateContacts', updatedContact);

      } catch (error) {
        console.error('Failed to update contact: ', getAxiosErrorMessage(error));
      }
    },
    async fetchCallLogs({ commit, getters }) {
      try {
        if (getters.callLogs.length <= 0) {
          const response = await getCallLogs();
          const callLogs = response?.data ?? [];
          commit('setCallLogs', callLogs);
        }
      } catch (error) {
        console.error('Failed to fetch call logs: ', getAxiosErrorMessage(error));
      }
    },
    async storeCallLog({ commit }, params) {
      try {
        const response = await storeCallLog(params);
        const callLog = response?.data ?? {};
        commit('addCallLog', callLog);
      } catch (error) {
        console.error('Failed to add call log: ', getAxiosErrorMessage(error));
      }
    },
  },
  modules: {
  }
})
