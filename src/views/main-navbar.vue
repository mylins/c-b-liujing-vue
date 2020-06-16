<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType+' site-navbar--' + navbarLayoutColor">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">融艺汇 · 跨境</a>
        <a class="site-navbar__brand-mini" href="javascript:;">融艺汇</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix" style="">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold" style="">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="0" @click="tabsRefreshCurrentHandle" style="">
          <i class="el-icon-refresh-right"></i>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge>
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item>
        <!-- <el-menu-item index="2">
          <el-badge value="hot">
            <a href="https://www.renren.io/" target="_blank">官方社区</a>
          </el-badge>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">Git源码</template>
          <el-menu-item index="2-1"><a href="https://github.com/renrenio/renren-fast-vue" target="_blank">前端</a></el-menu-item>
          <el-menu-item index="2-2"><a href="https://gitee.com/renrenio/renren-fast" target="_blank">后台</a></el-menu-item>
          <el-menu-item index="2-3"><a href="https://gitee.com/renrenio/renren-generator" target="_blank">代码生成器</a></el-menu-item>
        </el-submenu> -->
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom" trigger="click">
            <span class="el-dropdown-link" style="display:inline-block;line-height:59px">
              <!-- <img src="~@/assets/img/avatar.png" :alt="userName"> -->
              <i class="el-icon-s-custom"></i>{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updateUser()">基本资料</el-dropdown-item>
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
    <!-- 基本资料 -->
    <update-user v-if="updateUserVisible" ref="updateUser"></update-user>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import UpdateUser from './main-navbar-update-user'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        updateUserVisible:false
      }
    },
    components: {
      UpdatePassword,UpdateUser
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      navbarLayoutColor: {
        get () { return this.$store.state.common.navbarLayoutColor }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName ) {
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
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        var tab = this.$route
        this.removeTabHandle(tab.name)
        this.$nextTick(() => {
          this.$router.push({ name: tab.name, query: tab.query, params: tab.params })
        })
      },
      updateUser(){
        this.updateUserVisible = true
        this.$nextTick(() => {
          this.$refs.updateUser.init()
        })
      }
    }
  }
</script>
