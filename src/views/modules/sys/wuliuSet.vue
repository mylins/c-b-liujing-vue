<template>
  <div class="mod-user">
    <!-- 操作 -->
      <div class="" style="margin-bottom:10px">
        <el-button type="primary" icon="el-icon-setting" size="small" @click="getDept">设置公司参数</el-button>
        <el-button v-if="editOk" type="warning" icon="el-icon-edit" size="small" @click="edit">保存</el-button>
        <el-button v-else type="primary" icon="el-icon-edit" size="small" @click="editOk = true">修改参数</el-button>
        
      </div>

      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        style="width: 100%;">
        <el-table-column
          prop="countryName"
          label="国家">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop=""
          label="单价">
          <template slot-scope="scope">
              <el-input-number v-if="editOk" v-model="scope.row.price" controls-position="right"></el-input-number>
              <span v-else>{{scope.row.price}}</span>
              
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="加价">
          <template slot-scope="scope">
              <el-input-number v-if="editOk" v-model="scope.row.addPrice" controls-position="right"></el-input-number>
              <span v-else>{{scope.row.addPrice}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设置公司参数 -->
      <el-dialog
        title="设置公司参数"
        :visible.sync="setVisible"
        width="500px">
        <div>
          <el-form :model="setForm" ref="setRForm" label-width="130px" class="demo-dynamic">
            <el-form-item v-for="(item,index) in setForm.list" :key="index" :label="item.name" :prop="'list.'+index+'.value'" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
              <el-input v-model="item.value"></el-input>
              <p style="color:#E6A23C;margin:0">{{item.remark}}</p>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setVisible = false">取 消</el-button>
          <el-button type="primary" @click="setDept">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        setVisible:false,
        deptId:null,
        startDate:null,
        endDate:null,
        dataList: [],
        comList:[],
        editOk:false,
        dataListLoading: false,
        setForm:{
          list:[{
            value:'',
            name:'',
            remark:''
          }]
        }
      }
    },
    created () {
      this.getDataList();
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/product/productfreightprice/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data.code == 0) {
            this.dataList = data.list;
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      // 获取公司参数
      getDept(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http({
          url: this.$http.adornUrl('/sys/sysdict/getGlobalData'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          loading.close();
          if (data.code == 0) {
            console.log(data);
            this.setForm.list = data.dataList;
            this.setVisible = true;
          } else {
            that.$message.error(data.msg)
          }
        })
      },
      // 设置公司参数
      setDept(){
        this.$refs['setRForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
              url: this.$http.adornUrl('/sys/sysdict/saveGlobalData'),
              method: 'post',
              data: this.$http.adornData({
                dataList:this.setForm.list
              })
            }).then(({data}) => {
              loading.close();
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.setVisible = false;
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            return false;
          }
        });
      },
    //   修改参数
      edit(){
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http({
            url: this.$http.adornUrl('/product/productfreightprice/updateAll'),
            method: 'post',
            data: this.$http.adornData(this.dataList, false)
        }).then(({data}) => {
            if (data && data.code === 0) {
                this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        this.getDataList();
                        this.editOk = false;
                    }
                })
            } else {
                this.$message.error(data.msg)
            }
            loading.close();
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
        margin-bottom: 10px;
    }
    .statics .left{
        width: 300px;
    }
    .detailsDiv>div{
      display: inline-block;
      width: 250px;
      margin-right: 5px;
      margin-bottom: 10px;
      line-height: 26px;
    }
    .detailsDiv>div label{
      display: inline-block;
      width: 116px;
      color: #999;
      /* text-align: right; */
      margin-left: 6px;
    }

</style>
