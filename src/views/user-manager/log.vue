<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
    width="1000px"
  >
    <el-table
      :data="table"
      style="width: 100%"
      border
      height="400"
    >
      <el-table-column
        prop="operator"
        label="操作人"
        width="100"
        align="center"
      />
      <el-table-column
        prop="create_time"
        label="日期"
        width="150"
        align="center"
      />
      <el-table-column
        prop="type_text"
        label="操作状态"
        width="150"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="操作记录"
      />
    </el-table>
    <div class="close">
      <el-button
        size="mini"
        @click="dialog=false"
      >
        关闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { logtable } from './user-manager'
@Component({
  name: 'log'
})
export default class extends Vue {
  @Prop() private table!:logtable
  @Prop() private value!:Boolean
  @Prop() private title!:string
  private dialog:Boolean=false
  @Watch('value')
  private watchvalue(val:Boolean) {
    this.dialog = val
  }
  @Watch('dialog')
  private watchdialog(val:Boolean) {
    this.$emit('input', val)
  }
}
</script>

<style lang="scss" scoped>
.close{
    text-align: right;
    padding-top: 20px;
}
</style>
