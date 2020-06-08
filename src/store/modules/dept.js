import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

const dept = {
  state: {
    comList: [],
    areaList:[],
    user:{
      areaId:'',
      deptId:'',

    }
  },

  mutations: {
    updateComList: (state, comList) => {
      state.comList = comList
    },
    updateAreaList: (state, areaList) => {
      state.areaList = areaList
    },
    updateUser: (state, user) => {
      state.user = user
    }
  },

  actions: {
    // 修改公司列表
    getComList({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest({
            url: httpRequest.adornUrl('/sys/dept/select'),
            method: 'get',
            params: httpRequest.adornParams()
          }).then(({data}) => {
            if (data.code == 0) {
              commit('updateComList', data.deptList)
              // this.totalPage = data.page.totalCount
            } else {
              this.$notify.error({
                  title: '错误',
                  message: data.msg
              });
            }
          })
      })
    },
    // 修改区域列表
    getAreaList({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest({
            url: httpRequest.adornUrl('/sys/dept/selectAreaList'),
            method: 'get',
            params: httpRequest.adornParams()
          }).then(({data}) => {
            if (data.code == 0) {
              commit('updateAreaList', data.deptList)
            } else {
              this.$notify.error({
                  title: '错误',
                  message: data.msg
              });
            }
          })
      })
    },
    getUser(commit){
      return new Promise((resolve, reject) => {
        httpRequest({
            url: httpRequest.adornUrl('/sys/user/getShow'),
            method: 'get',
            params: httpRequest.adornParams()
          }).then(({data}) => {
            if (data.code == 0) {
              // commit('updateAreaList', data.deptList)
              // this.totalPage = data.page.totalCount
            } else {
              this.$notify.error({
                  title: '错误',
                  message: data.msg
              });
            }
          })
      })
    }
  }
}

export default dept