import { auth } from "@/main";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit('setError', error)
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password, name);
        const uid = await dispatch('getUId');
        const database = getDatabase();
        
        await set(ref(database, `/users/${uid}/info`), {
            bill: 1000,
            name: name
          });
        
      } catch (error) {
        commit('setError', error)
        throw error;
      }
    },
    getUId() {
      const user = auth.currentUser;
      return user? user.uid : null;
    },
    logout({commit}) {
      auth.signOut();
      commit('clearInfo')
    }
  },
};
