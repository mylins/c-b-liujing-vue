<template>
  <div class="">
      <!-- 列表页 -->
      <div>
        <!-- 搜索 -->
        <div class="sous sous1">
            <el-row :gutter="20">
                
                <el-col :span="12">
                    <el-row>
                        <label class="labelSS">订单ID：</label>
                        
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.orderId">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <label class="labelSS">亚马逊订单ID：</label>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.amazonOrderId">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <label class="labelSS">国内物流单号：</label>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.domesticWaybill">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <label class="labelSS">国际物流单号：</label>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.abroadWaybill">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                
                <el-col :span="24">
                    <div style="float:right">
                        <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                        <el-button type="" icon="el-icon-refresh" size="medium" @click="clean">重置</el-button>
                    </div>
                    
                </el-col>
            </el-row>
        </div>
        <!-- 筛选 -->
        <div style="margin:16px 0">
            <div class="tag-group" v-if="orderStatusList.length != 0">
                <span class="tag-group__title">订单状态</span>
                <span 
                    v-for="(item,index) in orderStatusList"
                    :key="item.code"
                    @click="auditClick(item.code)"
                    class="el-tag el-tag--medium" 
                    :style="item.code == orderStatusValue ? {'background':color[index],'color':'#fff','border':'1px solid '+color[index]} : {'color':color[index],'background':'#fff','border':'1px solid '+color[index]}">{{ item.value }} ({{item.count}})</span>
            </div>
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <el-table-column
                prop="productId"
                label="订单号"
                width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.orderId}}</span>
                    <br>
                    <el-image
                        style="width: 25px; height: 13px"
                        :src="require('@/assets/img/'+scope.row.countryCode+'.jpg')"></el-image>
                    <span>{{comObj[scope.row.countryCode]}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="buyDate"
                label="下单时间"
                width="100">
                </el-table-column>
                <el-table-column
                prop=""
                label="公司"
                width="100">
                    <template slot-scope="scope">
                        <div>{{scope.row.deptName}}</div>
                        <!-- <span>操作人：{{scope.row.userName}}</span> -->
                        <span style="font-size:13px" v-if="scope.row.userName">({{scope.row.userName}})</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                align="center"
                label="图片"
                width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="right-start" effect="light">
                            <div slot="content">
                                <el-image
                                style="width: 300px; height: 300px"
                                :src="scope.row.productImageUrl"></el-image>
                            </div>
                                <el-image
                                style="width: 60px; height: 60px"
                                :src="scope.row.productImageUrl"></el-image>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                prop="productId"
                label="亚马逊单号"
                width="200">
                    <template slot-scope="scope">
                        <el-tooltip v-if="scope.row.abroadRemark" :content="scope.row.abroadRemark" placement="bottom" effect="light">
                            <i class="el-icon-s-opportunity" style="color:#F56C6C"></i>
                        </el-tooltip>
                        <el-tooltip v-if="scope.row.generalRemark" :content="scope.row.generalRemark" placement="bottom" effect="light">
                            <i class="el-icon-s-flag" style="color:#F56C6C"></i>
                        </el-tooltip>
                        <open-tab :isMore="true" size="medium" type="text" icon="" :dec='scope.row.amazonOrderId' urlName='orderAddUpdateCk' :opt='{"orderId":scope.row.orderId}'></open-tab>
                        <!-- <open-tab size="medium" type="text" icon="" :dec='scope.row.amazonOrderId' urlName='productAddUpdate' :opt='{"orderId":scope.row.orderId}'></open-tab> -->
                        <br>
                        <el-image
                            style="width: 15px; height: 15px"
                            :src="require('@/assets/img/yamaxun.jpg')"></el-image>
                        <span style="vertical-align:text-bottom">{{scope.row.shopName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="orderNumber"
                label="数量"
                width="100">
                </el-table-column>
                <!-- <el-table-column
                prop="purchasePrice"
                label="采购价"
                width="100">
                </el-table-column> -->
                <el-table-column
                prop=""
                label="国内物流单号"
                width="">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.domesticWaybillList" :key="item.domesticLogisticsId">
                            <span>{{item.waybill}}</span>
                            <el-button v-if="item.state == '未签收'" type="text" icon="" @click="rukuClick1(item)">入库</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="abroadWaybill"
                label="国际物流单号"
                width="">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.abroadWaybillList" :key="item.abroadLogisticsId">
                            <span>{{item.abroadWaybill}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="订单状态"
                width="100">
                    <template slot-scope="scope">
                        <span 
                            class="el-tag el-tag--medium" 
                            :style="{'color':color[states.indexOf(scope.row.orderState)],'background':'#fff','border':'1px solid '+color[states.indexOf(scope.row.orderState)]}">
                            {{ scope.row.orderState }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="profitRate"
                label="异常状态"
                width="100">
                    <template slot-scope="scope">
                        <span 
                            v-if="scope.row.abnormalStatus"
                            class="el-tag el-tag--medium" 
                            :style="{'color':color1[states1.indexOf(scope.row.abnormalState)],'background':'#fff','border':'1px solid '+color1[states1.indexOf(scope.row.abnormalState)]}">
                            {{ scope.row.abnormalState }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.orderStatus =='InShipped'" type="text" icon="" @click="rukuClick(scope.row.orderId)">入库</el-button>
                        <el-button v-if="scope.row.orderStatus =='Warehousing'" type="text" icon="" @click="chukuClick(scope.row)">出库</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[20, 30, 50]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
      </div>
       
  </div>
</template>

<script>
  import OpenTab from '../../common/open'
//   import ProductPiliang from './product-piliang'
  
  export default {
    components: {
        OpenTab,
        // ProductPiliang
    },
      data(){
          return{
            orderId:'',
            ids:[],
            yichangValue:'',
            yichangList:[],
            yichangVisible:false,
            productD:{},
            luruId:'',
            luruVisible:false,
            returnMoney:'',
            returnMVisible:false,
            stateList:[],
            statisticsProfit:{},
            color:['#409EFF','#fb4f4f','#f7915f','#eaa729','#a8de06','#45e63c','#4bd2ba','#07dbf3','#2592f1','#9d7bec'],
            color1:['#409EFF','#f7915f','#eaa729','#fb4f4f','#c552f3','#ea6320','#f97171'],
            states:['','已付款','虚发货','已采购','已发货','仓库已入库','仓库已出库','国际已发货','已完成'],
            states1:['','缺货','补发','问题','退款','国际物流异常','国内物流异常'],
            q:{
                startDate:'',
                endDate:'',
                orderId:'',
                amazonOrderId:'',
                productId:'',
                productSku:'',
                productAsin:'',
                domesticWaybill:'',
                abroadWaybill:''
            },
            dataListLoading:true,
            nowProTypeId:[],
            dataList:[],
            piliangVisible:false,
            selectedRowKeys:[],
            orderStatusValue:'',
            orderStatusList:[],
            abnormalStatusValue:'',
            abnormalStatusList:[],
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            dataListSelections:[],
            comObj:{
                'US':'美国',
                'JP':'日本',
                'ES':'西班牙',
                'FR':'法国',
                'GB':'英国',
                'IT':'意大利',
                'DE':'德国',
                'BR':'巴西',
                'CA':'加拿大',
                'MX':'墨西哥',
                'AU':'澳大利亚',
                'NL':'荷兰'
            }
          }
      },
      created(){
        //   this.getMyStatusList();
          this.getDataList();
        //   this.visibleChange();
      },
      methods:{
        auditClick(num){
            this.auditValue = num;
            this.getDataList();
        },
        productTypeClick(num){
            this.productTypeValue = num;
            this.getDataList();
        },
        uploadClick(num){
            this.uploadValue = num;
            this.getDataList();
        },
        // 展示列为红色
        tableRowClassName({row, rowIndex}){
            if(row.isRed == 1){
                return 'danger-row';
            }
        },
        // 获取订单状态列表
        getMyStatusList () {
            this.$http({
                url: this.$http.adornUrl('/sys/sysdict/mystatuslist'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.orderStatusList = data.auditList;
                    this.abnormalStatusList = data.productTypeList;
                    this.orderStatusList.unshift({
                        code:'',
                        value:'全部',
                        count:data.allCounts
                    })
                    this.abnormalStatusList.unshift({
                        code:'',
                        value:'全部',
                        count:data.allCounts
                    })
                    // console.log(this.$store.state.dept)
                } else {
                    
                }
            })
        },
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/order/order/depotOrderList'),
                method: 'get',
                params: this.$http.adornParams({
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                    'shopName': this.q.shopName,
                    'orderId': this.q.orderId,
                    'amazonOrderId': this.q.amazonOrderId,
                    'productId':this.q.productId,
                    'productSku': this.q.productSku,
                    'productAsin': this.q.productAsin,
                    'domesticWaybill': this.q.domesticWaybill,
                    'abroadWaybill':this.q.abroadWaybill,
                    'startDate':this.q.startDate,
                    'endDate':this.q.endDate,
                    'abnormalStatus':this.abnormalStatusValue,
                    'orderStatus':this.orderStatusValue
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataList = data.page.list
                    this.totalPage = data.page.totalCount
                    console.log(this.$store.state.dept)
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
        },
        // 重置
        clean(){
            this.q = {
                startDate:'',
                endDate:'',
                orderId:'',
                amazonOrderId:'',
                productId:'',
                productSku:'',
                productAsin:'',
                domesticWaybill:'',
                abroadWaybill:''
            }
            this.getDataList();
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getDataList()
        },
        // 多选
        selectionChangeHandle (val) {
            this.dataListSelections = val
        },
        // 删除
        del(){
            console.log(this.dataListSelections);
            var productIds = this.dataListSelections.map(item => {
                return item.productId
            })
            console.log(productIds)
            if(productIds.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }
            this.$confirm('确定对选项进行删除操作?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                this.$http({
                    url: this.$http.adornUrl('/product/product/falsedeletion'),
                    method: 'post',
                    data: this.$http.adornData(productIds, false)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList()
                            this.getMyStatusList();
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    loading.close()
                    }
                })
            }).catch(() => {})
        },
        // 退款
        returnM(){
            // this.returnMoney  退款金额
            if(this.returnMoney = ''){
                this.$message({
                    message: '请填写退款金额',
                    type: 'warning'
                });
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl('/product/product/mylist'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'amazonOrderId': this.orderId,
                        'returnCost': this.returnMoney,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList();
                                this.returnMoney = ''
                                loading.close()
                            }
                        })
                        
                    } else {
                        this.$message.error(data.msg)
                        loading.close();
                    }
                })
            }
            
        },
        // 标记异常
        biaojiClick(){
            var orderIds = this.dataListSelections.map(item => {
                return item.productId
            })
            if(this.dataListSelections.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }
            this.yichangVisible = true;
        },
        // 标记异常确定
        biaojiClickOk(){
            var orderIds = this.dataListSelections.map(item => {
                return item.productId
            })
            let label = this.yichangList.find(item => item.dataNumber == this.yichangValue)
            this.$confirm('确定标记选中订单状态?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                this.$http({
                    url: this.$http.adornUrl('/order/order/updateAbnormalState'),
                    method: 'post',
                    data: this.$http.adornData({
                        'orderIds':orderIds,
                        'abnormalStatus':this.yichangValue,
                        'abnormalState':label
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList();
                            this.yichangValue = '';
                            loading.close()
                        }
                    })
                    } else {
                        this.$message.error(data.msg)
                        loading.close()
                    }
                })
            }).catch(() => {})

        },
        // 入库
        rukuClick(id){
            this.$confirm('该订单确定入库?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl('/order/order/allruku'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'orderId': id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList();
                                loading.close()
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                        loading.close()
                    }
                })
            }).catch(() => {})
            
        },
        // 物流入库
        rukuClick1(id){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/order/order/singleruku'),
                method: 'post',
                data: this.$http.adornData(id)
            }).then(({data}) => {
                loading.close()
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList();
                            
                        }
                    })
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 出库
        chukuClick(row){
            if(row.isRed == 1){
                this.$message.error({
                    message: '余额不足',
                    duration: 1000
                })
            }else{
                this.$confirm('该订单确定出库?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http({
                        url: this.$http.adornUrl('/order/order/listchuku'),
                        method: 'get',
                        params: this.$http.adornParams({
                            'orderId': row.orderId
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.getDataList();
                                    loading.close()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                            loading.close()
                        }
                    })
                }).catch(() => {})
            }
            
            
        }
      }
  }
</script>
<style>
    .labelSS{
        display :line-block;
        line-height:36px;
    }
    .divM{
        margin-top: 10px;
    }
    .statics{
        display: flex;
        /* height: 39px; */
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        color: rgba(0,0,0,.6);
        line-height: 37px;
        border-radius: 4px;
        padding: 0 10px;
    }
    .statics .left1{
        width: 120px;
    }
    .statics .right{
        flex: 1;
        text-align: right;
    }
    .el-tag{
        margin-left: 6px;
    }
    .sous1 .el-input__inner{
        height: 50px;
        font-size: 18px;
    }
    .sous1 .labelSS{
        width: 100px;
        float: left;
        line-height: 50px;
    }

</style>
