import Vue from 'vue'
import httpRequest from '@/utils/httpRequest'

const dept = {
  state: {
    comList: [],
  },

  mutations: {
    updateComList: (state, comList) => {
      state.comList = comList
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
  }
}

export default dept