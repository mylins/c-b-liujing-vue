<template>
  <div class="">
      <!-- 操作 -->
      <div class="divM">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addVisible = true;addObj.type='EAN'">添加</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-input-number v-model="num" :controls="false" size="small"></el-input-number>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="del">批量删除</el-button>
        
      </div>
      <!-- 统计 -->
      <div class="statics divM">
          <div class="left">
              <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;
              总数&nbsp;<a style="font-weight: 600">{{ allCou }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
              已使用&nbsp;<a style="font-weight: 600">{{ useCou }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
              未使用&nbsp;<a style="font-weight: 600">{{ unuseCou }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
          </div>
      </div>
      <!-- 列表 -->
      <div class="divM">
          <el-table
            :data="dataList"
            v-loading="dataListLoading"
            style="width: 100%">
            <el-table-column
            prop="type"
            label="类型"
            width="150">
            </el-table-column>
            <el-table-column
            prop="code"
            label="UPC／EAN"
            width="">
            </el-table-column>
            <el-table-column
            prop="productId"
            label="产品"
            width="120">
            </el-table-column>
            <el-table-column
            prop=""
            label="状态"
            width="300">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.state == 0">未使用</el-tag>
                <el-tag v-if="scope.row.state == 1">已使用</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="时间"
            width="120">
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
      <!-- 新增弹框 -->
      <el-dialog
      title="新增"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <div>
          <label style="display:inline-block;margin:10px 0 10px 0;font-weight:600">类型</label>
          <el-select v-model="addObj.type" placeholder="请选择">
            <el-option
            label="UPC"
            value="UPC">
            </el-option>
            <el-option
            label="EAN"
            value="EAN">
            </el-option>
        </el-select>
        </div>
        <div>
          <label style="display:inline-block;margin:20px 0 10px 0;font-weight:600">UPC／EAN码</label>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addObj.value"
            clearable>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
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
            allCou:0,
            useCou:0,
            unuseCou:0,
            num:null,
            addObj:{
                type:'EAN',
                value:''
            },
            addVisible:false,
            dataListLoading:true,
            nowProTypeId:null,
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
          this.getDataList();
      },
      methods:{
        
        // 获取数据列表
        getDataList () {
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/product/productean/list'),
                method: 'get',
                params: this.$http.adornParams({
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataList = data.page.list
                    this.totalPage = data.page.totalCount
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
                    url: this.$http.adornUrl('/product/productean/batchDelete'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'number':this.num
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList()
                            loading.close();
                            this.num = '';
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        },
        // 新增
        add(){
            if(this.addObj.value == ''){
                this.$message({
                    message: '请添加ean码',
                    type: 'warning'
                })
            }else{
                var arr=this.addObj.value.split('\n'),
                    arr1=[];
                arr.forEach(function(item){
                    if(item){
                        arr.push(item)
                    }
                })
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl('/product/productean/batchadd'),
                    method: 'post',
                    data: this.$http.adornData({
                        'codes':arr.join(','),
                        'type':this.addObj.type
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
                            this.addVisible = false;
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
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
