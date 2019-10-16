<template>
  <div class="box">
    <div class="row">
      <div>
        用户名：
      </div>
      <label>
        {{ account_info.username }}
      </label>
    </div>
    <div class="row">
      <div>
        密码：
      </div>
      <label>*******
        <a
          class="point"
          style="padding-left: 20px;"
          @click="changePass"
        >修改密码</a>
      </label>
    </div>
    <div class="row">
      <div>
        公司名称：
      </div>
      <label>
        {{ account_info.supplier_name }}
      </label>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
import { parse } from 'path'
import { privateDecrypt } from 'crypto'
@Component({
  name: 'account',
  components: {
  }
})
export default class extends Vue {
  private changePass() {
    this.$emit('open')
  }
  @Prop({}) private account_info!: object
}
</script>

<style lang="scss" scoped>
  .box{
    font-size: 13px;
    height: 100vh;
    .row{
      line-height: 30px;
      clear: both;
      div{
        text-align: right;
        float: left;
        min-width: 200px;
        font-weight: bolder;
      }
    }
  }
</style>
