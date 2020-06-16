<template>
  <div class="">
      <!-- 列表页 -->
      <div>
        <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="订单ID"
                        v-model="q.orderId">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="亚马逊订单ID"
                        v-model="q.amazonOrderId">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="关联产品ID"
                        v-model="q.productId">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="产品SKU"
                        v-model="q.productSku">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="产品asin码"
                        v-model="q.productAsin">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="国内物流单号"
                        v-model="q.domesticWaybill">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                        size="medium"
                        placeholder="国际物流单号"
                        v-model="q.abroadWaybill">
                    </el-input>
                </el-col>
                <el-col :span="3" >
                    <div style="height:36px"></div>
                </el-col>
                <el-col :span="3">
                    <el-date-picker
                    v-model="q.startDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-date-picker
                    v-model="q.endDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                    <el-button type="" icon="el-icon-refresh" size="medium" @click="clean">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 筛选 -->
        <div style="">
            <div class="tag-group" v-if="orderStatusList.length != 0">
                <span class="tag-group__title">订单状态</span>
                <span 
                    v-for="(item,index) in orderStatusList"
                    :key="item.code"
                    @click="auditClick(item.code)"
                    class="el-tag el-tag--medium" 
                    :style="item.code == orderStatusValue ? {'background':color[index],'color':'#fff','border':'1px solid '+color[index]} : {'color':color[index],'background':'#fff','border':'1px solid '+color[index]}">{{ item.value }} ({{item.count}})</span>
            </div>
            <div class="tag-group" v-if="abnormalStatusList.length != 0">
                <span class="tag-group__title">异常状态</span>
                <span 
                    v-for="(item,index) in abnormalStatusList"
                    :key="item.code"
                    @click="productTypeClick(item.code)"
                    class="el-tag el-tag--medium" 
                    :style="item.code == abnormalStatusValue ? {'background':color1[index],'color':'#fff','border':'1px solid '+color1[index]} : {'color':color1[index],'background':'#fff','border':'1px solid '+color1[index]}">
                    {{ item.value }} ({{item.count}})</span>
            </div>
        </div>
        <!-- 操作 -->
        <div class="divM">
            <el-button type="primary" icon="el-icon-bottom" size="small" @click="getOrder">获取订单</el-button>
            <el-button type="primary" icon="el-icon-edit-outline" size="small" @click="luruVisible = true;luruId=''">手工录入订单</el-button>
            <el-button type="primary" icon="el-icon-star-off" size="small" @click="biaojiClick">标记订单状态</el-button>
            <!-- <div style="float:right;">
                <el-button type="primary" icon="el-icon-download" size="small">插件下载</el-button>
                <el-button type="text">采集手册</el-button>
            </div> -->
        </div>
        <!-- 统计 -->
        <div class="statics divM">
            <div class="left1">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;
            </div>
            <div class="right">
                订单数&nbsp;<a style="font-weight: 600">{{ statisticsProfit.addOrderCounts }}</a>&nbsp;&nbsp;&nbsp;
                销售额&nbsp;<a style="font-weight: 600">{{ statisticsProfit.salesVolume }}</a>&nbsp;&nbsp;&nbsp;
                <!-- 订单到账金额&nbsp;<a style="font-weight: 600">{{ statisticsProfit.accountSales }}</a>&nbsp;&nbsp;&nbsp; -->
                核算订单数&nbsp;<a style="font-weight: 600">{{ statisticsProfit.checkOrderCounts }}</a>&nbsp;&nbsp;&nbsp;
                核算订单金额&nbsp;<a style="font-weight: 600">{{ statisticsProfit.checkSalesVolume }}</a>&nbsp;&nbsp;&nbsp;
                <!-- 核算订单到账金额&nbsp;<a style="font-weight: 600">{{ statisticsProfit.checkAccountSales }}</a><br> -->
                采购价&nbsp;<a style="font-weight: 600">{{ statisticsProfit.cost }}</a>&nbsp;&nbsp;&nbsp;
                佣金&nbsp;<a style="font-weight: 600">{{ statisticsProfit.servicePrice }}</a>&nbsp;&nbsp;&nbsp;
                运费&nbsp;<a style="font-weight: 600">{{ statisticsProfit.orderFreight }}</a>&nbsp;&nbsp;&nbsp;
                核算利润&nbsp;<a style="font-weight: 600">{{ statisticsProfit.profit }}</a>&nbsp;&nbsp;&nbsp;
                利润率&nbsp;<a style="font-weight: 600">{{ statisticsProfit.profitRate }}</a>&nbsp;&nbsp;&nbsp;
                退款订单数&nbsp;<a style="font-weight: 600">{{ statisticsProfit.returnOrderCounts }}</a>&nbsp;&nbsp;&nbsp;
                退款金额&nbsp;<a style="font-weight: 600">{{ statisticsProfit.returnCost }}</a>&nbsp;&nbsp;&nbsp;
                退款率&nbsp;<a style="font-weight: 600">{{ statisticsProfit.returnCostProfit }}</a>
            </div>
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                @selection-change="selectionChangeHandle"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="productId"
                label="订单号"
                width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.orderId}}</span>
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
                        <open-tab :isMore="true" size="medium" type="text" icon="" :dec='scope.row.amazonOrderId' urlName='orderAddUpdate' :opt='{"orderId":scope.row.orderId}'></open-tab>
                        <el-image
                            style="width: 15px; height: 15px"
                            :src="require('@/assets/img/yamaxun.jpg')"></el-image>
                        <span>{{scope.shopName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="订单金额"
                width="">
                    <template slot-scope="scope">
                        <div>{{scope.row.orderMoney}}<span v-if="scope.row.rateCode">({{scope.row.rateCode}})</span></div>
                        <div v-if="scope.row.orderMoneyCny"><span style="color:#999">{{scope.row.orderMoneyCny}}</span>}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="Amazon佣金"
                width="">
                    <template slot-scope="scope">
                        <div>{{scope.row.amazonCommission}}<span v-if="scope.row.rateCode">({{scope.row.rateCode}})</span></div>
                        <div v-if="scope.row.amazonCommissionCny"><span style="color:#999">¥{{scope.row.amazonCommissionCny}}</span>}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="到账金额"
                width="">
                    <template slot-scope="scope">
                        <div>{{scope.row.accountMoney}}<span v-if="scope.row.rateCode">({{scope.row.rateCode}})</span></div>
                        <div v-if="scope.row.accountMoneyCny"><span style="color:#999">¥{{scope.row.accountMoneyCny}}</span>}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="momentRate"
                label="当天汇率"
                width="100">
                </el-table-column>
                <el-table-column
                prop="purchasePrice"
                label="采购价"
                width="100">
                </el-table-column>
                <el-table-column
                prop="interFreight"
                label="国际运费"
                width="100">
                </el-table-column>
                <el-table-column
                prop="platformCommissions"
                label="平台佣金"
                width="100">
                </el-table-column>
                <el-table-column
                prop="returnCost"
                label="退货费用"
                width="100">
                </el-table-column>
                <el-table-column
                prop="orderProfit"
                label="利润"
                width="100">
                </el-table-column>
                <el-table-column
                prop="profitRate"
                label="利润率"
                width="100">
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
                            :style="{'color':color1[states1.indexOf(scope.row.abnormalStatus)],'background':'#fff','border':'1px solid '+color1[states1.indexOf(scope.row.abnormalStatus)]}">
                            {{ scope.row.abnormalStatus }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                    <template slot-scope="scope">
                        <el-button type="text" icon="" @click="orderId = scope.row.orderId;returnMVisible = true">退款</el-button>
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
       <!-- 退款弹框 -->
      <el-dialog
        title="退款"
        :visible.sync="returnMVisible"
        width="400px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="4">
                    <label style="display:inline-block;line-height:36px">退款金额</label>
                </el-col>
                <el-col :span="20">
                    <el-input
                        placeholder="请输入内容"
                        v-model="returnMoney"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
            <div style="color:#F56C6C;margin-top:10px;font-size:13px">
            已核算利润的单：退款金额=损失费<br><br>
            无核算利润的单：退款金额=订单金额*0.03（虚发货的订单需计算此项）+到账金额+采购费+平台佣金+其他损失费
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="returnMVisible = false">取 消</el-button>
            <el-button type="primary" @click="returnM">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 手工录入订单弹框 -->
      <el-dialog
        title="录入订单"
        :visible.sync="luruVisible"
        width="450px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">Amazon订单ID</label>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入内容"
                        v-model="luruId"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="luruVisible = false">取 消</el-button>
            <el-button type="primary" @click="rluruClick">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选中标记状态 -->
      <el-dialog
        title="标记订单状态"
        :visible.sync="yichangVisible"
        width="450px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">选择标记状态</label>
                </el-col>
                <el-col :span="18">
                    <el-select v-model="yichangValue" placeholder="请选择">
                        <el-option label="正常" value='Normal'></el-option>
                        <el-option
                        v-for="item in yichangList"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="yichangVisible = false">取 消</el-button>
            <el-button type="primary" @click="biaojiClickOk">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import OpenTab from '../../common/open'
//   import ProductPiliang from './product-piliang'
  import { getQuerycategory } from '@/api/product'
  
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
                'AU':'澳大利亚'
            }
          }
      },
      created(){
          this.getMyStatusList();
          this.getStatis();
          this.getDataList();
        //   this.visibleChange();
      },
      methods:{
        auditClick(num){
            this.orderStatusValue = num;
            this.getDataList();
        },
        productTypeClick(num){
            this.abnormalStatusValue = num;
            this.getDataList();
        },
        // 获取订单状态列表
        getMyStatusList () {
            this.$http({
                url: this.$http.adornUrl('/sys/sysdict/orderStateList'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.yichangList = [];
                    var that=this;
                    this.orderStatusList = [{
                        code:'',
                        value:'全部',
                        count:data.allOrderCount
                    }];
                    this.abnormalStatusList = [{
                        code:'',
                        value:'全部',
                        count:data.abnormalAllOrderCount
                    }];
                    data.orderStateList.forEach(function(item){
                        if(item.name == '订单状态'){
                            that.orderStatusList.push({
                                code:item.code,
                                value:item.value,
                                count:item.count
                            })
                        }else{
                            that.abnormalStatusList.push({
                                code:item.code,
                                value:item.value,
                                count:item.count
                            })
                            that.yichangList.push({
                                value:item.value,
                                code:item.code
                            })
                        }
                    })
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/order/order/getMyList'),
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
        // 获取统计
        getStatis(){
            this.$http({
                url: this.$http.adornUrl('/order/order/myOrderCount'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.statisticsProfit = data.orderCountDTO
                    
                } else {
                    this.$message.error(data.msg)
                }
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
            if(this.returnMoney == ''){
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
                    url: this.$http.adornUrl('/order/order/getReturnCost'),
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
                                this.getMyStatusList();
                                loading.close();
                                this.returnMVisible = false
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
            if(this.dataListSelections.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }

            this.yichangVisible = true;
            this.yichangValue = '';
        },
        // 标记异常确定
        biaojiClickOk(){
            var orderIds = this.dataListSelections.map(item => {
                return item.orderId
            })
            let label = '';
            if(this.yichangValue == 'Normal'){
                label = '正常';
            }else{
                label = this.yichangList.find(item => item.code == this.yichangValue).value;
            }
            console.log(this.yichangValue);
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
                            this.getMyStatusList();
                            loading.close()
                            this.yichangVisible = false;
                            
                        }
                    })
                    } else {
                        this.$message.error(data.msg)
                        loading.close()
                    }
                })
            }).catch(() => {})

        },
        // 获取订单
        getOrder(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/order/order/getOneselfOrder'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList();
                            this.getMyStatusList();
                            loading.close()
                        }
                    })
                    
                } else {
                    this.$message.error(data.msg)
                    loading.close();
                }
            })
        },
        // 手工录入订单
        rluruClick(){
            // this.luruId  录入订单id
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if(this.luruId != ''){
                this.$http({
                    url: this.$http.adornUrl('/order/order/downloadSingleOrder'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'amazonOrderId': this.luruId,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList();
                                this.getMyStatusList();
                                
                                loading.close()
                            }
                        })
                        
                    } else {
                        this.$message.error(data.msg)
                        loading.close();
                    }
                })
            }else{
                this.$message({
                    message: '请填写录入ID',
                    type: 'warning'
                });
            }
            
        },
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
        width: 160px;
    }
    .statics .right{
        flex: 1;
        text-align: right;
    }
    .el-tag{
        margin-left: 6px;
    }

</style>
