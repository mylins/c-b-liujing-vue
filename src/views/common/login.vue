<template>
  <div class="site-wrapper site-page--login">
    <el-image
          class="site-img-logo"
          style=""
          :src="require('@/assets/img/title.jpg')"></el-image>
    <div class="site-content__wrapperL">
      <!-- <div class="login-img"> -->
        
      <!-- </div> -->
      <div class="login-main">
        <h3 class="login-title">融艺汇</h3>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" status-icon>
          <el-form-item prop="userName">
            <el-input prefix-icon="el-icon-user-solid" v-model="dataForm.userName" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-s-goods" v-model="dataForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input prefix-icon="el-icon-s-opportunity" v-model="dataForm.captcha" placeholder="验证码" @keyup.enter.native="dataFormSubmit()">
                </el-input>
              </el-col>
              <el-col :span="10" class="login-captcha">
                <img :src="captchaPath" @click="getCaptcha()" alt="">
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="info" @click="dataFormSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
                this.$store.dispatch('getComList');
                this.$store.dispatch('getAreaList');
                this.$store.dispatch('getUser');
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-size: cover;
    }
    .site-img-logo{
      width: 600px;
      position:absolute;
      top:50%;
      left:50%;
      margin-top:-240px;
      margin-left:-560px
    }
    .site-content__wrapperL {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 0;
      margin: -260px 0 0 100px;
      height: 410px;
      // height: 480px;
      width: 620px;
      background-color: transparent;
      // box-shadow: 0 0 10px #eee;
      text-align: center;
      // border: 2px solid #000;
      border-radius: 50% 50%;
      // padding-top: 20px;
    }
    .login-img{
      display: inline-block;
      width: 570px;
    }
    .login-main {
      display: inline-block;
      width: 100%;
      // height: 480px;
      padding: 20px 140px;
      // background-color: #fff;
    }
    .login-title {
      font-size: 25px;
      color: #000;
      text-align: center;
      letter-spacing:2px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 30px;
      background: #000;
    }
  }
  @media (max-width:1200px){
    .site-wrapper.site-page--login {
      .site-img-logo{
        width: 400px;
        position:absolute;
        top:60%;
        left:50%;
        margin-top:-340px;
        margin-left:-200px
      }
      .site-content__wrapperL {
        position: absolute;
        top: 60%;
        left: 50%;
        padding: 0;
        margin: -200px 0 0 -310px;
        
      }
      .login-title {
        display: none;
      }
    }
  }
</style>
