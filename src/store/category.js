import { getDatabase, ref, push, get, update, remove } from 'firebase/database'


export default {
  actions:{
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUId');
        const database = getDatabase();
        const categoryRef = ref(database, `/users/${uid}/categories`);
        let categories = [];
    
        const snapshot = await get(categoryRef);
        const data = snapshot.val();
    
        if (data) {
          categories = Object.keys(data).map(key => ({ ...data[key], id: key }));
        }
    
        return categories;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },   
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUId");
        const database = getDatabase();
        const refRecord = ref(database, `users/${uid}/categories/${id}`);
        const category =  await get(refRecord).then((snapshot) => {
          return snapshot.val();
        });
        return {...category, id};
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateCategory({commit, dispatch},{title,limit, current}){
      try {
        const uid = await dispatch('getUId')
        const database = getDatabase()
        const categoryRef = ref(database, `/users/${uid}/categories/${current}`)
        update(categoryRef,{title, limit})

      } catch (error) {
        commit('setError',error)
        throw error
      }

    },
    async createCategory({commit, dispatch},{title,limit}){
      try {
        const uid = await dispatch('getUId')
        const database = getDatabase()
        const categoryRef = ref(database, `/users/${uid}/categories`)
        const newCategoryRef = push(categoryRef, { title, limit })
        const categoryId = newCategoryRef.key

        return {title, limit, id: categoryId}

      } catch (error) {
        commit('setError',error)
        throw error
      }
    },
    async removeCategory({commit, dispatch}, id){
      try {
        const uid = await dispatch('getUId')
        const database = getDatabase()
        const categoryRef = ref(database, `/users/${uid}/categories/${id}`)
        const records = await dispatch("fetchRecords");

        remove(categoryRef)
        records.filter((r) => r.categoryID === id)
        .forEach(r=>{
          const recordRef = ref(database, `/users/${uid}/records/${r.id}`)
          remove(recordRef)
        })

      } catch (error) {
        commit('setError',error)
        throw error
      }
    }
  }
}