import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
// import { IloginState } from './modules/login'
// import { IuserManagerState } from './modules/user-managser'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  // login: IloginState,
  // userManagser: IuserManagerState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
