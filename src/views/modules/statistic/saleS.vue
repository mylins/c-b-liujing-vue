<template>
  <div class="">
      <!-- 列表页 -->
      <div>
          <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-date-picker
                    v-model="q.date"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择月份">
                    </el-date-picker>
                </el-col>
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 操作 -->
        <div class="">
            <el-button type="primary" size="small" @click="downTemplate">导出</el-button>
        </div>
        <!-- 统计 -->
        <div class="statics" style="margin-top:10px">
            <div class="left">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;
                <span v-if="$store.state.dept.user.type != 0 && $store.state.dept.user.type != 1">员工销售统计</span>
                <span v-if="$store.state.dept.user.type == 1">加盟商销售统计</span>
                <span v-if="$store.state.dept.user.type == 0">区域代理销售统计</span>
            </div>
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                style="width: 100%">
                <el-table-column
                v-if="$store.state.dept.user.type == 0"
                prop="areaName"
                label="区域代理"
                width="">
                </el-table-column>
                <el-table-column
                v-if="$store.state.dept.user.type == 1"
                prop="deptName"
                label="加盟商"
                width="">
                </el-table-column>
                <el-table-column
                v-if="$store.state.dept.user.type != 0 && $store.state.dept.user.type != 1"
                prop="username"
                label="员工姓名"
                width="">
                </el-table-column>
                <el-table-column
                prop="money"
                label="当月销售额(¥)"
                width="">
                </el-table-column>
                <el-table-column
                prop="count"
                label="当月出单数"
                width="">
                </el-table-column>
                <el-table-column
                prop="allMoney"
                label="销售总额(¥)"
                width="">
                </el-table-column>
                <el-table-column
                prop="allCount"
                label="总出单数"
                width="">
                </el-table-column>
            </el-table>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            dataList:[],
            dataListLoading:false,
            q:{
                date:''
            }
          }
      },
      created(){
          this.getDataList();
      },
      methods:{
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/order/statistics/orderSales'),
                method: 'get',
                params: this.$http.adornParams({
                    'date': this.q.date
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.dataList = data.dataList
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
        },
        // 导出
        downTemplate(){
            window.location.href = this.$http.adornUrl('/product/product/downTemplate?token='+this.$cookie.get("token"))
        }

      }
  }
</script>
<style>
    .statics{
        display: flex;
        height: 39px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        color: rgba(0,0,0,.6);
        line-height: 37px;
        border-radius: 4px;
        padding: 0 10px;
    }
    .statics .left{
        width: 300px;
    }
    .statics .right{
        flex: 1;
        text-align: right;
    }
</style>
