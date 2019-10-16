<template>
  <el-dialog
    v-el-draggable-dialog
    title="修改密码"
    :visible.sync="dialog"
    class="mdfpassworld"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="原密码："
        prop="old_password"
        required
      >
        <el-input
          v-model="ruleForm.old_password"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="新密码："
        prop="new_password"
        required
      >
        <el-input
          v-model="ruleForm.new_password"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirm_password"
        required
      >
        <el-input
          v-model="ruleForm.confirm_password"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
        <el-button
          size="small"
          @click="resetForm('ruleForm')"
        >
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'vue-property-decorator'
import { MessageModule } from '@/store/modules/message'
import { LoginModule } from '@/store/modules/login'
import { Form as ElForm, Input } from 'element-ui'
interface rule{
  old_password: string,
  new_password: string,
  confirm_password: string
}
@Component({
  name: 'mdfpassworld'
})
export default class extends Vue {
  private dialog:Boolean=false
  private rules:object={
    old_password: [
      { validator: this.old_password }
    ],
    new_password: [
      { validator: this.new_password }
    ],
    confirm_password: [
      { validator: this.confirm_password }
    ]
  }
  private ruleForm:rule={
    old_password: '',
    new_password: '',
    confirm_password: ''
  }
  @Prop({}) private value!:Boolean
  @Watch('value')
  private wat_value(val:Boolean) {
    this.dialog = val
  }
  @Watch('dialog')
  private wat_dialog(val:Boolean) {
    this.$emit('input', val)
  }
  private old_password(rule:any, value:string, callback:Function) {
    if (value === '') {
      return callback(new Error('原密码不能为空'))
    }
    callback()
  }
  private new_password(rule:any, value:string, callback:Function) {
    if (value === this.ruleForm.old_password) {
      return callback(new Error('不能与原密码相同'))
    }
    if (value.length < 6 || value.length > 20) {
      return callback(new Error('必须为6-20个英文、数字或者下划线'))
    } else {
      const W = /\W/.exec(value)
      if (W) {
        return callback(new Error('只能输入字母、数字、下划线'))
      }
    }
    callback()
  }
  private confirm_password(rule:any, value:string, callback:Function) {
    if (value === '') {
      return callback(new Error('确认密码不能为空'))
    }
    if (value !== this.ruleForm.new_password) {
      return callback(new Error('与新密码不一致'))
    }
    callback()
  }
  private submitForm(val:string) {
    (this.$refs[val] as ElForm).validate((valid:any) => {
      if (valid) {
        MessageModule.mdfPassworld(this.ruleForm).then(async(res:any) => {
          if (res) {
            this.dialog = false
            this.resetForm('ruleForm')
            await LoginModule.RefreshToken()
            sessionStorage.clear()
            this.$router.push('/login')
          }
        })
      } else {
        // await LoginModule.ExitLogin()
        return false
      }
    })
  }
  private resetForm(val:string) {
    (this.$refs[val] as ElForm).resetFields()
    this.dialog = false
    this.ruleForm.old_password = ''
    this.ruleForm.new_password = ''
    this.ruleForm.confirm_password = ''
  }
  private handleClose() {
    this.resetForm('ruleForm')
  }
}
</script>

<style lang="scss">
 .mdfpassworld{
   font-size: 16px;
 }
</style>
