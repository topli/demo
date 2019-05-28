<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="app-title">
      <transition name="el-fade-in" mode="out-in">
        <span v-if="sidebar.opened">{{ $t('app.appTitle') }}</span>
        <span v-else>{{ $t('app.appShortTitle') }}</span>
        <!-- <img v-else src="/favicon.ico" style="width: 100%"> -->
      </transition>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
