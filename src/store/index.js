  import { createStore } from 'vuex'
  import auth from './auth'
  import userInfo from './userInfo'
  import category from './category'
  import record from './record'


  export default createStore({
    state: {
      error: null
    },
    getters: {
      error:  (s) => s.error
    },
    mutations: {
      setError(state, error){
        state.error = error
      },
      clearError(state, error){
        state.error = null
      }
    },
    actions: {
      async fetchCurrency(){
        const apiKey = '' //Your apiKey from https://api.currencyapi.com
        const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=RUB&currencies=USD,EUR,GEL,RUB`)
        const currencies = await res.json()
        return currencies.data
      },
    
    },
    modules: {
      auth, userInfo, category, record
    }
  })
