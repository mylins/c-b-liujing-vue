<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    computed:{
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          // console.log(that.screenWidth)
          if(that.screenWidth<768){
            that.sidebarFold = true
          }else{
            that.sidebarFold = false
          }
        })()
      }
    }
  }
</script>
