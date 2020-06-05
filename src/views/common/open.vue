<template>
  <el-button v-if="!product" :type="type" :size="size" :icon="icon" @click="open">{{dec}}</el-button>
  <!-- <el-button v-if="!product" :type="type" :size="size" :icon="icon" @click="$router.push({ name: urlName,params: opt,meta:{title:opt.productId} })">{{dec}}</el-button> -->
  <el-button v-else :type="type" size="small" :icon="icon" @click="toProduct">{{dec}}</el-button>
</template>

<script>
  import { isURL } from '@/utils/validate'
  export default {
    props: {
      urlName: {
        type: String
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
      },
      product:{
        type:Boolean
      },
      size:{
        type:String,
        default:'small'
      },
      isMore:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加

          var tab = this.mainTabs.filter(item => item.name === route.name)[0];
          // if (!tab || route.title != tab.title ) {
          if (!tab) {
            console.log(1111);
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      },
      toProduct(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http({
          url: this.$http.adornUrl('/product/product/getproductid'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data);
            this.$router.push({ name: this.urlName,params: {productId:null,obj:data.product,title:this.dec} })
            // this.dataForm = data.product;
            loading.close();
          }
        })
      },
      open(){
        console.log(this.isMore);
        if(this.isMore){
          let id = this.opt.productId ? this.opt.productId : this.opt.orderId;
          let decTitle = this.opt.productId ? '产品表单' : '订单表单'
          let title = id+decTitle;
          let name = this.urlName+id;

          this.$router.addRoutes([{
            path: '/',
            component: () => import('../main'),
            name: 'main',
            children:[{
              path: '/'+name, 
              component: () => import('../modules/product/product-add-or-update'), 
              name: name, 
              meta: { title: title, isTab: true } 
            }]
          }])
          this.$router.push({ name: name,params: this.opt})
        }else{
          this.$router.push({ name: this.urlName,params: this.opt})
        }
      }
    }
  }
</script>
