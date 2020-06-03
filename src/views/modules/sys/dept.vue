<template>
  <div class="mod-user">
      <!-- 搜索 -->
      <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">公司名称：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            size="medium"
                            placeholder="请输入公司名称"
                            v-model="dataForm.name"
                            clearable>
                        </el-input>
                        <!-- <el-cascader
                            v-model="dataForm.deptId"
                            :options="comList"
                            :props="{ label: 'name',value:'deptId',checkStrictly: true }"
                            clearable></el-cascader> -->
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">联系人：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            size="medium"
                            placeholder="请输入联系人"
                            v-model="dataForm.companyPerson"
                            clearable>
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
              <span style="float: left;overflow: hidden;">
                <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList()">查询</el-button>
                <el-button type="" icon="el-icon-refresh" size="medium" @click="clean()">重置</el-button>
              </span>
                <!-- <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList()">查询</el-button> -->
                <!-- <el-button type="" icon="el-icon-refresh" size="medium" @click="clean()">重置</el-button> -->
            </el-col>
        </el-row>
      </div>
    <!-- 操作 -->
      <div class="divM">
        <open-tab type="primary" icon="el-icon-plus" v-if="isAuth('sys:user:save')" dec='新增' urlName='deptAddUpdate' :opt='{"deptId":null}'></open-tab>
        <!-- <el-button v-if="isAuth('sys:user:delete')" type="primary" icon="el-icon-delete" size="small" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button> -->
        
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
      row-key="deptId"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align=""
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="deptId"
        header-align="center"
        align="center"
        width=""
        label="编号">
      </el-table-column>
      
      <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        label="上级公司">
      </el-table-column>
      <el-table-column
        prop="companyPerson"
        header-align="center"
        align="center"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="companyTel"
        header-align="center"
        align="center"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="280"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.deptId)">修改</el-button> -->
          <open-tab v-if="isAuth('sys:user:update')" type='text' dec='修改' urlName='deptAddUpdate' :opt='{"deptId":scope.row.deptId}'></open-tab>
          <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.deptId)">删除</el-button>
          <el-button v-if="isAuth('sys:recharge:recharge')" type="text" size="small" @click="rechargeVisible = true;rechargeData.deptId = scope.row.deptId">充值</el-button>
          <el-button v-if="isAuth('sys:recharge:recharge')" type="text" size="small" @click="getrechargeList(scope.row.deptId)">充值记录</el-button>
          <!-- <el-button v-if="isAuth('sys:recharge:recharge')" type="text" size="small" @click="xiaofList(scope.row.deptId)">消费记录</el-button> -->
          <open-tab type='text' dec='消费记录' urlName='xiaof' :opt='{"deptId":scope.row.deptId}'></open-tab>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" :dataList='dataList' :comList='comList'></add-or-update> -->
    <!-- 充值弹框 -->
    <el-dialog
      title="充值"
      :visible.sync="rechargeVisible"
      width="20%">
      <div>
        <div>
          <label style="display:inline-block;margin:10px 0 10px 0;font-weight:600">充值金额</label>
          <el-input
            placeholder="请输入内容"
            v-model="rechargeData.money"
            clearable>
          </el-input>
        </div>
        <div>
          <label style="display:inline-block;margin:20px 0 10px 0;font-weight:600">充值备注</label>
          <el-input
            placeholder="请输入内容"
            v-model="rechargeData.remark"
            clearable>
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeVisible = false">取 消</el-button>
        <el-button type="primary" @click="rechargeClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 充值记录 -->
    <el-dialog
      title="充值记录"
      :visible.sync="rechargeListVisible"
      width="50%">
      <div>
        <el-table
          :data="rechargeList"
          v-loading="rechargeListLoading"
          height="400"
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="充值人员"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="充值类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="beforeMoney"
            label="充值前金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            label="充值金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rechargeTime"
            label="充值时间"
            width="">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="充值备注">
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeListVisible = false">关 闭</el-button>
        <el-button type="primary" @click="outVisible = true">导出Excel</el-button>
      </span>
    </el-dialog>
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
  import AddOrUpdate from './dept-add-or-update'
  import OpenTab from '../../common/open'
  export default {
    data () {
      return {
        dataForm: {
          companyPerson: '',
          name:''
        },
        deptId:null,
        startDate:null,
        endDate:null,
        dataList: [],
        comList:[],
        dataListLoading: false,
        rechargeListLoading:false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        rechargeVisible:false,
        rechargeListVisible:false,
        xiaofeiVisible:false,
        outVisible:false,
        dataListSelections:[],
        rechargeList:[],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        rechargeData:{
          money:'',
          remark:'',
          deptId:null
        }
      }
    },
    components: {
      AddOrUpdate,OpenTab
    },
    activated () {
      this.getDataList();
      // this.getComList();
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/dept/list'),
          method: 'get',
          params: this.$http.adornParams({
            'name': this.dataForm.name,
            'companyPerson':this.dataForm.companyPerson
          })
        }).then(({data}) => {
          if (data.code == 0) {
            // this.comList = data.deptList;
            this.dataList = this.processingData(data.deptList);
            console.log(this.dataList);
            // this.totalPage = data.page.totalCount
          } else {
            this.dataList = [];
            this.$notify.error({
                title: '错误',
                message: data.msg
            });
          }
          this.dataListLoading = false
        })
      },
    //   获取公司下拉
    getComList(){
        this.$http({
          url: this.$http.adornUrl('/sys/dept/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data.code == 0) {
            this.comList = data.deptList;
            console.log(this.dataList);
            this.$store.dispatch('getComList')
            // this.totalPage = data.page.totalCount
          } else {
            this.$notify.error({
                title: '错误',
                message: data.msg
            });
          }
        })
    },
    //   重置
    clean(){
        this.dataForm = {
          name: '',
          companyPerson:''
        }
    },
    //   树型数据处理
      processingData(data){
        let result = []
        if(!Array.isArray(data)) {
            return result
        }
        data.forEach(item => {
            delete item.children;
        });
        let map = {};
        data.forEach(item => {
            map[item.deptId] = item;
        });
        data.forEach(item => {
            let parent = map[item.parentId];
            if(parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                result.push(item);
            }
        });
        return result;
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      // addOrUpdateHandle (id) {
      //   this.$router.push({ name: '产品管理',params:{id:id} })
      // },
      // 充值
      rechargeClick(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http({
          url: this.$http.adornUrl('/sys/companyrecharge/recharge'),
          method: 'post',
          data: this.$http.adornData(this.rechargeData)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.rechargeVisible = false
                loading.close();
                
              }
            })
            
          } else {
            this.$message.error(data.msg)
            loading.close();
          }
        })
        
      },
      // 充值记录
      getrechargeList(id){
        this.deptId = id;
        this.rechargeListVisible = true;
        this.rechargeListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/sys/companyrecharge/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'deptId': this.deptId
          })
        }).then(({data}) => {
          if (data.code == 0) {
            this.rechargeList = data.page.list
            // this.comList = data.deptList;
            // this.dataList = this.processingData(data.deptList);
            this.totalPage = data.page.totalCount
          } else {
            this.rechargeList = [];
            this.$notify.error({
                title: '错误',
                message: data.msg
            });
          }
          this.rechargeListLoading = false;
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getrechargeList(this.deptId)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getrechargeList(this.deptId)
      },
      // 导出
      outExcel(){
        // console.log(this.cookie.get('token'));
        window.location.href = this.$http.adornUrl('/sys/companyrecharge/export?deptId='+this.deptId+'&startDate='+this.startDate+'&endDate='+this.endDate+'&token='+this.$cookie.get("token"))
        this.outVisible = false;
        // this.$http({
        //   url: this.$http.adornUrl('/sys/companyrecharge/export'),
        //   method: 'get',
        //   params: this.$http.adornParams({
        //     'deptId': this.deptId,
        //     'startDate': this.startDate,
        //     'endDate': this.endDate
        //   }),
        //   responseType: 'arraybuffer',
        //   xsrfHeaderName: 'Authorization'
        // })
        // '../../sys/recharge/export?deptId='+this.deptId+'&startDate='+this.startDate+'&endDate='+this.endDate
        // var token = this.$cookie.get('token');
        
      },
      
      // 删除
      deleteHandle (id) {
        var deptId = id ;
        console.log(id);
        var that=this;
        this.$confirm(`确定对[id=${deptId}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log('qued')
          that.$http({
            url: that.$http.adornUrl('/sys/dept/delete'),
            method: 'get',
            params: this.$http.adornParams({
                'deptId':parseInt(deptId)
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              that.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  that.getDataList()
                }
              })
            } else {
              that.$message.error(data.msg)
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

</style>
