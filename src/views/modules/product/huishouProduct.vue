<template>
  <div class="">
      <!-- 列表页 -->
      <div>
        <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-input
                        size="medium"
                        placeholder="产品标题"
                        v-model="q.title">
                    </el-input>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-input
                        size="medium"
                        placeholder="SKU／编码"
                        v-model="q.sku">
                    </el-input>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-date-picker
                    v-model="q.startDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始时间">
                    </el-date-picker>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-date-picker
                    v-model="q.endDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-cascader placeholder="产品分类" v-model="nowProTypeId" :options="options" :props="props" clearable @visible-change="visibleChange"></el-cascader>
                </el-col>
                
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                    <el-button type="" icon="el-icon-refresh" size="medium" @click="clean">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 筛选 -->
        <div>
            <el-row :gutter="10">
                <el-col :md="24" :lg="8">
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
                </el-col>
                <el-col :md="24" :lg="8">
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
                </el-col>
                <el-col :md="24" :lg="8">
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
                </el-col>
            </el-row>
            
            
            
        </div>
        <!-- 操作 -->
        <div class="divM">
            <el-checkbox v-model="allSelect" label="全选" border @change="allSelectClick" size="small"></el-checkbox>&nbsp;&nbsp;
            <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="huifu">一键恢复</el-button>
        </div>
        <!-- 统计 -->
        <div class="statics divM">
            <div class="left">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ dataListSelections.length }}</a>&nbsp;项&nbsp;&nbsp;
            </div>
            <div class="right">
            </div>
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-row :gutter="10">
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3" v-for="item in dataList" :key="item.productId">
                    <div class="proItemDiv" :class="dataListSelections.indexOf(item.productId) != -1 ? 'active' : ''">
                        <div class="imgClickSelDiv" @click="imgClickSel(item.productId)">
                            <el-image
                            style="width: 100%;"
                            fit="cover"
                            :src="item.mainImageUrl+'?x-image-process=style/style-1000'">
                                <div slot="placeholder" class="image-slot errorImgDiv1">
                                    加载中<span class="dot">...</span>
                                </div>
                                <div slot="error" class="image-slot">
                                    <el-image
                                        style="width: 100%;"
                                        fit="cover"
                                        :src="require('@/assets/img/img.jpg')"></el-image>
                                </div>
                            </el-image>
                        </div>
                        
                        <!-- <div class="titlePro">
                            <open-tab :isMore="true" size="medium" type="text" icon="" :dec='item.productTitle' urlName='productAddUpdate' :opt='{"productId":item.productId}'></open-tab>
                        </div> -->
                        <div class="aaa">
                            <el-tag effect="dark" size="mini" v-if="item.auditStatus == '001'">审核通过</el-tag>
                            <el-tag effect="dark" type="warning" size="mini" v-else>待审核</el-tag>
                            <div class="proTitleSpan">{{item.productTitle}}</div>
                        </div>
                        <!-- <span class="proTitleSpan">{{item.productTitle}}</span> -->
                        <div class="decProSN">编号：{{item.productId}}</div>
                        <div class="decProSN">SKU：{{item.productSku}}</div>
                        <div class="decProSN">时间：{{item.createTime}}</div>
                        <div class="lineDivPro">
                            <div class="lineDivLeft">
                                <span class="lineDivRight">¥{{item.money}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            
            <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[24, 40, 56]"
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
  import { getQuerycategory } from '@/api/product'
  export default {
    components: {
        OpenTab
    },
      data(){
          return{
            allSelect:false,
            showList:true,
            productD:{},
            q:{
                startDate:'',
                endDate:'',
                title:'',
                sku:'',
                deptId:null,
                userId:null,
                groupId:null
            },
            groupList:[],
            userList:[],
            dataListLoading:true,
            nowProTypeId:[],
            options:[],
            props:{
                lazy:true,
                lazyLoad: function(node, resolve) {
                    
                    if(node.value){
                        getQuerycategory({'categoryId':node.value}).then((data) => {
                            console.log(data)
                            console.log(data == 0)
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
                                }
                            } else {
                                alert(data.msg);
                            }
                        })
                    }
                }
            },
            dataList:[],
            selectedRowKeys:[],
            audit:[],
            productType: [],
            upload: [],
            auditValue:'',
            productTypeValue:'',
            uploadValue:'',
            pageSize:24,
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
                params: this.$http.adornParams({
                    'del':'1'
                })
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
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/product/product/recyclelist'),
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
                loading.close()
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
        imgClickSel(id){
            if(this.dataListSelections.indexOf(id) == -1){
                this.dataListSelections.push(id)
            }else{
                this.dataListSelections.splice(this.dataListSelections.indexOf(id),1)
            }
        },
        // 全选
        allSelectClick(val){
            console.log(val);
            this.dataListSelections = [];
            if(val){
                var that = this;
                this.dataList.forEach(function(item){
                    that.dataListSelections.push(item.productId)
                })
            }
        },
        // 恢复
        huifu(){
            console.log(this.dataListSelections);
            var productIds = this.dataListSelections;
            console.log(productIds)
            if(productIds.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }
            this.$confirm('确定对选项进行恢复操作?', {
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
                    url: this.$http.adornUrl('/product/product/restore'),
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
                                
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                    loading.close()
                })
            }).catch(() => {})
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
