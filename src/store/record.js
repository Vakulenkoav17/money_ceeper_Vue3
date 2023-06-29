import { getDatabase, ref, push, get } from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const refRecords = ref(database, `users/${uid}/records`);

        return await push(refRecords, record);
      } catch (error) {
        console.log("err");
        commit("setError", error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const refRecords = ref(database, `users/${uid}/records`);

        let records = [];
        await get(refRecords).then((snapshot) => {
          const data = snapshot.val();
          records = data
            ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
            : [];
        });

        return records;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const refRecord = ref(database, `users/${uid}/records/${id}`);

       const record =  await get(refRecord).then((snapshot) => {
          return snapshot.val();
        });
        return {...record, id};
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
};
