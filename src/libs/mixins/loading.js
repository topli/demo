/**
 * 混合等待状态
 */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loadingText: '加载中...'
    }
  },
  computed: {
    ...mapGetters(['actionLoading'])
  }
}
