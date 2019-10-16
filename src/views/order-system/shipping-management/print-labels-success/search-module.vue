<template>
  <div class="print-success-search-module">
    <el-col
      :span="24"
      class="search-card"
    >
      <label for="">
        <span>结算方式: &nbsp;</span>
        <el-select
          v-model="search.balance_type"
          size="mini"
          placeholder="请选择"
          class="balance-list"
        >
          <el-option
            v-for="item in balance_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </label>
      <el-select
        v-model="search.purchase_type"
        size="mini"
        placeholder="请选择"
        class="purchase-list ml-ms"
      >
        <el-option
          v-for="item in purchase_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <order-input
        v-model="search.purchase_value"
        class="ml-ms"
        style="width:200px;vertical-align: bottom;z-index:999"
        placeholder="可批量搜索，Shift+回车换行..."
      />
      <label style="margin-left: 0.2rem;">
        <span>种类数:</span>
        <el-input
          v-model="search.kind_number_min"
          size="mini"
          type="number"
          class="order-input"
          min="0"
          @change="changePrintNumber"
        />
        <span>~</span>
        <el-input
          v-model="search.kind_number_max"
          size="mini"
          type="number"
          class="order-input"
          min="0"
          @change="changePrintNumber"
        />
      </label>
      <el-button
        size="mini"
        type="primary"
        @click="$emit('Search')"
      >
        查询
      </el-button>
    </el-col>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Isearch } from './print-sucess'
@Component({
  name: 'print-success-search-module',
  components: {
    orderInput: require('@/components/order-input').default
  }
})
export default class extends Vue {
  @Prop({ default: [] }) private balance_list!: Array<object>
  @Prop({ default: [] }) private purchase_list!: Array<object>
  @Prop({ default: {} }) private search!: object
  private changePrintNumber(val: number) {
    // if (String(val).indexOf('.') !== -1 || !String(val).indexOf('.')) {
    //   this.$message({
    //     message: '种类数量不能为小数',
    //     type: 'error'
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.print-success-search-module {
  // overflow: hidden;
  .order-input {
    width:  10%;
    margin: 0 0.1rem;
  }
  .balance-list {
    width: 9%;
  }
  .purchase-list {
    width: 9%;
    margin-left: 0.2rem;
  }
  @media screen and (min-width:1366px) and (max-width:1900px){
.search-card  {
      margin-bottom: 0.2rem
    }
    }

}
</style>
