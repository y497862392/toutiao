import { setItem,getItem } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    //一个对象,存储当前登录用户信息 token等信息
    user: getItem(TOKEN_KEY)

  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data 
       setItem(TOKEN_KEY,state.user)
      //为了防止数据刷新，把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
