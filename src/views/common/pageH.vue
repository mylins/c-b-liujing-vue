<template>
  <el-page-header @back="goBack" :content="!id ? '新增' : '修改'"></el-page-header>
</template>

<script>
  import { isURL } from '@/utils/validate'
  export default {
    props: {
      id: {
        type: Number
      },
      dec: {
        type: String
      },
      type: {
        type: String
      },
      icon: {
        type: String
      },
      opt:{
        type:Object
      }
    },
    computed: {
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
    },
    // created () {
    //   this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
    //   this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    //   this.routeHandle(this.$route)
    // },
    methods: {
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            var tab = this.mainTabs[this.mainTabs.length - 1]
            this.$router.push({ name: tab.name, query: tab.query, params: tab.params }, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({ name: 'home' })
        }
      },
      // 返回
      goBack(){
        this.removeTabHandle(this.mainTabsActiveName)
      },
    }
  }
</script>
