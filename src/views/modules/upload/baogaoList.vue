<template>
  <div class="">
      <!-- 列表页 -->
      <div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                style="width: 100%">
                <el-table-column
                prop="resultId"
                label="ID"
                width="60">
                </el-table-column>
                <el-table-column
                prop="uploadId"
                label="上传ID"
                width="150">
                </el-table-column>
                <el-table-column
                prop="type"
                label="上传类型"
                width="">
                </el-table-column>
                <el-table-column
                prop=""
                label="结果类型"
                width="">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.resultType == '警告'" type="warning">警告</el-tag>
                        <el-tag v-if="scope.row.resultType == '错误'" type="danger">错误</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="上传结果"
                width="">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.result" placement="bottom" effect="light">
                            <span class="xmlSpan">{{scope.row.result}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="错误代码"
                width="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="getCode(scope.row.resultCode)">{{scope.row.resultCode}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="creationTime"
                label="创建时间"
                width="150">
                </el-table-column>
                <el-table-column
                prop=""
                label="SKU"
                width="">
                    <template slot-scope="scope">
                        <open-tab :isMore="true" size="medium" type="text" icon="" :dec='scope.row.sku' urlName='productAddUpdate' :opt='{"productId":scope.row.productId}'></open-tab>
                        <!-- <el-button type="text" @click="getCode(scope.row.resultCode)">{{scope.row.sku}}</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[20, 30, 50]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
            </el-pagination> -->
        </div>
      </div>
      <!-- 错误代码解释弹框 -->
      <el-dialog
        title="错误代码解释"
        :visible.sync="codeVisible"
        width="500px">
        <div>
            {{codeEx}}
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="codeVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            id:'',
            codeVisible:false,
            dataListLoading:true,
            nowProTypeId:[],
            dataList:[],
            selectedRowKeys:[],
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            dataListSelections:[],
            addUpVisible:false,
            codeEx:''
          }
      },
      created(){
          this.id = this.$route.params.uploadId
          this.getDataList();
        //   this.visibleChange();
      },
      methods:{
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/upload/resultxml/list'),
                method: 'get',
                params: this.$http.adornParams({
                    // 'page': this.pageIndex,
                    // 'limit': this.pageSize,
                    'uploadId': this.id
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataList = data.data
                    // this.totalPage = data.page.totalCount
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
        // 获取代码解释    
        getCode(code){
            this.$http({
                url: this.$http.adornUrl('/upload/errorcode/explanation'),
                method: 'get',
                params: this.$http.adornParams({
                    'errorCode': code
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    if(data.data){
                        this.codeEx = data.data.errorExplanation;
                        this.codeVisible = true;
                    }else{
                        this.$message({
                            message: '暂无错误代码解释',
                            type: 'warning'
                        });
                    }
                    
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
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
    .xmlSpan{
        display: inline-block;
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>
