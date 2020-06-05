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
                            <label class="labelSS">错误代码：</label>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.errorCode">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 操作 -->
        <div class="divM">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="id = '';addUpVisible = true">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="small" @click="del">删除</el-button>
        </div>
        <!-- 统计 -->
        <div class="statics divM">
            <div class="left">
                <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;
            </div>
            <div class="right">
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
                prop="id"
                label="ID"
                width="60">
                </el-table-column>
                <el-table-column
                prop="errorCode"
                label="时间"
                width="150">
                </el-table-column>
                <el-table-column
                prop="errorExplanation"
                label="错误代码解释"
                width="">
                </el-table-column>
                <el-table-column
                prop=""
                label="操作"
                width="100">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="id = scope.row.id;addUpVisible = true"></el-button>
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
      <!-- 新增修改弹框 -->
      <el-dialog
        :title="id ? '修改' : '新增'"
        :visible.sync="addUpVisible"
        width="450px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">错误代码</label>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入内容"
                        v-model="obj.errorCode"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">错误代码解释</label>
                </el-col>
                <el-col :span="18">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="obj.errorExplanation"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUpVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUp">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            id:'',
            obj:{
                errorCode:'',
                errorExplanation:''
            },
            q:{
                errorCode:''
            },
            groupList:[],
            userList:[],
            dataListLoading:true,
            nowProTypeId:[],
            dataList:[],
            selectedRowKeys:[],
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            dataListSelections:[],
            addUpVisible:false,
          }
      },
      created(){
          this.getDataList();
        //   this.visibleChange();
      },
      methods:{
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
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
                    this.dataList = []
                    this.totalPage = 0
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
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        },
        addUp(){
            this.$confirm('确定提交表单内容?', {
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
                    url: this.$http.adornUrl(`/product/product/${this.id ? 'update' :'save'}`),
                    method: 'post',
                    data: this.$http.adornData(this.obj)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList();
                            this.addUpVisible = false;
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
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
