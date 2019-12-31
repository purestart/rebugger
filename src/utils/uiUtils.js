/*
 * Description:
 * Author:
 * Update:
 */
import store from '../store'
import {
  Message,
  MessageBox
} from 'element-ui'
import Vue from 'vue'
import Utils from './utils'
import router from '../router'
import constant from './constant'

// 这个bus对象用作全局的事件总线,用于一些特殊场景下的组件通讯
const bus = new Vue()
const h = bus.$createElement

class UiUtils extends Utils {
  bus = null
  constructor () {
    super()
    this.bus = bus
  }
  // 消息框简单封装
  message (message, type = 'success', duration = 3000) {
    Message({
      message,
      type,
      duration
    })
  }
  // alert
  alert (content, title = '提示信息', options) {
    return new Promise((resolve) => {
      MessageBox.alert(content, title, {
        type: 'info',
        ...options
      }).then(() => resolve(true)).catch(() => resolve(false))
    })
  }

  confirm (content, title = '确认操作', options) {
    return new Promise((resolve) => {
      MessageBox.confirm(content, title, {
        type: 'warning',
        ...options
      }).then(() => resolve(true)).catch(() => resolve(false))
    })
  }
  // 页面离开的时候，可以弹出提示
  async beforeRouteLeave (to, from, next, content = '有未保存的数据，确定要离开吗？') {
    // session过期的情况，直接放行，不弹提示，这个时候回调到登录页面
    if (this.isEmptyObject(store.state.common.user)) {
      next()
    }
    const re = await this.confirm(content, '确定离开')
    if (re) {
      next()
    }
  }
  // 消息框支持jsx
  msgbox (option) {
    if (option.render) {
      option.message = option.render(h)
      delete option.render
    }
    MessageBox(option)
  }

  /**
   * 显示弹窗的方法
   * @param {string} title 弹窗标题
   * @param content 弹窗内容
   * @param options // 其他选择，透传给element
   * @example
   * 简单方式：dialog('标题', '内容')
   * 弹出组件：dialog('标题', Component)
   * 弹出JSX：dialog('标题', (h) => <Component data={this.data}></Component>)
   */
  dialog (title, content, options = {}) {
    const dialog = {
      title,
      content,
      visible: true,
      options
    }
    store.commit('updateDialog', dialog)
  }
  hideDialog () {
    store.commit('hideDialog')
    store.commit('toggleDialogLoading', false)
  }

  /**
   * 跳转到tab，左侧菜单和顶部标签之外的地方跳转页面
   * @param {string} url
   */
  toTab (url, route, refresh) {
    const flatMenu = store.getters.flatMenu
    const menuTabs = store.state.default.menuTabs
    // 先根据url找到要跳转的菜单对象
    const menu = flatMenu.find((m) => m.menuUrl === url.split('?')[0])
    let key = ''
    if (menu) {
      key = menu.id
      // 判断菜单是否已经在tabs里面打开了
      const item = menuTabs.find((item) => item.key === key)
      // 没有打开，要找到菜单的层级，加到menuTabs里面，然后再跳转
      if (!item) {
        const menus = [menu]
        if (menu.parentId) {
          const menuParent = flatMenu.find((item) => item.id === menu.parentId)
          menus.unshift(menuParent)
        }
        store.commit('updateTabs', {
          key,
          url,
          menus
        })
      } else {
        store.commit('updateTabUrl', {
          item,
          url
        })
      }
      store.commit('updateSelectedTab', key)
    } else {
      if (url.startsWith('/home')) return
      let item = menuTabs.find((item) => item.key === route.name)
      const name = route.meta[route.meta.length - 1]
      if (!item) {
        // // console.log(route.meta);
        // if(route.meta && route.meta.length === 1){
        //   item = {name: route.meta[0], menuUrl: url}
        // }else{
        //   item = {name: route.meta[route.meta.length-1].name, menuUrl: url}
        // }
        store.commit('updateTabs', {
          key: route.name,
          url,
          menus: [{
            name,
            menuUrl: url
          }]
        })
      } else {
        store.commit('updateTabUrl', {
          item,
          url
        })
      }
      store.commit('updateSelectedTab', route.name)
      // const noMenuTabsMap = store.state.default.noMenuTabsMap
      // const noMenuTabsMapReverse = this.reverse(noMenuTabsMap)
      // key = noMenuTabsMapReverse[url]
      // if (key) {
      //   store.commit('updateSelectedTab', key)
      // } else {
      //   key = Math.floor(Math.random() * 20130306) + ''
      //   store.commit('updateTabs', {key, url, menus: [{name, url}]})
      //   store.commit('updateSelectedTab', key)
      //   noMenuTabsMap[key] = url
      // }
    }
    // 跳转一下页面
    router.push(url)
    refresh && bus.$emit('refresh', key)
  }

  /**
   * 关闭当前tab页
   * @param url，关闭后要跳转到哪个页面
   * @param refresh 是否要刷新目标页面
   */
  closeTab (url, refresh) {
    if (url) {
      this.removeTab(store.state.default.selectedTab)
      this.toTab(url, null, refresh)
    } else {
      bus.$emit('remove', store.state.default.selectedTab)
      store.commit('removeTabAndBack', store.state.default.selectedTab)
    }
  }
  // 从tabs移除tab，一般用于单独关闭某个tab页的场景
  removeTab (key) {
    bus.$emit('remove', key)
    store.commit('removeTab', key)
  }
  // 从tabs移除多个tabs，一般用于批量关闭tab页的场景
  removeTabs (command) {
    const oldKeys = store.state.default.menuTabs.map(item => item.key)
    store.commit('removeTabs', command)
    const newKeys = store.state.default.menuTabs.map(item => item.key)
    const delKeys = oldKeys.filter(item => !newKeys.includes(item))
    delKeys.forEach(key => {
      bus.$emit('remove', key)
    })
  }
  // 资源权限验证
  hasAuth (binding) {
    const resources = store.state.default.resources
    if (resources === 'all') {
      return true
    } else {
      return resources.includes(binding.value)
    }
  }

  // 销毁通过keep-alive缓存的组件并删除缓存
  // vue在组件销毁的时候，并不会删除缓存，这会导致再次显示相同组件的时候，会使用上次的缓存
  // 经过查找，发现了keep-alive的缓存所在的位置，所以暴力删除
  destroyAndRemoveCache (component) {
    // 先删掉缓存
    if (component && component.$vnode.parent && component.$vnode.parent.componentInstance) {
      // const key = component.$vnode.componentOptions.Ctor.cid
      const key = component.$vnode.key
      const cache = component.$vnode.parent.componentInstance.cache
      const keys = component.$vnode.parent.componentInstance.keys
      delete cache[key]
      const index = keys.findIndex(item => item === key)
      keys.splice(index, 1)
      // 再销毁组件
      component.$destroy()
    }
  }
  dialogLoading (show) {
    store.commit('toggleDialogLoading', show)
  }
  roleIs (code) {
    return store.state.default.userInfo &&
      store.state.default.userInfo.roleVoList &&
      store.state.default.userInfo.roleVoList.some(r => r.roleCode === code)
  }
  getUserManger (code) {
    return store.state.default.userInfo && store.state.default.userInfo.managerList
      ? (store.state.default.userInfo.managerList.find(r => r.roleCode === code) || {}) : {}
  }
  getUserInfo (key) {
    return store.state.default.userInfo ? store.state.default.userInfo[key] : ''
  }
  getCatrgory (type, list) {
    const names = constant.CategoryMap[type]
    return names.map(name => list.find(item => item.dictdataName === name))
    // const re = [...list.filter(item => names.includes(item.dictdataName))]
    // if (['备案', '合同', '承诺函'].includes(type)) {
    //   re.forEach(d => {
    //     if (d.dictdataName === '橱柜') {
    //       d.label += '(含厨房电器及厨用)'
    //       d.dictdataName += '(含厨房电器及厨用)'
    //     }
    //   })
    // }
  }
  getAreaCode (name) {
    if (/^\d+$/.test(name)) return name
    const area = store.state.default.allAreas.find(a => a.provinceName === name)
    return area ? area.id : ''
  }
  showLoading () {
    store.commit('updateLoading', true)
  }
  hideLoading (time = 0) {
    setTimeout(() => store.commit('updateLoading', false), time)
  }
  closeWindow () {
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
        window.opener = null
        window.close()
      } else {
        window.open('', '_top')
        window.top.close()
      }
    } else if (navigator.userAgent.indexOf('Firefox') > 0) {
      window.location.href = 'about:blank ' // 火狐默认状态非window.open的页面window.close是无效的
    } else {
      window.opener = null
      window.open('', '_self', '')
      window.close()
    }
  }
}
const uiUtils = new UiUtils()
export default uiUtils
