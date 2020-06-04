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
                            <label class="labelSS">选择公司:</label>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="q.deptId" filterable clearable placeholder="请选择">
                                <el-option
                                    v-for="item in $store.state.dept.comList"
                                    :key="'D'+item.deptId"
                                    :label="item.name"
                                    :value="item.deptId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">选择小组:</label>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="q.groupId" clearable placeholder="请选择" @focus='getGroupList'>
                                <el-option
                                    v-for="item in groupList"
                                    :key="'G'+item.groupId"
                                    :label="item.name"
                                    :value="item.groupId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">选择员工:</label>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="q.userId" clearable placeholder="请选择" @focus='getuserList'>
                                <el-option
                                    v-for="item in userList"
                                    :key="'U'+item.userId"
                                    :label="item.displayName"
                                    :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
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
                        <el-col :span="6">
                            <label class="labelSS">SKU/编码：</label>
                        </el-col>
                        <el-col :span="18">
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
            <div class="tag-group">
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
            <div class="tag-group">
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
            <div class="tag-group">
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
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                @selection-change="selectionChangeHandle"
                style="width: 100%">
                <el-table-column
                fixed
                prop=""
                label="图片"
                width="160">
                <template slot-scope="scope">
                    <el-image
                        style="width: 120px; height: 120px"
                        :src="'http://'+scope.row.mainImageUrl"></el-image>
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
                    <!-- <open-tab type="text" icon="" :dec='scope.row.productTitle' urlName='productLook' :opt='{"productId":scope.row.productId}'></open-tab> -->
                    <open-tab size="medium" type="text" icon="" :dec='scope.row.productTitle' urlName='productLook' :opt='{"productId":scope.row.productId}'></open-tab>
                    <div v-if="scope.row.productSku"><span style="color:#999">SKU：</span>{{scope.row.productSku}}</div>
                    <div v-if="scope.row.categoryName"><span style="color:#999">分类：</span>{{scope.row.categoryName}}</div>
                </template>
                </el-table-column>
                
                <el-table-column
                prop="createTime"
                label="时间"
                width="100">
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
  import { getQuerycategory } from '@/api/product'
  export default {
    components: {
        OpenTab
    },
      data(){
          return{
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
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            dataListSelections:[]
          }
      },
      activated(){
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
                url: this.$http.adornUrl('/sys/sysdict/allstatuslist'),
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
                url: this.$http.adornUrl('/product/product/alllist'),
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
                    'deptId':this.q.deptId,
                    'groupId':this.q.groupId,
                    'userId':this.q.userId
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataList = data.page.list
                    this.totalPage = data.page.totalCount
                    console.log(this.$store.state.dept)
                } else {
                    this.dataList = []
                    this.totalPage = 0
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
                deptId:null,
                userId:null,
                groupId:null
            }
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
                    }
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
                }
            })
        },
        // 获取小组下拉
        getGroupList(){
            if(this.q.deptId){
                this.$http({
                url: this.$http.adornUrl('/sys/sysgroup/select'),
                method: 'get',
                params: this.$http.adornParams({
                    'deptId':this.q.deptId,
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                this.groupList = data.groupList
                } else {
                this.groupList = []
                }
            })
            }else{
                this.$message({
                    message: '请先选择公司',
                    type: 'warning'
                });
            }
            
        },
        // 获取人员下拉
        getuserList(){
            if(this.q.deptId){
                this.$http({
                url: this.$http.adornUrl('/sys/user/getUserList'),
                method: 'get',
                params: this.$http.adornParams({
                    'deptId':this.q.deptId,
                    'groupId':this.q.groupId
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.userList = data.userList
                } else {
                    this.userList = []
                }
            })
            }else{
                this.$message({
                    message: '请先选择公司',
                    type: 'warning'
                });
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
