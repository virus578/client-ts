<template>
  <div class="login-container">
    <div class="logo" />
    <div class="title" />
    <!--  -->
    <div class="form-cell">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-position="left"
      >
        <el-form-item
          prop="userName"
          class="user-name"
        >
          <el-input
            ref="username"
            v-model="loginForm.userName"
            name="username"
            type="text"
            autocomplete="on"
            placeholder="用户名:"
            maxlength="20"
          />
        </el-form-item>

        <el-form-item
          prop="passWord"
          class="pass-word"
        >
          <el-input
            ref="password"
            :key="passwordType"
            v-model="loginForm.passWord"
            :type="passwordType"
            name="passWord"
            placeholder="密码:"
            maxlength="20"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
          </span>
        </el-form-item>
        <el-form-item
          prop="checkCode"
          class="check-code"
        >
          <el-input
            ref="loginForm"
            v-model="loginForm.checkCode"
            name="checkCode"
            type="text"
            class="verification-code"
            placeholder="验证码:"
            @keyup.enter.native="handleLogin"
          />
          <div class="verification-code-img-cell">
            <img
              :src="verificationCodeUrl"
              alt=""
              @click="GetCode"
            >
          </div>
        </el-form-item>
        <el-form-item
          prop=""
          class="login-button"
        >
          <el-button
            v-waves
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
import { Form as ElForm, Input } from 'element-ui'
import { LoginModule } from '@/store/modules/login'
import { isValidUsername } from '@/utils/validate'
import { login } from '@/api/login'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'Login'
})
export default class extends Vue {
  // private validateUsername = (rule: any, value: string, callback: Function) => {
  //   if (!isValidUsername(value)) {
  //     callback(new Error('Please enter the correct user name'))
  //   } else {
  //     callback()
  //   }
  // }
  // private validatePassword = (rule: any, value: string, callback: Function) => {
  //   if (value.length < 6) {
  //     callback(new Error('The password can not be less than 6 digits'))
  //   } else {
  //     callback()
  //   }
  // }
  private loginForm = {
    userName: '',
    passWord: '',
    checkCode: '',
    captcha_uuid: ''
  }
  private loginRules = {
    userName: [
      { required: true, message: '账号不能为空,请输入账号', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    passWord: [
      { required: true, message: '密码不能为空,请输入的密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    checkCode: [
      { required: true, message: '验证码不能为空,请输入验证码', trigger: 'blur' },
      { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
    ]
  }
  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}
  private verificationCodeUrl:string = ''

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.userName === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.passWord === '') {
      (this.$refs.password as Input).focus()
    }
    this.GetCode()
  }

  private GetCode() {
    fetch(`${process.env.VUE_APP_BASE_API}/supplier/verify-code`, {
      mode: 'cors'
    }).then(res => {
      this.loginForm.captcha_uuid = res.headers.get('Captcha-Uuid') as string
      res.blob().then(myBlob => {
        this.verificationCodeUrl = URL.createObjectURL(myBlob)
      })
    })
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        await LoginModule.GetLogin({ password: this.loginForm.passWord, username: this.loginForm.userName.trim(), captcha: this.loginForm.checkCode, captcha_uuid: this.loginForm.captcha_uuid }).catch(res => {
          this.GetCode()
          this.loading = false
        })
        await this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
        // await this.$router.go(0)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        this.loading = false
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input {
    input { color: #fff; }
    input::first-line { color: #eee; }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $titleColor;
      caret-color: #fff;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px rgba(0,0,0,0.8) inset !important;
        -webkit-text-fill-color: #fff !important;
        opacity: 0.5 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  background: url('~@/assets/theme/background.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
//  css样式写错 会影响布局
  .logo {
    position: absolute;
    top: 0.5rem;
    left: 1.23rem;
    width: 162px;
    height: 55px;
    background: url('~@/assets/theme/logo.png') no-repeat center center;
  }
  .title {
    position: absolute;
    top: 0.92rem;
    left: 5.91rem;
    width: 736px;
    height: 120px;
    background: url('~@/assets/theme/text.png') no-repeat center -12%;
  }
  .form-cell {
    position: relative;
    width: 4.42rem;
    height: 5.16rem;
    top: 2.44rem;
    margin: 0 auto;
    padding: 0.22rem 0.2rem;
    background: url('~@/assets/theme/login-bg.png') no-repeat center center;
    box-sizing: border-box;
  }
  .user-name,.check-code,.pass-word {
    margin-top:0.38rem;
  }
  .login-button {
    margin-top: 0.45rem;
  }
  .login-form {
    width: 4.2rem;
    max-width: 100%;
    padding: 0.22rem 0.1rem;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
  .check-code {
    position: relative;
  }
  .verification-code {
    width: 61%;
  }
  .verification-code-img-cell {
    height: 46px;
    position: absolute;
    top: 0;
    right: 0;
    img {
      height: 46px;
    }
  }
  .el-input input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px rgba(0,0,0,0.3) inset !important;
  }
}
</style>
