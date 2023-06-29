import { getDatabase, ref, get, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const infoRef = ref(database, `users/${uid}/info`);

        const snapshot = await get(infoRef);
        const info = snapshot.val();
       

        commit("setInfo", info);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateInfo({ dispatch, commit, getters }, updateData) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const infoRef = ref(database, `users/${uid}/info`);

        const updatedInfo = { ...getters.info, ...updateData };

        update(infoRef, updatedInfo);
        commit("setInfo", updatedInfo);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
