<template>
  <div class="shipping-management page-config">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="打印中"
        name="first"
      >
        <printLabelsPending />
      </el-tab-pane>
      <el-tab-pane
        label="未完结采购单"
        name="second"
      >
        <printLabelsSuccess />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import printLabelsPending from './print-labels-pending/index.vue'
import printLabelsSuccess from './print-labels-success/index.vue'
@Component({
  name: '',
  components: {
    printLabelsPending,
    printLabelsSuccess
  }
})

export default class extends Vue {
  private activeName:string ='first'

  private handleClick(tab: string) {
  }
}
</script>

<style lang="scss" scoped>
 .shipping-management {
   padding: 10px 20px;
 }
</style>
