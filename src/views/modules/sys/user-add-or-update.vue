<template>
  <div>
    <page-h ref="back" :id="dataForm.userId"></page-h>
    <div class="subDivForm">
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible = false">取消</el-button> -->
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;账号信息</h3>
          <el-form-item label="姓名" prop="displayName">
            <el-input v-model="dataForm.displayName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号名称" prop="username">
            <el-input v-model="dataForm.username" placeholder="账号长度必须在6到20个字符之间"></el-input>
          </el-form-item>
          <el-form-item v-if="!dataForm.userId" label="密码" prop="password">
            <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item v-if="!dataForm.userId" label="确认密码" prop="password1">
            <el-input v-model="dataForm.password1" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
        </div>
        

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="所属公司" prop="deptId">
            <el-select
              v-model="dataForm.deptId"
              filterable
              @change='deptChange'
              placeholder="请选择">
                  <el-option
                          v-for="item in $store.state.dept.comList"
                          :key="item.deptId"
                          :label="item.name"
                          :value="item.deptId">
                  </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英文名称" prop="enName">
            <el-input v-model="dataForm.enName" placeholder="英文名称"></el-input>
          </el-form-item>
          <el-form-item label="英文品牌" prop="enBrand">
            <el-input v-model="dataForm.enBrand" placeholder="英文品牌"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色" size="mini" prop="roleIdList">
            <el-checkbox-group v-model="dataForm.roleIdList">
              <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="状态" size="mini" prop="status">
            <el-radio-group v-model="dataForm.status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">正常</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if='isAuth("sys:user:iphone")' label="手机验证码" size="mini" prop="">
            <el-radio-group v-model="dataForm.iphone">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if='isAuth("sys:user:iphone")' label="速卖通" size="mini" prop="">
            <el-radio-group v-model="dataForm.aliexpress">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="获取订单" size="mini" prop="">
            <el-radio-group v-model="dataForm.orderFetch">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">使用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;注册资料信息</h3>
          <el-form-item label="注册公司名称" prop="userName">
            <el-input v-model="dataForm.information.registeredCompanyName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人名称" prop="userName">
            <el-input v-model="dataForm.information.legalName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="信用卡卡号" prop="userName">
            <el-input v-model="dataForm.information.cardNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="远程登录IP" prop="userName">
            <el-input v-model="dataForm.information.telnetIp" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="店铺邮箱" prop="userName">
            <el-input v-model="dataForm.information.storeEmail" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
        

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;收款资料信息</h3>
          <el-form-item label="收款名称" prop="userName">
            <el-input v-model="dataForm.information.paymentName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="收款账户" prop="userName">
            <el-input v-model="dataForm.information.collectionAccount" placeholder="请输入"></el-input>
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
    data () {
      var validatePassword = (rule, value, callback) => {
        var reg = /^(?![0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)(?![0-9]+$)(?![0-90-9A-Za-z]+$)(?![\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)(?![A-Za-z]+$)(?![a-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)[0-9A-Za-z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{8,}$/;
        var reg1 = /^[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/;
        if (!this.dataForm.userId && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          if(reg.test(value)){
            if(reg1.test(value)){
                callback(new Error('密码不能以字符开头'))
            }else {
                callback()
            }
          }else{
            callback(new Error('密码至少8位,要求必须字母、数字加英文符号(不包含空格)'))
          }
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.userId && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        roleList: [],
        dataForm: {
          userId: null,
          username: '',
          displayName:'',
          password: '',
          password1: '',
          deptId:'',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1,
          information:{},
          enName:'',
          enBrand:''
        },
        dataRule: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
          password1: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          displayName:[
            {required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          deptId:[
            {required: true, message: '所属公司不能为空', trigger: 'change' }
          ],
          enName:[
            {required: true, message: '英文名称不能为空', trigger: 'blur' }
          ],
          enBrand:[
            {required: true, message: '英文品牌不能为空', trigger: 'blur' }
          ],
          roleIdList:[
            {type: 'array',required: true, message: '角色不能为空', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      PageH
    },
    activated(){
      this.init(this.$route.params.userId)
    },
    computed: {
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
          })
        }).then(() => {
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deptId = data.user.deptId;
                this.dataForm.deptName = data.user.deptName;
                this.dataForm.displayName = data.user.displayName;
                this.dataForm.email = data.user.email;
                this.dataForm.enBrand = data.user.enBrand;
                this.dataForm.enName = data.user.enName;
                this.dataForm.groupId = data.user.groupId;
                this.dataForm.groupName = data.user.groupName;
                this.dataForm.information = data.user.information;
                this.dataForm.roleIdList = data.user.roleIdList;
                this.dataForm.salt = data.user.salt;
                this.dataForm.status = data.user.status;
                this.dataForm.username = data.user.username;
                this.dataForm.mobile = data.user.mobile;
                this.dataForm.aliexpress = data.user.aliexpress;
                this.dataForm.orderFetch =data.user.orderFetch;
              }
            })
          }
        })
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
            if(this.dataForm.userId){
                this.$http({
                  url: this.$http.adornUrl('/sys/user/update'),
                  method: 'post',
                  data: this.$http.adornData({
                    deptId:this.dataForm.deptId,
                    displayName:this.dataForm.displayName,
                    email:this.dataForm.email,
                    enBrand:this.dataForm.enBrand,
                    enName:this.dataForm.enName,
                    information:this.dataForm.information,
                    mobile:this.dataForm.mobile,
                    roleIdList:this.dataForm.roleIdList,
                    status:this.dataForm.status,
                    username:this.dataForm.username,
                    aliexpress:this.dataForm.aliexpress,
                    orderFetch:this.dataForm.orderFetch,
                    userId:this.dataForm.userId
                  })
                }).then(({data}) => {
                  if (data && data.code === 0) {
                    this.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                        // this.visible = false
                        this.$refs.back.removeTabHandle(this.mainTabsActiveName);
                        loading.close();
                        
                      }
                    })
                    
                  } else {
                    this.$message.error(data.msg)
                    loading.close();
                  }
                })
            }else{
              var that = this;
              this.$http({
                  url: this.$http.adornUrl('/sys/user/save'),
                  method: 'post',
                  data: this.$http.adornData(this.dataForm)
                }).then(({data}) => {
                  if (data && data.code === 0) {
                    that.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                        this.$refs.back.removeTabHandle(this.mainTabsActiveName);
                        loading.close();
                        
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
      deptChange(opt){
        this.dataForm.deptName = (this.$store.state.dept.comList.find(item => item.deptId == opt)).name;
        console.log(this.dataForm);
      }
    }
  }
</script>
<style>
</style>
