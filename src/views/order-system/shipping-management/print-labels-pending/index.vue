<template>
  <div class="management">
    <searchModule
      :search="search"
      :option-select="optionSelect"
      @Search="Search"
    />
    <tableModule
      :table="table"
      :warehouse_id="warehouse_id"
      @Print="Print"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { PrintLabelsPendingModule } from '@/store/modules/print-labels-pending'
import searchModule from './search-module.vue'
import tableModule from './table-module.vue'
import { publicEncrypt } from 'crypto'
import selectPrinter from '../select-printer.vue'
import preview from '../preview.vue'

@Component({
  name: '',
  components: {
    searchModule,
    tableModule,
    selectPrinter,
    preview
  }
})
export default class extends Vue {
  private warehouse_id:any= ''

  public options: Array<{value: string, label: string}> = [
    {
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }]
  public optionSelect: Array<{value: string, label: string}> = [
    {
      value: 'purchase_order',
      label: '采购单号'
    },
    {
      value: 'purchase_plan',
      label: '采购计划'
    }
  ]
  mounted() {
    // this.Search()
  }
  public table:any = {
    data: [],
    loading: false
  }
  public search: { purchase_type: string, purchase_value: string } = {
    purchase_type: 'purchase_order',
    purchase_value: ''
  }
  private async Search() {
    if (!this.search.purchase_value.trim().length) {
      this.$message({
        message: '请打印需要贴标的未完结采购单的SKU标签',
        type: 'warning'
      })
      return
    }
    this.table.loading = true
    this.table.data = await PrintLabelsPendingModule.GetSearchPedding(this.search)
    this.table.loading = false
    this.table.data.data.length > 0 && (this.warehouse_id = this.table.data.data[0].warehouse_id)
  }
  private Print() {
  }
}
</script>

<style lang="scss" scoped>
  .shipping-management{
    .print-cell {
      padding: 0.15rem 0;
      position: relative;
      .print {
        position: absolute;
        right: 0.15rem;
        top: 0.15rem;
      }
      .select-print{
        margin-left: 0.4rem;
      }
    }
    .print-tip {
      background: url('~@/assets/send-manager/print-tip.png');
      background-size: cover;
      width: 0.25rem;
      height: 0.25rem;
      vertical-align: text-top;
    }
    .print-download {
      display: inline-block;
       vertical-align: bottom;
    }
     @media screen and (min-width:1366px) and (max-width:1900px){
.print-download  {
      vertical-align: bottom;
    }
    }
    @media screen and (min-width:1920px){
.print-tip  {
      vertical-align: sub;
    }
    }
    .select-printer {
      vertical-align: super;
      margin-left: 0.2rem;
    }
  }
</style>
