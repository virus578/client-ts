<template>
  <div class="print-labels-success">
    <searchModule
      :search="search"
      :purchase_list="purchase_list"
      :balance_list="balance_list"
      @Search="init"
    />
    <tableModule
      :table="table"
      :table_loading="table_loading"
    />
    <div class="pagination">
      <el-pagination
        :current-page="search.page"
        :page-sizes="[50, 100, 200, 400]"
        :page-size="search.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import searchModule from './search-module.vue'
import tableModule from './table-module.vue'
import { Isearch } from './print-sucess'
import { PrintLabelsSuccessModule } from '@/store/modules/print-labels-success'
import { balance_type } from '@/api/order-system'
@Component({
  name: '',
  components: {
    searchModule,
    tableModule
  }
})
export default class extends Vue {
  public purchase_list: Array<{value: string, label: string}> = [
    {
      value: 'purchase_order',
      label: '采购单号'
    },
    {
      value: 'purchase_plan',
      label: '采购计划'
    }
  ]
  public search:Isearch ={
    balance_type: '',
    purchase_type: 'purchase_order',
    purchase_value: '',
    kind_number_min: '',
    kind_number_max: '',
    page: 1,
    page_size: 50
  }
  public balance_list: Array<object> =[
    {
      value: '选项3',
      label: '全部'
    },
    {
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }
  ]
  public table_loading:boolean = false

  get table() {
    return PrintLabelsSuccessModule._table
  }
  mounted() {
    PrintLabelsSuccessModule.GetBalanceType().then(res => {
      this.balance_list = [ { value: '', label: '全部' }, ...res as any ]
    })
    this.Search()
  }
  private init() {
    this.search.page = 1
    this.Search()
  }
  private Search() {
    // if (+this.search.kind_number_min === 0 && +this.search.kind_number_max === 0) {
    //   this.$message({
    //     message: '种类数不能为0',
    //     type: 'error'
    //   })
    // }
    if (String(this.search.kind_number_min).indexOf('.') !== -1 || !String(this.search.kind_number_min).indexOf('.')) {
      this.$message({
        message: '种类数不能为小数',
        type: 'error'
      })
      return
    }
    if (String(this.search.kind_number_max).indexOf('.') !== -1 || !String(this.search.kind_number_max).indexOf('.')) {
      this.$message({
        message: '种类数不能为小数',
        type: 'error'
      })
      return
    }
    this.table_loading = true
    PrintLabelsSuccessModule.GetSearch(this.search)
    this.table_loading = false
  }
  private handleSizeChange(val:number) {
    this.search.page_size = val
    this.Search()
  }
  private handleCurrentChange(val:number) {
    this.search.page = val
    this.Search()
  }
}
</script>

<style lang="scss" scoped>
  .print-labels-success {
     height: calc(100vh - 140px);
    // position: relative;
    .pagination {
      position: absolute;
      right: 0;
      bottom: 0.2rem;
    }
  }
</style>
