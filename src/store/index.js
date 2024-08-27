import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        schadeOpgenomen: [
        ],
    },

    // inject:[this.loading = false],
    

  getters: {
    allSchades: (state) => state.schadeOpgenomen 
  },

  //aanroepen functies
  actions: {
    async fetchSchades({ commit }) {
      const response = await axios.get('https://first-server-hizr.onrender.com/schade')
      this.loading = false
      const sortedData = response.data.sort((d1, d2) => (d1.Datum > d2.Datum) ? 1 : (d1.Datum < d2.Datum) ? -1 : 0)
      commit('setSchades', sortedData)
    },
  

    async addSchadeOpnemen ({ commit }, newSchade ) {
        const response = await axios.post('https://first-server-hizr.onrender.com/schade', {...newSchade})
        commit('newSchadeOpnemen', response.data)
    },
    
    
  async deleteRapport({ commit }, _id) {
    await axios.delete(`https://first-server-hizr.onrender.com/schade/${_id}`);
    commit('removeSchadeOpnemen', _id)
  }

},


    // functies
    mutations: {
      setSchades: (state, schadeOpgenomen ) => (state.schadeOpgenomen = schadeOpgenomen),
      newSchadeOpnemen: (state, schade ) => state.schadeOpgenomen.unshift(schade), 
      removeSchadeOpnemen:(state, _id) => state.schadeOpgenomen = state.schadeOpgenomen.filter(Schade => Schade._id !==_id)
    },

  //toevoegen van modules
  modules: {}
})
