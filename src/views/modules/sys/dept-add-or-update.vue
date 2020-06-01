<template>
  <div>
    <page-h :id="dataForm.deptId"></page-h>
    <div class="subDivForm">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </span>
    </div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="130px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="类型" size="mini" prop="deptType">
            <el-radio-group v-model="dataForm.deptType">
              <el-radio :label="1">区域代理商</el-radio>
              <el-radio :label="2">加盟商</el-radio>
            </el-radio-group>
          </el-form-item>
          <br>
          <el-form-item label="公司名称" prop="requiredF">
            <el-input v-model="dataForm.name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="上级公司" prop="parentId">
            <el-select v-model="dataForm.parentId" clearable placeholder="请选择" @focus="getComTopList">
              <el-option
                v-for="item in comTopList"
                :key="item.deptId"
                :label="item.name"
                :value="item.deptId">
              </el-option>
            </el-select>
            
          </el-form-item>
          <el-form-item label="公司账户数" prop="requiredF">
            <el-input v-model="dataForm.accountCount" placeholder="公司账户数"></el-input>
          </el-form-item>
          <el-form-item label="公司SKU信息" prop="requiredF">
            <el-input v-model="dataForm.companySku" placeholder="公司SKU信息"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="requiredF">
            <el-input v-model="dataForm.companyAddress" placeholder="公司地址"></el-input>
          </el-form-item>
          <el-form-item label="公司负责人" prop="requiredF">
            <el-input v-model="dataForm.companyPerson" placeholder="公司负责人"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="requiredF">
            <el-input v-model="dataForm.companyTel" placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="requiredF">
            <el-input v-model="dataForm.companyQq" placeholder="QQ"></el-input>
          </el-form-item>
          <el-form-item label="是否获取订单" size="mini" prop="status">
            <el-radio-group v-model="dataForm.orderFetch">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="共享公司" prop="mobile" class="join">
            <el-select
              v-model="deptList"
              multiple
              filterable
              placeholder="请选择"
              @change="deptChange">
                  <el-option
                          v-for="item in comList"
                          :key="item.deptId"
                          :label="item.name"
                          :value="item.deptId">
                  </el-option>
            </el-select>
          </el-form-item>
        </div>
        
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;金额信息</h3>
          <el-form-item label="平台佣金点数" prop="requiredF">
            <el-input v-model="dataForm.companyPoints" placeholder="平台佣金点数"></el-input>
          </el-form-item>
          <el-form-item label="最低物流限额" prop="requiredF">
            <el-input v-model="dataForm.limitMoney" placeholder="最低物流限额"></el-input>
          </el-form-item>
          <el-form-item label="余额" prop="requiredF">
            <el-input v-model="dataForm.balance" placeholder="余额"></el-input>
          </el-form-item>
          <el-form-item label="10天内物流消费" prop="requiredF">
            <el-input v-model="dataForm.consum" placeholder="10天内物流消费（含服务费）"></el-input>
          </el-form-item>
        </div>
        
      </el-form>
    </div>
  </div>
  
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  import PageH from '../../common/pageH'
  export default {
    // props:['comList','dataList'],
    data () {
      return {
        visible: false,
        roleList: [],
        deptList:[],
        comList:[],
        comTopList:[],
        dataForm: {
            accountCount: null,
            balance: null,
            companyAddress: "",
            companyPerson: "",
            companyPoints: null,
            companyQq: null,
            companySku: "",
            companyTel: "",
            consum: null,
            createTime: "",
            dataShareList: [],
            delFlag: 0,
            deptId: null,
            deptType: 1,
            flag: 0,
            limitMoney: null,
            name: "",
            orderFetch: 1,
            parentId: null,
            parentName: null,
            updateTime: null,
        },
        comTopList:[],
        dataRule: {
          // name: [
          //   { required: true, message: '公司名称不能为空', trigger: 'blur' }
          // ],
          parentId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          // deptType: [
          //   { required: true, message: '请选择类型', trigger: 'blur' }
          // ],
          requiredF: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      PageH
    },
    activated(){
      this.init(this.$route.params.deptId)
    },
    methods: {
      init (id) {
        console.log(id)
        this.dataForm.deptId = id || 0
        this.visible = true
        if (this.dataForm.deptId) {
          this.$http({
            url: this.$http.adornUrl(`/sys/dept/info/${this.dataForm.deptId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data);
              this.dataForm = data.sysDept
              var that = this
              that.deptList = [];
              this.dataForm.dataShareList.forEach(function(item){
                that.deptList.push(item.deptId)
              })
            }
          })
        }else{
          this.$nextTick(() => {
            this.dataForm = {
              accountCount: 0,
              balance: 0,
              companyAddress: "",
              companyPerson: "",
              companyPoints: null,
              companyQq: null,
              companySku: "",
              companyTel: "",
              consum: 0,
              createTime: "",
              dataShareList: [],
              delFlag: 0,
              deptId: null,
              deptType: 1,
              flag: 0,
              limitMoney: null,
              name: "",
              orderFetch: 1,
              parentId: null,
              parentName: null,
              updateTime: null,
            }
          })
        }
      },
      deptChange () {
          if(this.dataForm.flag == 0){
              this.dataForm.flag = 1;
          }
      },
      
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            var that = this;
            this.dataForm.dataShareList = [];
              this.deptList.forEach(function (t) {
                  that.comList.forEach(function (i) {
                      if(i.deptId == t){
                          that.dataForm.dataShareList.push({
                              shareDeptId:i.deptId,
                              shareDeptName:i.name
                          });
                          return
                      }
                  })
              })
            this.$http({
              url: this.$http.adornUrl(`/sys/dept/${!this.dataForm.deptId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData(this.dataForm)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    loading.close();
                    // this.$emit('refreshDataList');
                    this.$nextTick(() => {
                      this.$refs['dataForm'].resetFields();
                    })

                  }
                })
              } else {
                this.$message.error(data.msg)
                loading.close();
              }
            })
          }
        })
      },
      // 获取上级公司列表
      getComTopList(){
        this.$http({
          url: this.$http.adornUrl('/sys/dept/selectParentDeptList'),
          method: 'get',
          params: this.$http.adornParams({
            'deptType':this.dataForm.deptType
          })
        }).then(({data}) => {
          if (data.code == 0) {
            this.comTopList = data.deptList;
            // this.totalPage = data.page.totalCount
          } else {
            this.$notify.error({
                title: '错误',
                message: data.msg
            });
          }
        })
      }
    }
  }
</script>
<style>
  
    
</style>
