<template>
  <div
    v-loading="table_loading"
    class="table-module"
    element-loading-text="拼命加载中"
  >
    <ui-table
      :heads="heads"
    >
      <tbody>
        <template v-for="(item, number) in table.data">
          <tr
            :key="`sss${item}${number}`"
          >
            <td>
              <div class="expond">
                <div
                  class="icon expond-icon"
                  :class="{top: !item.is_expand, bottom: item.is_expand}"
                  @click="expand(number)"
                />
                <p class="center">
                  {{ item.id }}
                </p>
              </div>
            </td>
            <td>
              <p class="center">
                {{ item.purchase_plan_id }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.balance_type_text }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.label_deck_text }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.kind_number }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.purchase_user }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.supply_chain_specialist }}
              </p>
            </td>
            <td>
              <p class="center">
                {{ item.create_time }}
              </p>
            </td>
          </tr><tr
            v-if="item.is_expand"
            :key="`load${number}`"
            style="border-bottom: none;border-left: none;"
          >
            <td
              colspan="9"
              class="offset"
            >
              <!-- <ui-table
                :heads="heads_detail"
                class="load-table"
              > -->
              <colgroup>
                <col
                  v-for="head in heads_detail"
                  :key="head.lebel"
                  :width="head.width"
                >
              </colgroup>
              <tr>
                <!-- :width="`${v.width}`" -->
                <th
                  v-for="(v,i) in heads_detail"
                  :key="v.label"
                  style=""
                >
                  {{ v.label }}
                </th>
              </tr>
              <tr
                v-for="(p,i) in item.detail"
                :key="`load${i}${number}`"
                style="border-bottom: 1px solid #ccc;border-top: 1px solid #CCC;"
              >
                <td class="center">
                  <el-popover
                    placement="right"
                    trigger="hover"
                  >
                    <img
                      :key="p.thumb"
                      :src="p.thumb | filterImage"
                      width="200px"
                      height="200px"
                    >
                    <span slot="reference">
                      <img
                        v-lazy="p.thumb"
                        height="60px"
                        width="90px"
                        style="border:none"
                      >
                    </span>
                  </el-popover>
                  <!-- <img
                    :src="p.thumb"
                    alt=""
                  > -->
                </td>
                <td class="center">
                  {{ p.sku }}
                </td>
                <td class="center">
                  <!-- <ui-tip
                    :content="p.name"
                    :width="300"
                  /> -->

                  <span>{{ p.name }}</span>
                </td>
                <td class="center">
                  {{ item.packing_required_text }}
                </td>
                <td class="center">
                  {{ `${p.net_length}/${p.net_width}/${p.net_height}` }}
                </td>
                <td class="center">
                  {{ `${p.length}/${p.width}/${p.height}` }}
                </td>
                <td class="center">
                  {{ p.net_weight }}
                </td>
                <td class="center">
                  {{ p.weight }}
                </td>
                <td class="center">
                  {{ p.qty }}
                </td>
              </tr>
              <!-- </ui-table> -->
            </td>
          </tr>
        </template>
      </tbody>
    </ui-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import uiTable from '@/components/ui-table.vue'
import uiTip from '@/components/ui-tip.vue'
import { IPrintLabelsSuccess, PrintLabelsSuccessModule } from '@/store/modules/print-labels-success'
@Component({
  name: '',
  components: {
    uiTable,
    uiTip
  }
})
export default class extends Vue {
  @Prop({}) private table !: IPrintLabelsSuccess
  @Prop({}) private table_loading !: boolean
  public heads: Array<{label: string, width: number}> = [
    { label: '采购单号', width: 100 },
    { label: '采购计划', width: 100 },
    { label: '结算方式', width: 100 },
    { label: '贴标包装', width: 100 },
    { label: '种类数', width: 100 },
    { label: '采购员', width: 100 },
    { label: '供应链专员', width: 100 },
    { label: '创建日期', width: 100 }
  ]
  public heads_detail: Array<{label: string, width: number}> = [
    { label: '图片', width: 160 },
    { label: 'SKU', width: 100 },
    { label: '商品名称', width: 550 },
    { label: '包装要求', width: 150 },
    { label: '商品尺寸(长/宽/高(cm)', width: 200 },
    { label: '包装尺寸(长/宽/高(cm)', width: 200 },
    { label: '净重（G）', width: 150 },
    { label: '毛重（G）', width: 150 },
    { label: '采购数量', width: 150 }
  ]
  private expand(index: number) {
    PrintLabelsSuccessModule.Expand(index)
  }
}
</script>

<style lang="scss" scoped>
  .table-module {
    // margin-top: 0.15rem;
    padding: 0.4rem 0 0 0;
    .expond {
      position: relative;
      .expond-icon {
        position: absolute;
        top: 5px;
        left: 0.1rem;
      }
    }
  }
</style>
