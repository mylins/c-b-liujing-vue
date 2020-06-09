<template>
  <div class="">

          <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-row>
                        <el-col :span="6">
                            <label class="labelSS">产品ID：</label>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                size="medium"
                                placeholder="请输入内容"
                                v-model="q.productId">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
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
                fixed
                prop=""
                label="图片"
                width="160">
                <template slot-scope="scope">
                    <el-image
                        style="width: 120px; height: 120px"
                        :src="scope.row.mainImageUrl"></el-image>
                </template>
                </el-table-column>
                <el-table-column
                prop="productId"
                label="编号"
                width="150">
                </el-table-column>
                <el-table-column
                prop="fromDeptName"
                label="产品来源公司"
                width="">
                </el-table-column>
                <el-table-column
                prop="fromUserName"
                label="产品创建人"
                width="">
                </el-table-column>
                <el-table-column
                prop="toDeptName"
                label="认领公司"
                width="">
                </el-table-column>
                <el-table-column
                prop="toUserName"
                label="认领人员"
                width="">
                </el-table-column>
                <el-table-column
                prop="operatorName"
                label="操作人"
                width="">
                </el-table-column>
                <el-table-column
                prop="operatorTime"
                label="操作时间"
                width="">
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
</template>

<script>
  
  export default {
      data(){
          return{
            q:{
                productId:''
            },
            dataListLoading:true,
            nowProTypeId:[],
            dataList:[],
            pageSize:20,
            pageIndex:1,
            totalPage:0,
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
                url: this.$http.adornUrl('/product/productclaim/list'),
                method: 'get',
                params: this.$http.adornParams({
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                    'productId':this.q.productId
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
        }
      }
  }
</script>
