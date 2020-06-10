<template>
  <div class="mod-user">
    <!-- 搜索 -->
      <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">订单ID：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            size="medium"
                            placeholder="请输入"
                            v-model="dataForm.orderId"
                            clearable>
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">消费类型：</label>
                    </el-col>
                    <el-col :span="18">
                      <el-select v-model="dataForm.type" filterable clearable placeholder="请选择">
                          <el-option
                            key="2"
                            label="服务费"
                            value="服务费">
                          </el-option>
                          <el-option
                            key="3"
                            label="物流费"
                            value="物流费">
                          </el-option>
                        </el-select>
                        
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">小组名称：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-select v-model="dataForm.groupId" clearable placeholder="请选择" @focus='getGroupList'>
                          <el-option
                            v-for="item in groupList"
                            :key="item.groupId"
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
                        <label class="labelSS">员工名称：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-select v-model="dataForm.userId" clearable placeholder="请选择" @focus='getuserList'>
                          <el-option
                            v-for="item in userList"
                            :key="item.userId"
                            :label="item.displayName"
                            :value="item.userId">
                          </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
              <span style="float: right;overflow: hidden;">
                <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList()">查询</el-button>
                <el-button type="" icon="el-icon-refresh" size="medium" @click="clean()">重置</el-button>
              </span>
                
            </el-col>
        </el-row>
      </div>
    <!-- 操作 -->
      <div class="divM" style="margin-bottom:10px">
        <el-button v-if="isAuth('sys:dept:export')" type="primary" icon="el-icon-upload2" size="small" @click="outVisible = true;startDate = '';endDate = '';">导出Excel</el-button>
      </div>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        style="width: 100%;">
              <el-table-column
            prop="companyConsumeId"
            header-align="center"
            align="center"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="deptName"
            header-align="center"
            align="center"
            label="公司"
            width="120">
        </el-table-column>
        <el-table-column
            prop="userName"
            header-align="center"
            align="center"
            label="操作人"
            width="120">
        </el-table-column>
        
        <el-table-column
            prop="type"
            header-align="center"
            align="center"
            label="类型"
            width="">
        </el-table-column>
              <el-table-column
            prop="orderId"
            header-align="center"
            align="center"
            label="订单ID"
            width="120">
        </el-table-column>
        
        <el-table-column
            prop="money"
            header-align="center"
            align="center"
            label="金额"
            width="">
        </el-table-column>
              <el-table-column
            prop="abroadWaybill"
            header-align="center"
            align="center"
            label="运单号"
            width="120">
        </el-table-column>
        
        <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间"
            width="">
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
      <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
      <!-- 导出时间 -->
      <el-dialog
        title="充值"
        :visible.sync="outVisible"
        width="20%">
        <div>
          <div>
            <label style="display:inline-block;margin:10px 0 10px 0;font-weight:600">开始时间</label>
            <el-date-picker
              v-model="startDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div>
            <label style="display:inline-block;margin:20px 0 10px 0;font-weight:600">结束时间</label>
            <el-date-picker
              v-model="endDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="outVisible = false">取 消</el-button>
          <el-button type="primary" @click="outExcel">导 出</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          type: null,
          orderId:'',
          deptId:'',
          groupId:'',
          userId:''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        groupList:[],
        userList:[],
        outVisible:false,
        startDate:null,
        endDate:null
      }
    },
    components: {
    },
    created () {
      
      console.log(this.$route.params.deptId)
      this.dataForm.deptId = this.$route.params.deptId
      this.getDataList();
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/companyconsume/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'orderId': this.dataForm.orderId,
            'deptId':this.dataForm.deptId,
            'groupId':this.dataForm.groupId,
            'userId':this.dataForm.userId,
            'type':this.dataForm.type
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
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
        this.dataForm = {
          type: '',
          orderId:'',
          groupId:'',
          userId:''
        }
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
      // 获取人员下拉
        getuserList(){
            if(this.dataForm.deptId){
                this.$http({
                url: this.$http.adornUrl('/sys/user/getUserList'),
                method: 'get',
                params: this.$http.adornParams({
                    'deptId':this.dataForm.deptId,
                    'groupId':this.dataForm.groupId
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
      // 导出
      outExcel(){
        window.location.href = this.$http.adornUrl('/sys/companyconsume/export?deptId='+this.deptId+'&startDate='+this.startDate+'&endDate='+this.endDate+'&token='+this.$cookie.get("token"))
      
        this.outVisible = false;
        
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
        margin-bottom: 10px;
    }
    .statics .left{
        width: 300px;
    }
    .el-col{
      margin-bottom: 10px;
    }

</style>
