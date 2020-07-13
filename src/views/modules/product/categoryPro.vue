<template>
    <div class="mod-user">
        <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-input
                        size="medium"
                        placeholder="分类名称"
                        v-model="q.name">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <span style="">
                        <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList()">查询</el-button>
                    </span>
                </el-col>
            </el-row>
        </div>
        <!-- 操作 -->
        <div class="">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addOrUpdateHandle()">新增</el-button>
        </div>
        <!-- 统计 -->
        <div class="statics divM">
            <div class="left">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ dataListSelections.length }}</a>&nbsp;项&nbsp;&nbsp;
            </div>
        </div>
        <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%;">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="categoryId"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop=""
                label="上级分类"
                width="">
                <template slot-scope="scope">
                    <span v-if="scope.row.parentName">{{scope.row.parentName}}</span>
                    <span v-else>一级分类</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="分类名称">
            </el-table-column>
            <!-- <el-table-column
                prop="count"
                label="分类数量">
            </el-table-column> -->
            <el-table-column
                fixed="right"
                width="60"
                label="操作">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" type="text" size="small" @click="getInfo(scope.row)"></el-button>
                    </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <el-dialog
            :title="dataForm.categoryId ? '修改' : '新增'"
            :visible.sync="addOrUpdateVisible"
            width="500px">
            <div class="cateProDiv">
                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
                    <el-form-item label="分类名称" prop="categoryName">
                        <el-input v-model="dataForm.categoryName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="上级分类">
                        <el-cascader ref="aaa" filterable :show-all-levels="false" placeholder="产品分类" v-model="dataForm.parentId" :options="options" :props="props" clearable @visible-change="visibleChange" @change="fenlChange"></el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="stockClick">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
    // import AddOrUpdate from './group-add-or-update'
    import { getQuerycategory } from '@/api/product'
    export default{
        data(){
            return{
                q:{
                    name:''
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 20,
                totalPage: 0,
                dataListLoading: false,
                addOrUpdateVisible: false,
                dataListSelections:[],
                dataForm:{
                    categoryId: null,
                    categoryName: "",
                    count: '',
                    parentId: '',
                    parentName: '',
                },
                dataRule: {
                    name: [
                        { required: true, message: '小组名称不能为空', trigger: 'blur' }
                    ]
                },
                options:[],
                props:{
                    lazy:true,
                    checkStrictly: true,
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
                                                label:item.categoryName,
                                                leaf: level >= 1
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
            }
        },
        components: {
            // AddOrUpdate
        },
        created () {
            this.getDataList()
        },
        methods:{
            // 获取数据列表
            getDataList () {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/product/productcategory/list'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'categoryName':this.q.name
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.list
                        this.totalPage = data.page.totalCount
                        console.log(this.$store.state.dept)
                    } else {
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
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
                            that.options = [];
                            data.categoryOneList.forEach(function(item){
                                that.options.push({
                                    value:item.categoryId,
                                    label:item.categoryName,
                                })
                            })
                        
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }
                
            },
            // 新增
            addOrUpdateHandle (id) {
                this.addOrUpdateVisible = true;
                this.dataForm = {
                    categoryId: null,
                    categoryName: "",
                    count: '',
                    parentId: '',
                    parentName: '',
                };
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();
                })
            },
            // 获取详情
            getInfo(row){
                this.dataForm = row;
                if(row.parentId){
                    this.options = [{
                        value:row.parentId,
                        label:row.parentName
                    }]
                }
                // this.dataForm.parentId = [row.parentId]
                this.addOrUpdateVisible = true;
                console
            },
            // 确定
            stockClick(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let that = this;
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        if(this.dataForm.parentId != ''){
                            this.dataForm.parentId = this.dataForm.parentId[this.dataForm.parentId.length-1]
                        }
                        if(this.dataForm.categoryId){
                            
                            
                            this.$http({
                            url: this.$http.adornUrl('/product/productcategory/update'),
                            method: 'post',
                            data: this.$http.adornData(this.dataForm)
                            }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.addOrUpdateVisible = false
                                    loading.close();
                                    this.getDataList();
                                }
                                })
                                
                            } else {
                                this.$message.error(data.msg)
                                loading.close();
                            }
                            })
                        }else{
                        this.$http({
                            url: this.$http.adornUrl('/product/productcategory/save'),
                            method: 'post',
                            data: this.$http.adornData(this.dataForm)
                            }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.addOrUpdateVisible = false
                                    loading.close();
                                    this.getDataList();
                                }
                                })
                                
                            } else {
                                this.$message.error(data.msg)
                                loading.close();
                            }
                            })
                        }
                        
                    }
                    })
            },
            fenlChange(node){
                console.log(this.$refs['aaa'].getCheckedNodes()[0].pathLabels);
                this.dataForm.parentName = this.$refs['aaa'].getCheckedNodes()[0].pathLabels[this.$refs['aaa'].getCheckedNodes()[0].pathLabels.length-1]
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
        margin-bottom: 10px;
    }
    .statics .left{
        width: 300px;
    }
    .el-col{
      margin-bottom: 10px;
    }
    .cateProDiv .el-cascader{
        width: 100%;
    }

</style>
