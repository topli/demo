import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import routeView from '@/routeView'
const routes = {
  user: () => import('@/views/page/user/index'),
  org: () => import('@/views/page/org/index'),
  role: () => import('@/views/page/role/index'),
  dict: () => import('@/views/page/dict/index'),
  menu: () => import('@/views/page/menu/index'),
  driverTask: () => import('@/views/page/driverTask/index'),
  deviceAttrM: () => import('@/views/page/deviceAttrM/index'),
  deviceReport: () => import('@/views/page/deviceReport/index'),
  monitorDevice: () => import('@/views/page/monitorDevice/index'),
  realWorking: () => import('@/views/page/realWorking/index'),
  realWorkingMap: () => import('@/views/page/realWorkingMap/index'),
  videoDaily: () => import('@/views/page/videoDaily/index'),
  deviceStatus: () => import('@/views/page/deviceStatus/index'),
  deviceError: () => import('@/views/page/deviceError/index'),
  deviceErrorSet: () => import('@/views/page/deviceErrorSet/index'),
  enclosure: () => import('@/views/page/enclosure/index'),
  tasks: () => import('@/views/page/tasks/index'),
  tasksDispatch: () => import('@/views/page/tasksDispatch/index'),
  currentTaskReport: () => import('@/views/page/currentTaskReport/index'),
  deviceErrorReport: () => import('@/views/page/deviceErrorReport/index'),
  realWorkingMonitor: () => import('@/views/page/realWorkingMonitor/index'),
  playback: () => import('@/views/page/playback/index'),
  map: () => import('@/views/page/map/index')
}
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const childRouterMap = {
  path: '',
  component: Layout,
  redirect: '/dashboard',
  name: 'childRouter',
  hidden: true,
  children: [
    { path: 'monitorM/enclosure/edit', name: 'enclosureEdit', meta: { title: 'enclosureAdd' }, component: () => import('@/views/page/enclosure/add') }
  ]
}
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      meta: { title: 'Dashboard', icon: 'home' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/sysInfoM',
    component: Layout,
    name: 'sysInfoM',
    redirect: 'noredirect',
    meta: { title: 'sysInfoM', icon: 'siji' },
    children: [
      {
        path: 'userM',
        name: 'userM',
        component: routeView,
        redirect: 'noredirect',
        meta: { title: 'userM' },
        children: [
          {
            path: 'user',
            name: 'user',
            component: routes['user'],
            meta: { title: 'user' }
          },
          {
            path: 'org',
            name: 'org',
            component: routes['org'],
            meta: { title: 'org' }
          },
          {
            path: 'role',
            name: 'role',
            component: routes['role'],
            meta: { title: 'role' }
          },
          {
            path: 'driverTask',
            name: 'driverTask',
            component: routes['driverTask'],
            meta: { title: 'driverTask' }
          }
        ]
      },
      {
        path: 'deviceM',
        name: 'deviceM',
        component: routeView,
        redirect: 'noredirect',
        meta: { title: 'deviceM' },
        children: [
          {
            path: 'deviceAttrM',
            name: 'deviceAttrM',
            component: routes['deviceAttrM'],
            meta: { title: 'deviceAttrM' }
          },
          {
            path: 'deviceReport',
            name: 'deviceReport',
            component: routes['deviceReport'],
            meta: { title: 'deviceReport' }
          }
        ]
      }
    ]
  },
  {
    path: '/monitorM',
    component: Layout,
    name: 'monitorM',
    redirect: 'noredirect',
    meta: { title: 'monitorM', icon: 'jiankong' },
    children: [
      {
        path: 'monitorDevice',
        name: 'monitorDevice',
        component: routeView,
        redirect: 'noredirect',
        meta: { title: 'monitorDevice' },
        children: [
          {
            path: 'realWorkingMonitor',
            name: 'realWorkingMonitor',
            component: routes['realWorkingMonitor'],
            meta: { title: 'realWorkingMonitor' }
          },
          {
            path: 'realWorkingMap',
            name: 'realWorkingMap',
            component: routes['realWorkingMap'],
            meta: { title: 'realWorkingMap' }
          },
          {
            path: 'playback',
            name: 'playback',
            component: routes['playback'],
            meta: { title: 'playback' }
          }
        ]
      },
      {
        path: 'videoDaily',
        name: 'videoDaily',
        component: routes['videoDaily'],
        meta: { title: 'videoDaily' }
      },
      {
        path: 'deviceAlarmInfo',
        name: 'deviceAlarmInfo',
        // component: routes['deviceError'],
        component: routeView,
        redirect: 'noredirect',
        meta: { title: 'deviceAlarmInfo' },
        children: [
          {
            path: 'deviceError',
            name: 'deviceError',
            component: routes['deviceError'],
            meta: { title: 'deviceError' }
          },
          {
            path: 'deviceErrorSet',
            name: 'deviceErrorSet',
            component: routes['deviceErrorSet'],
            meta: { title: 'deviceErrorSet' }
          }
        ]
      },
      {
        path: 'enclosure',
        name: 'enclosure',
        component: routes['enclosure'],
        meta: { title: 'enclosure' }
      }
    ]
  },
  {
    path: '/taskM',
    component: Layout,
    name: 'taskM',
    redirect: 'noredirect',
    meta: { title: 'taskM', icon: 'shebei' },
    children: [
      {
        path: 'tasks',
        name: 'tasks',
        component: routes['tasks'],
        meta: { title: 'tasks' }
      },
      {
        path: 'tasksDispatch',
        name: 'tasksDispatch',
        component: routes['tasksDispatch'],
        meta: { title: 'tasksDispatch' }
      }
    ]
  },
  {
    path: '/reportCenter',
    component: Layout,
    name: 'reportCenter',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: 'reportCenter', icon: 'reportMenu' },
    children: [
      {
        path: 'currentTaskReport',
        name: 'currentTaskReport',
        component: routes['currentTaskReport'],
        meta: { title: 'currentTaskReport' }
      },
      {
        path: 'deviceErrorReport',
        name: 'deviceErrorReport',
        component: routes['deviceErrorReport'],
        meta: { title: 'deviceErrorReport' }
      },
      {
        path: 'realWorking',
        name: 'realWorking',
        component: routes['realWorking'],
        meta: { title: 'realWorking' }
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: Layout,
    meta: { title: 'map' },
    hidden: true,
    children: [
      {
        path: 'map',
        name: 'map',
        component: routes['map'],
        meta: { title: 'map' }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    name: 'sys',
    redirect: 'noredirect',
    meta: { title: 'sys', icon: 'zuzhi' },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: routes['menu'],
        meta: { title: 'menu' }
      },
      // {
      //   path: 'pages',
      //   name: 'pages',
      //   component: routes['menu'],
      //   meta: { title: 'pages' }
      // },
      {
        path: 'dict',
        name: 'dict',
        component: routes['dict'],
        meta: { title: 'dict' }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap, childRouterMap]
})
