<template>
  <el-dialog
    title="我的账号"
    :visible.sync="visible"
    width="500px"
    :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
      <el-form-item label="账号">
        <span>{{ dataForm.username }}</span>
      </el-form-item>
      <el-form-item label="账号ID">
        <span>{{ dataForm.userId }}</span>
      </el-form-item>
      <el-form-item label="昵称" prop="displayName">
        <el-input v-model="dataForm.displayName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="enName">
        <el-input v-model="dataForm.enName"></el-input>
      </el-form-item>
      <el-form-item label="英文品牌" prop="enBrand">
        <el-input v-model="dataForm.enBrand"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称" prop="producerName">
        <el-input v-model="dataForm.producerName" placeholder="输入英文符号或数字"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      var producerNameR = (rule, value, callback) => {
        var reg = /^[0-9a-zA-Z]{1,}$/;
        if(reg.test(value)){
          callback()
        }else{
          callback(new Error('厂商名称只能为字母数字'))
        }
      }
      return {
        visible: false,
        dataForm: {
          username: '',
          userId: '',
          displayName: '',
          enName:'',
          enBrand:''
        },
        dataRule: {
          displayName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          enName: [
            { required: true, message: '英文名称不能为空', trigger: 'blur' }
          ],
          enBrand: [
            { required: true, message: '英文品牌不能为空', trigger: 'blur' }
          ],
          producerName: [
            { required: true, message: '厂商名称不能为空', trigger: 'blur' },
            { validator: producerNameR, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 初始化
      init () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http({
          url: this.$http.adornUrl('/sys/user/info'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.dataForm = data.user;
              this.visible = true
          }else{
              this.$message.error(data.msg)
          }
          loading.close();
        })
        
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        // })
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
            this.$http({
              url: this.$http.adornUrl('/sys/user/updateUser'),
              method: 'post',
              data: this.$http.adornData(this.dataForm)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.visible = false
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
              loading.close();
            })
          }
        })
      }
    }
  }
</script>

