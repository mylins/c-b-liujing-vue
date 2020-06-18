<template>
  <div class="">
    <div class="tabDiv">
        <div class="tabItemDiv" :class="tabActive == '0' ? 'active' : ''" @click="tabClick('0')">区域排名</div>
        <div class="tabItemDiv" :class="tabActive == '1' ? 'active' : ''" @click="tabClick('1')">加盟商排名</div>
        <div class="tabItemDiv" :class="tabActive == '2' ? 'active' : ''" @click="tabClick('2')">账号排名</div>
    </div>



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
                    v-if="tabActive == '0'"
                    prop="deptName"
                    label="区域">
                </el-table-column>
                <el-table-column
                    v-if="tabActive == '0'"
                    prop="companyPerson"
                    label="负责人">
                </el-table-column>
                <el-table-column
                    v-if="tabActive == '1'"
                    prop="deptName"
                    label="公司">
                </el-table-column>
                <el-table-column
                    v-if="tabActive == '1'"
                    prop="companyPerson"
                    label="负责人">
                </el-table-column>
                <el-table-column
                    v-if="tabActive == '2'"
                    prop="userName"
                    label="账号名称">
                </el-table-column>
                <el-table-column
                    v-if="tabActive == '2'"
                    prop="nickName"
                    label="账号昵称">
                </el-table-column>
                <el-table-column
                    prop="salesVolume"
                    label="销售额"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="addOrderCounts"
                    label="订单数"
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
            allList:{
                areaNumberStatisticsTop100:[],
                allFranchinseeStatisticsRank:[],
                accountNumberStatisticsTop100:[]
            },
            dataList:[],
            dataListLoading:false,
            q:{
                startData:'',
                endData:''
            },
            tabActive:'0'
          }
      },
      created(){
          this.getDataList();
      },
      methods:{
        tabClick(name){
            this.tabActive = name;
            if(this.tabActive == '0'){
                this.dataList = this.allList.areaNumberStatisticsTop100;
            }else if(this.tabActive == '1'){
                this.dataList = this.allList.allFranchinseeStatisticsRank;
            }else{
                this.dataList = this.allList.accountNumberStatisticsTop100;
            }
            
        },
        // 获取数据列表
        getDataList () {
            console.log(this.q);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/order/statistics/allOrderStatisticsRank'),
                method: 'post',
                data: this.$http.adornData({
                    startDate:this.q.startData,
                    endDate:this.q.endData,
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.allList.areaNumberStatisticsTop100 = data.areaNumberStatisticsTop100;
                    this.allList.allFranchinseeStatisticsRank = data.allFranchinseeStatisticsRank;
                    this.allList.accountNumberStatisticsTop100 = data.accountNumberStatisticsTop100;
                    if(this.tabActive == '0'){
                        this.dataList = this.allList.areaNumberStatisticsTop100;
                    }else if(this.tabActive == '1'){
                        this.dataList = this.allList.allFranchinseeStatisticsRank;
                    }else{
                        this.dataList = this.allList.accountNumberStatisticsTop100;
                    }
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
    .tabDiv{
        display: flex;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
    }
    .tabDiv>div{
        position: relative;
        bottom: -2px;
        padding: 10px 16px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }
    .tabDiv>div.active{
        border-bottom: 2px solid #459cf8;
        color: #459cf8;
    }
</style>
