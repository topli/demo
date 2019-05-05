import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
// import enLocale from './en'
// import zhLocale from './zh';

// loading zh lang
const requireAll = requireContext => requireContext.keys().map(requireContext)
const reqZh = requireAll(require.context('./zh', false, /\.js$/))
let zhLocale = {}
reqZh.map(r => {
  zhLocale = Object.assign(zhLocale, r.default)
})
// loading en lang
const reqEn = requireAll(require.context('./en', false, /\.js$/))
let enLocale = {}
reqEn.map(r => {
  enLocale = Object.assign(enLocale, r.default)
})
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  messages // set locale messages
})
export default i18n
