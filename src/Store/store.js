export const Store = {
  state:{
    regions:[],
    phoneNumber:"",
    verifyNumber:"",
    VienAPIPath:"http://61.155.196.50:53761"
  },
  getters:{
    regions:(state)=>{
      return state.regions;
    },
    phoneNumber:(state)=>{
      return state.phoneNumber;
    },
    VienAPIPath:(state)=>{
      return state.VienAPIPath;
    },
    verifyNumber:(state)=>{
      return state.verifyNumber;
    },
  },
  actions:{
    setRegions:(context,payload)=>{
      context.commit('setRegions',payload)
    },
    setPhoneNumber:(context,payload)=>{
      context.commit('setPhoneNumber',payload)
    },
    setVerifyNumber:(context,payload)=>{
      context.commit('setVerifyNumber',payload)
    },
  },
  mutations:{
    setRegions(state,payload){
      state.regions = payload.regions;
    },
    setPhoneNumber(state,payload){
      state.phoneNumber = payload.phoneNumber;
    },
    setVerifyNumber(state,payload){
      state.verifyNumber = payload.verifyNumber;
    },
  }
};
