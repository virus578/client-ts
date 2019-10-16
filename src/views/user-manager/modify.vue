<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="dialog"
    width="500px"
    @close="close"
  >
    <el-form
      ref="rule"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名："
        prop="username"
        required
      >
        <el-input
          v-model="ruleForm.username"
          class="input-width"
        />
      </el-form-item>
      <el-form-item
        label="邮箱："
        prop="email"
        required
      >
        <el-input
          v-model="ruleForm.email"
          class="input-width"
        />
        <img
          :src="img"
          title="用户账号绑定的邮箱，用于接收密码、找回密码等功能"
          width="20px"
          class="img"
        >
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          @click="dialog=false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="submit('rule')"
        >
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { callbackify } from 'util'
import { Form as ElForm, Input } from 'element-ui'
// import img from '@/assets/theme/emial.png'
interface rule{
  username:string,
  email:string
}

@Component({
  name: 'modify'
})
export default class extends Vue {
  @Prop() ruleForm!:rule
  @Prop() value!:Boolean
  private dialog:Boolean=false
  private rules:object={
    username: [
      { validator: this.usernameRule }
    ],
    email: [
      { validator: this.emailRule }
    ]
  }
  private img = require('@/assets/theme/emial.png')
  @Watch('value')
  private watchValue(val:Boolean) {
    this.dialog = val
  }
  @Watch('dialog')
  private watchdialog(val:Boolean) {
    this.$emit('input', val)
  }
  private usernameRule(rule:any, value:string, callback:Function) {
    if (value === '') {
      return callback(new Error('用户名不能为空'))
    }
    if (value.length < 6 || value.length > 20) {
      return callback(new Error('长度必须为6-20个数字、字母'))
    }
    if (!(/[A-Za-z]/.exec(value[0]))) {
      return callback(new Error('首字母必须为字母'))
    }
    if (/\W/.exec(value)) {
      return callback(new Error('只能输入字母、数字'))
    }
    callback()
  }
  private emailRule(rule:any, value:string, callback:Function) {
    if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value))) {
      return callback(new Error('请输入正确的邮箱格式'))
    }
    callback()
  }
  private submit(val:string) {
    (this.$refs[val] as ElForm).validate((valid:any) => {
      if (!valid) {
        return false
      } else {
        this.$emit('save')
      }
    })
  }
  private close() {
    (this.$refs['rule'] as ElForm).resetFields()
    this.$emit('close')
  }
}
</script>

<style scoped lang="scss">
  .input-width{
    width: 300px
  }
  .img{
    position: absolute;
    top: 50%;
    margin: -10px 0 0 5px;
  }
</style>
