<template>
  <div class="mod-user">
    <!-- 搜索 -->
      <div class="sous">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3" v-if="$store.state.dept.user.type != 2">
              <el-select v-model="dataForm.deptId" filterable clearable placeholder="选择公司">
                  <el-option
                    v-for="item in $store.state.dept.comList"
                    :key="item.deptId"
                    :label="item.name"
                    :value="item.deptId">
                  </el-option>
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
              <el-select v-model="dataForm.groupId" clearable placeholder="选择小组" @focus='getGroupList'>
                <el-option
                  v-for="item in groupList"
                  :key="item.groupId"
                  :label="item.name"
                  :value="item.groupId">
                </el-option>
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <span style="">
                <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList()">查询</el-button>
                <el-button type="" icon="el-icon-refresh" size="medium" @click="clean()">重置</el-button>
              </span>
                
            </el-col>
        </el-row>
      </div>
    <!-- 操作 -->
      <div class="" style="margin-bottom:10px">
        <el-button v-if="isAuth('sys:user:save')" type="primary" icon="el-icon-plus" size="small" @click="addOrUpdateHandle()">新增</el-button>
        
      </div>
    <!-- 统计 -->
      <!-- <div class="statics divM">
          <div class="left">
              <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ dataListSelections.length }}</a>&nbsp;项&nbsp;&nbsp;
          </div>
      </div> -->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <!-- <el-table-column
					type="selection"
          header-align="center"
          align="center"
					width="55">
			</el-table-column> -->
            <el-table-column
					prop="groupId"
          header-align="center"
          align="center"
					label="ID"
                    width="80">
			</el-table-column>
			<el-table-column
					prop="name"
          header-align="center"
          align="center"
					label="小组名称"
					width="120">
			</el-table-column>
			<el-table-column
					prop="deptId"
          header-align="center"
          align="center"
					label="所属公司ID"
					width="120">
			</el-table-column>
			<el-table-column
					prop="createUser"
          header-align="center"
          align="center"
					label="创建人"
					width="">
			</el-table-column>
			<el-table-column
					prop="createTime"
          header-align="center"
          align="center"
					label="创建时间"
					width="">
			</el-table-column>
			<el-table-column
					fixed="right"
          header-align="center"
          align="center"
          width="80"
					label="操作">
				<template slot-scope="scope">
					<el-button v-if="isAuth('sys:user:update')" icon="el-icon-edit" type="text" size="small" @click="addOrUpdateHandle(scope.row.groupId)"></el-button>
          <el-button v-if="isAuth('sys:user:delete')" icon="el-icon-delete" type="text" size="small" @click="deleteHandle(scope.row.groupId)"></el-button>
				</template>
			</el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './group-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          deptId:null,
          groupId:null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        groupList:[]
      }
    },
    components: {
      AddOrUpdate
    },
    created () {
      if(this.$store.state.dept.user.type == 2){
        this.dataForm.deptId = this.$store.state.dept.user.deptId;
      }
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/sysgroup/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'deptId':this.dataForm.deptId,
            'groupId':this.dataForm.groupId
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
      // 重置
      clean(){
        this.dataForm = {
          userName: '',
          displayName:'',
          deptId:null,
          groupId:null
        }
        this.getDataList();
      },
      // 获取小组下拉
      getGroupList(){
        if(this.dataForm.deptId){
            this.$http({
            url: this.$http.adornUrl('/sys/sysgroup/select'),
            method: 'get',
            params: this.$http.adornParams({
              'deptId':this.dataForm.deptId,
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
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对id进行[删除}]操作?`, '提示', {
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
            url: this.$http.adornUrl('/sys/sysgroup/delete'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            loading.close()
            if (data && data.code === 0) {
              this.getDataList();
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      // 重置密码
      resetPassword(){
        var userIds = this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行['重置密码']操作?`, '提示', {
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
            url: this.$http.adornUrl('/sys/user/resetPassword'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            loading.close();
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                  
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
        margin-bottom: 10px;
    }
    .statics .left{
        width: 300px;
    }
    .el-col{
      margin-bottom: 10px;
    }

</style>
