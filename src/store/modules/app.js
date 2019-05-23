import Cookies from 'js-cookie'
import { getData } from '@/api/dict'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    dictData: null,
    videoCount: 0
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    DICT_DATA: (state, dictData) => {
      state.dictData = dictData
    },
    VIDEO_COUNT: (state) => {
      state.videoCount = 0
    },
    VIDEO_COUNT_ADD: (state) => {
      state.videoCount++
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    VideoCount({ commit }) {
      commit('VIDEO_COUNT')
    },
    VideoCountAdd({ commit }) {
      commit('VIDEO_COUNT_ADD')
    },
    SetDictData({ commit }) {
      getData().then((res) => {
        // 模拟请求延迟
        setTimeout(() => {
          commit('DICT_DATA', res.data.list || null)
        }, 2000)
        // commit('DICT_DATA', res.data.list || null)
      })
    }
  }
}

export default app
