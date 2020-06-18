<template>
  <div class="">
      <!-- 列表页 -->
      <div>
          <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-date-picker
                        v-model="q.startData"
                        type="date"
                        value-format="yyyy-MM-dd 00:00:00"
                        placeholder="开始日期">
                    </el-date-picker>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-date-picker
                        v-model="q.endData"
                        type="date"
                        value-format="yyyy-MM-dd 23:59:59"
                        placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                style="width: 100%">
                <el-table-column
                prop=""
                label="产品编号"
                width="">
                    <template slot-scope="scope">
                        <open-tab :isMoreL="true" size="medium" type="text" icon="" :dec='scope.row.productId' urlName='productLook' :opt='{"productId":scope.row.productId}'></open-tab>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productSku"
                    label="sku">
                </el-table-column>
                <el-table-column
                    prop="addOrderCounts"
                    label="订单数">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="账号名称">
                </el-table-column>
                <el-table-column
                    prop="deptName"
                    label="账号昵称">
                </el-table-column>
                
            </el-table>
        </div>
      </div>
  </div>
</template>

<script>
  import OpenTab from '../../common/open'
  export default {
      components: {
        OpenTab
      },
      data(){
          return{
            dataList:[],
            dataListLoading:false,
            q:{
                startData:'',
                endData:''
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
                url: this.$http.adornUrl('/order/statistics/allproductStatisticsRank'),
                method: 'post',
                data: this.$http.adornData({
                    startDate:this.q.startData,
                    endDate:this.q.endData,
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.dataList = data.productFranchiseeStatisticsRank100
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
        },

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
