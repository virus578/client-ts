<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialog"
    width="550px"
    @close="close"
  >
    <el-form
      ref="rule"
      :model="rule"
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
          v-model="rule.username"
          class="input-width"
        />
      </el-form-item>
      <el-form-item
        label="邮箱："
        prop="email"
        required
      >
        <el-input
          v-model="rule.email"
          class="input-width"
        />
        <div style="display:inline-block">
          <img
            :src="img"
            title="用户账号绑定的邮箱，用于接收密码、找回密码等功能"
            width="20px"
            class="img"
          >
          <el-checkbox
            v-model="checked"
            style="padding-left: 30px;"
            disabled
          >
            发送邮件
          </el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="rule.status"
          placeholder="请选择"
        >
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
import { Form as ElForm } from 'element-ui'
// import img from '@/assets/theme/emial.png'
import { UserManagerModule } from '@/store/modules/user-managser'
interface label{
  label:string,
  value:number
}
interface rule{
  username: string,
  email: string,
  status: number,
}
@Component({
  name: 'add'
})
export default class extends Vue {
  @Prop() value!:Boolean
  private dialog:Boolean=false
  private rule:rule={
    username: '',
    email: '',
    status: 1
  }
  private img = require('@/assets/theme/emial.png')
  private checked:Boolean=true
  private statusArr:Array<label>=[
    { label: '启用', value: 1 },
    { label: '停用', value: 0 }
  ]
  private rules:object={
    username: [
      { validator: this.usernameRule, trigger: 'blur' }
    ],
    email: [
      { validator: this.emailRule, trigger: 'blur' }
    ]
  }
  @Watch('value')
  private watchValue(val:Boolean) {
    this.dialog = val
  }
  @Watch('dialog')
  private watchdialog(val:Boolean) {
    this.$emit('input', val)
  }
  private submit(val:string) {
    (this.$refs[val] as ElForm).validate((valid:any) => {
      if (valid) {
        UserManagerModule.add_user(this.rule).then((res:any) => {
          this.$message({ type: 'success', message: res.message })
          this.dialog = false
          this.$emit('init')
        })
      } else {
        return false
      }
    })
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
  private close() {
    (this.$refs['rule'] as ElForm).resetFields()
    this.rule = {
      username: '',
      email: '',
      status: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width{
    width: 300px
  }
  .img{
    position: absolute;
    top: 50%;
    margin: -10px 0 0 5px;
    z-index: 999;
  }
</style>
