<template>
  <el-dialog
    :title="!dataForm.groupId ? '新增' : '修改'"
    :close-on-click-modal="false"
    width="420px"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
      <el-form-item label="小组名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="小组成员" prop="deptId">
        <el-select
          v-model="userListS"
          filterable
          multiple
          @change="userChange"
          placeholder="请选择">
              <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.displayName"
                      :value="item.userId">
              </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
// import func from '../../../../vue-temp/vue-editor-bridge'
  export default {
    data () {
    
      return {
        visible: false,
        userList: [],
        userListS:[],
        dataForm: {
          name:'',
          deptId:null,
          userList:[],
          userIdList:[],
          flag:0,
        },
        dataRule: {
          name: [
            { required: true, message: '小组名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

      init (id) {
        this.dataForm.groupId = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/user/getGroupUserList'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.userList = data && data.code === 0 ? data.userList : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
            
          })
        }).then(() => {
          if (this.dataForm.groupId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sysgroup/info/${this.dataForm.groupId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.sysGroup;
                this.userList = this.userList.concat(this.dataForm.userList)
                this.userListS = [];
                var that = this;
                this.dataForm.userList.forEach(function(item){
                  that.userListS.push(item.userId);
                })
              }
            })
          }else{
            this.dataForm.flag = 1;
            console.log(this.dataForm);
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            
            let that = this;
            if(this.dataForm.flag == 1){
              this.dataForm.userList = [];
              this.userListS.forEach(function(m){
                that.dataForm.userList.push(that.userList.find(item => item.userId == m))
              })
              this.dataForm.userIdList = this.userListS;
            }
            
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            if(this.dataForm.groupId){
                this.$http({
                  url: this.$http.adornUrl('/sys/sysgroup/update'),
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
                        loading.close();
                        this.$emit('refreshDataList')
                      }
                    })
                    
                  } else {
                    this.$message.error(data.msg)
                    loading.close();
                  }
                })
            }else{
              this.$http({
                  url: this.$http.adornUrl('/sys/sysgroup/save'),
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
                        loading.close();
                        this.$emit('refreshDataList')
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
      // 小组成员改变
      userChange(val){
        this.dataForm.flag = 1;
        console.log(this.dataForm);
      }

    }
  }
</script>
<style>
</style>
