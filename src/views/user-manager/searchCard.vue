<template>
  <div class="user-manager">
    <search-card
      :search-data="searchData"
      @search="init"
      @restore="restore"
      @clear="clear"
    >
      <status-buttom
        title="状态："
        class="mb-ms"
        :operation="operation"
        @change="init"
      />
      <el-select
        v-model="searchData.selectType"
        style="width:120px"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="(item,_ind) in selectArr"
          :key="_ind"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <order-input
        v-model="searchData.inputText"
        class="ml-ms"
        style="width:200px;vertical-align: bottom;z-index:999"
        placeholder="可批量搜索，Shift+回车换行..."
      />
    </search-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import statusButtom from '@/components/statusBottom.vue'
import searchCard from '@/components/searchCard.vue'
import orderInput from '@/components/order-input.vue'
import { searchData, bottomType, labelArr } from './user-manager'
@Component({
  name: 'search',
  components: {
    statusButtom,
    orderInput,
    searchCard
  }
})
export default class extends Vue {
  @Prop({ default: () => {} }) private search!: object
  @Prop() private operation!:Array<bottomType>
  @Prop() private searchData!:searchData
  private selectArr:Array<labelArr>=[
    { label: '用户名', value: 'usernames' },
    { label: '邮箱', value: 'emails' }
  ]
  private init() {
    this.$emit('search')
  }
  private restore() {
    this.$emit('restore')
  }
  private clear() {
    this.$emit('clear')
  }
  @Watch('operation')
  private watchoperation(val:Array<bottomType>) {
    const find = val.findIndex(row => row.click === true)
    this.searchData.status = find
  }
}
</script>

<style lang='scss'>
  .user-manager{
    font-size: 13px;
  }
  .fenye{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
