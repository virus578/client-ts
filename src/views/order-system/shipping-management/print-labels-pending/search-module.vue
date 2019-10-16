<template>
  <div class="print-pendding-search-module">
    <el-col
      :span="24"
      class="search-card"
    >
      <el-select
        v-model="search.purchase_type"
        size="mini"
        placeholder="请选择"
        name="balance-list"
      >
        <el-option
          v-for="item in optionSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="search.purchase_value"
        class="order-input"
        placeholder="请输入单号"
        size="mini"
        clearable
      />
      <el-button
        size="mini"
        type="primary"
        @click.native="$emit('Search')"
      >
        查询
      </el-button>
    </el-col>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'searchModule'
})
export default class extends Vue {
  @Prop({ default: [] }) private optionSelect !: Array<{value: string, label: string}>
  @Prop({ default: {} }) private search !: any
  /**
  *eg:  @Prop({defalt: ''}) private xxx!:type
  *data
  */

  /**
  *eg: pravite xxx:Array<number> = []
  *data
  */

  /**
  *eg: get sidebar() {return AppModule.sidebar}
  *computed
  */
  /**
  *eg: @Watch('filterText')
  *private onFilterTextChange(value: string) {
  *  (this.refs.tree2 as ElTree).filter(value)
  *}
  *watch
  */

  /**
  *eg: mounted() {}
  *lifecycle
  */

  /**
  *eg: private xxx() {}
  *methods
  */
}
</script>

<style lang="scss" scoped>
  .print-pendding-search-module {
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .search-card {
      padding: 0.15rem;
      border: 1px solid #DEE2E6;
    }
    .balance-list {
      width: 9%;
    }
    .order-input {
      width: 10%;
      margin: 0 0.2rem;
    }
  }
</style>
