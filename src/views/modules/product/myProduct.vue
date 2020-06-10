<template>
  <div class="">
      <!-- 列表页 -->
      <div>
        <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">产品标题：</label>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.title">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="7">
                            <label class="labelSS">SKU／编码：</label>
                        </el-col>
                        <el-col :span="17">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.sku">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">开始时间：</label>
                        </el-col>
                        <el-col :span="18">
                            <el-date-picker
                            v-model="q.startDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">结束时间：</label>
                        </el-col>
                        <el-col :span="18">
                            <el-date-picker
                            v-model="q.endDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <div style="height:10px;float:left;width:100%"></div>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="3">
                            <label class="labelSS">产品分类：</label>
                        </el-col>
                        <el-col :span="21">
                            <el-cascader v-model="nowProTypeId" :options="options" :props="props" clearable @visible-change="visibleChange"></el-cascader>
                        </el-col>
                    </el-row>
                </el-col>
                
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                    <el-button type="" icon="el-icon-refresh" size="medium" @click="clean">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 筛选 -->
        <div style="margin:16px 0">
            <div class="tag-group" v-if="audit.length != 0">
                <span class="tag-group__title">审核状态</span>
                <el-tag
                    v-for="item in audit"
                    :key="item.code"
                    size="medium"
                    @click="auditClick(item.code)"
                    :effect='item.code == auditValue ? "dark" : "plain"'>
                    {{ item.value }} ({{item.count}})
                </el-tag>
            </div>
            <div class="tag-group" v-if="productType.length != 0">
                <span class="tag-group__title">产品类型</span>
                <el-tag
                    v-for="item in productType"
                    :key="item.code"
                    size="medium"
                    @click="productTypeClick(item.code)"
                    :effect='item.code == productTypeValue ? "dark" : "plain"'>
                    {{ item.value }} ({{item.count}})
                </el-tag>
            </div>
            <div class="tag-group" v-if="upload.length != 0">
                <span class="tag-group__title">上传类型</span>
                <el-tag
                    v-for="item in upload"
                    :key="item.code"
                    size="medium"
                    @click="uploadClick(item.code)"
                    :effect='item.code == uploadValue ? "dark" : "plain"'>
                    {{ item.value }} ({{item.count}})
                </el-tag>
            </div>
        </div>
        <!-- 操作 -->
        <div class="divM">
            <!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="toProduct">原创产品</el-button> -->
            <open-tab :product="true" type="primary" icon="el-icon-plus" dec='原创产品' urlName='productAddUpdate' :opt='{"productId":null}'></open-tab>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="del">删除</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="piliang">批量修改</el-button>
            <el-button type="primary" size="small" @click="changeStats('001','SHELVE_STATE')">上架</el-button>
            <el-button type="primary" size="small" @click="changeStats('002','SHELVE_STATE')">下架</el-button>
            <el-button type="primary" size="small" @click="changeStats('001','AUDIT_STATE')">审核通过</el-button>
            <el-button type="primary" size="small" @click="changeStats('002','AUDIT_STATE')">待审核</el-button>
            
            <div style="float:right;">
                <el-button type="primary" icon="el-icon-download" size="small" @click="downTemplate">插件下载</el-button>
                <!-- <el-button type="text">采集手册</el-button> -->&nbsp;&nbsp;&nbsp;&nbsp;
                <el-link href="http://liujing.obs.cn-north-4.myhuaweicloud.com/pdf/b.pdf" target="_blank" type="primary">采集手册</el-link>
            </div>
        </div>
        <!-- 统计 -->
        <div class="statics divM">
            <div class="left">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;
            </div>
            <div class="right">
                <!-- 含变体产品数&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
                变体总数&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp; -->
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
                fixed
                prop=""
                label="图片"
                width="160">
                <template slot-scope="scope">
                    <el-tooltip placement="right-start" effect="light">
                        <div slot="content">
                            <el-image
                            style="width: 300px; height: 300px"
                            :src="scope.row.mainImageUrl"></el-image>
                        </div>
                            <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.mainImageUrl"></el-image>
                    </el-tooltip>
                    
                </template>
                </el-table-column>
                <el-table-column
                prop="productId"
                label="编号"
                width="150">
                </el-table-column>
                <el-table-column
                prop=""
                label="标题"
                width="">
                <template slot-scope="scope">
                    <open-tab :isMore="true" size="medium" type="text" icon="" :dec='scope.row.productTitle' urlName='productAddUpdate' :opt='{"productId":scope.row.productId}'></open-tab>
                    <div v-if="scope.row.productSku"><span style="color:#999">SKU：</span>{{scope.row.productSku}}</div>
                    <div v-if="scope.row.categoryName"><span style="color:#999">分类：</span>{{scope.row.categoryName}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="时间"
                width="100">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <open-tab :isMore="true" size="medium" type="text" icon="el-icon-edit" dec='' urlName='productAddUpdate' :opt='{"productId":scope.row.productId}'></open-tab>
                    <el-button type="text" icon="" @click="copy(scope.row.productId)">复制</el-button>
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
      <!-- 批量修改 -->
      <product-piliang v-if="piliangVisible" :ids="ids" ref="addOrUpdate" @refreshDataList="getDataList"></product-piliang>
      
  </div>
</template>

<script>
  import OpenTab from '../../common/open'
  import ProductPiliang from './product-piliang'
  import { getQuerycategory } from '@/api/product'
  
  export default {
    components: {
        OpenTab,
        ProductPiliang
    },
      data(){
          return{
              ids:[],
            showList:true,
            productD:{},
            q:{
                startDate:'',
                endDate:'',
                title:'',
                sku:''
            },
            dataListLoading:true,
            nowProTypeId:[],
            options:[],
            props:{
                lazy:true,
                lazyLoad: function(node, resolve) {
                    console.log(node)
                    if(node.value){
                        getQuerycategory({'categoryId':node.value}).then((data) => {
                            if (data.data && data.data.code == 0) {
                                const level = node.level;
                                // const children = node.children;
                                const nodes = [];
                                if(data.data.categoryList.length != 0){
                                    data.data.categoryList.forEach(function (item) {
                                        nodes.push({
                                            value:item.categoryId,
                                            label:item.categoryName+'('+item.count+')',
                                            leaf: level >= 2
                                        })
                                    })
                                    resolve(nodes);
                                }else{

                                }
                            } else {
                                alert(data.msg);
                            }
                        })
                        // 
                    }
                }
            },
            dataList:[],
            piliangVisible:false,
            selectedRowKeys:[],
            audit:[],
            productType: [],
            upload: [],
            auditValue:'',
            productTypeValue:'',
            uploadValue:'',
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            dataListSelections:[]
          }
      },
      created(){
          this.getMyStatusList();
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
        // 获取产品状态列表
        getMyStatusList () {
            this.$http({
                url: this.$http.adornUrl('/sys/sysdict/mystatuslist'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.audit = data.auditList;
                    this.productType = data.productTypeList;
                    this.upload = data.uploadList;
                    this.audit.unshift({
                        code:'',
                        value:'全部',
                        count:data.allCounts
                    })
                    this.productType.unshift({
                        code:'',
                        value:'全部',
                        count:data.allCounts
                    })
                    this.upload.unshift({
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
                url: this.$http.adornUrl('/product/product/mylist'),
                method: 'get',
                params: this.$http.adornParams({
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                    'category': this.nowProTypeId[this.nowProTypeId.length-1],
                    'title': this.q.title,
                    'sku': this.q.sku,
                    'startDate':this.q.startDate,
                    'endDate': this.q.endDate,
                    'auditNumber': this.auditValue,
                    'productNumber': this.productTypeValue,
                    'uploadNumber':this.uploadValue,
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
                title:'',
                sku:'',
            };
            this.nowProTypeId = [];
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
        // 批量修改弹框
        piliang(){
            
            if(this.dataListSelections.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
            }else{
                this.piliangVisible = true;
                this.ids = this.dataListSelections.map(item => {
                    return item.productId
                })
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(this.ids)
                })
                
            }
            
        },
        changeStats(code,type){
            var productIds = this.dataListSelections.map(item => {
                return item.productId
            })
            if(productIds.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }
            this.$confirm('确定对选项进行该操作?', {
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
                    url: this.$http.adornUrl('/product/product/changeauditstatus'),
                    method: 'post',
                    data: this.$http.adornData({
                        'productIds':productIds,
                        'number':code,
                        'type':type
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList()
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        },
        // 产品分类下拉列表(一级)
        visibleChange(bol){
            if(bol){
                this.$http({
                    url: this.$http.adornUrl('/product/productcategory/querycategoryone'),
                    method: 'post',
                    data: this.$http.adornData()
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        var that = this;
                        data.categoryOneList.forEach(function(item){
                            that.options.push({
                                value:item.categoryId,
                                label:item.categoryName+'('+item.count+')',
                            })
                        })
                    
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }
            
        },
        // 原创第一步
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
                    this.productD = data.product;
                    this.showList = false;

                    // this.dataForm = data.product;
                    loading.close();
                }else{
                    this.$message.error(data.msg)
                }
            })
        },
        // 复制产品
        copy(id){
            this.$confirm('确定复制该产品?', {
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
                    url: this.$http.adornUrl('/product/product/copyProduct'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'productId':id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList()
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
        // 插件下载
        downTemplate(){
            window.location.href = this.$http.adornUrl('/product/product/downTemplate?token='+this.$cookie.get("token"))
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
    .el-tag{
        margin-left: 6px;
    }

</style>
