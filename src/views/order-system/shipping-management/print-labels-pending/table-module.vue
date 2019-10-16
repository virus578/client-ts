<template>
  <div class="print-labels-pending">
    <div
      v-if="table.data.data && table.data.data.length > 0"
      class="print-cell"
    >
      <el-button
        type="primary"
        size="mini"
        :disabled="!multipleTable.length"
        @click="batch_print"
      >
        批量打印
      </el-button>
      <div class="print inline-block">
        <p class="inline-block">
          <span
            href
            style="vertical-align: super;"
            class="point"
            @click="downLoad"
          >下载打印机&nbsp;</span>
        </p>
        <el-popover
          placement="top"
          width="200"
          trigger="click"
          content="点击“下载打印机”，下载并安装“Printer”程序。用于系统识别电脑连接的打印机。"
        >
          <div
            slot="reference"
            class="inline-block print-tip"
          />
        </el-popover>
        <select-printer
          v-model="value"
          class="select-printer"
        />
      </div>
    </div>
    <span
      v-if="Array.isArray(table.data)"
      style="margin-top:15px; display:inline-block"
    >请输入要打印的采购单号/采购计划</span>
    <div
      v-for="item in table.data.data"
      :key="item.id"
      v-loading="table.loading"
      class="table"
      element-loading-text="拼命加载中"
    >
      <div class="table-info">
        <label for>
          <span class="table-info-text">{{ `采购单号：${item.id}` }}</span>
        </label>
        <label for>
          <span class="table-info-text">{{ `采购计划：${item.purchase_plan_id}` }}</span>
        </label>
        <label for>
          <span class="table-info-text">{{ `采购员：${item.purchase_user}` }}</span>
        </label>
        <label for>
          <span class="table-info-text">{{ `供应链专员：${item.supply_chain_specialist}` }}</span>
        </label>
        <label for>
          <span class="table-info-text">{{ `采购单状态：${item.status_text}` }}</span>
        </label>
        <label for>
          <span class="table-info-text">{{ `贴标包装：${item.label_deck_text}` }}</span>
        </label>
      </div>
      <!-- @select="(selection) => select_change(selection,item)" -->
      <el-table
        ref="multipleTable"
        :data="item.detail"
        tooltip-effect="dark"
        style="width: 100%"
        :height="Height"
        border
        @selection-change="(selection) => select_change(selection,item)"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          label="图片"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover"
            >
              <img
                :key="scope.row.thumb"
                :src="scope.row.thumb|filterImage"
                width="200px"
                height="200px"
              >
              <span slot="reference">
                <img
                  v-lazy="scope.row.thumb"
                  height="60px"
                  width="90px"
                  style="border:none"
                >
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="sku"
          width="95"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.sku }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="包装要求"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.label_deck_text }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品尺寸(长/宽/高(cm)"
          width="120"
          align="center"
        >
          <template
            slot-scope="scope"
          >
            {{ `${scope.row.net_length}/${scope.row.net_width}/${scope.row.net_height}` }}
          </template>
        </el-table-column>
        <el-table-column
          label="净重（G）"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.net_weight }}
          </template>
        </el-table-column>
        <el-table-column
          label="采购数量"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.qty }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="打印数量"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.print_number"
              type="number"
              size="mini"
              style="width: 90px"
              :min="1"
              :controls="false"
              :step="1"
              @change="changePrintNumber"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="最新打印时间"
          width="150"
          prop="print_time"
          align="center"
        />
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="print(scope.row)"
            >
              打印
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <preview
      ref="preview"
      v-model="printVisible"
      :qr-code="qr_code"
      :custom="printCustom"
      :batch-data="batchData"
      :warehouse_id="warehouse_id"
      @get-print-data="get_print_data"
      @print-single="reset_time_index"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { getPrintData, getPrintExe } from '@/api/print-label'
import selectPrinter from '../select-printer.vue'
import preview from '../preview.vue'
import { watch } from 'fs'

@Component({
  name: 'tableModule',
  components: {
    selectPrinter,
    preview
  }
})
export default class extends Vue {
  @Prop({ default: [] }) private table!: any;
  @Prop() private warehouse_id!: any;
  private printVisible: boolean = false;
  private printParams: any = {};
  private isOne: any = false;
  private batchData: any = [];
  private timeIndex: any = 0;
  public value: string = '';
  private printCustom: any = {
    start_print_num: (val: any, flag: any): any => {
      if (flag === false) return;
      this.timeIndex++;
      let time = (Number(val) + this.timeIndex).toString();
      let diff = 5 - time.length;
      time = "0".repeat(diff) + time;
      return time;
    }
  };
  private selectData: any = {};
  public multipleTable:Array<any> = [];
  public number: number = 0;
  private is_one:boolean = false
  private row: any = []
  private min: number = 1
  get Height() {
    return 550 * AppModule.Height
  }
  mounted() {}
  private async downLoad() {
    let _res:any = await getPrintExe()
    let api = (process.env.VUE_APP_BASE_API as string).split(':')
    window.open(`https://api.rondaful.com/${_res.url}`)
  }
  private changePrintNumber(val: number) {
    // if (String(val).indexOf('.') || !String(val).indexOf('.')) {
    //   this.$message({
    //     message: '打印数量不能为小数',
    //     type: 'error'
    //   })
    // }
  }
  private batch_print() {
    if (!this.value) {
      this.$message({ type: "error", message: "当前PC未启动打印服务" });
      return;
    }
    let data = this.multipleTable.map(row => {
      return {
        sku_id: row.sku_id,
        order_id: row.purchase_order_id,
        print_num: row.print_number,
        order_detail_id: row.id
      };
    });
    this.printParams = {
      data: JSON.stringify(data),
      label_id: (this.$refs.preview as any).template_id
    };
    this.isOne = true;
    this.printVisible = true;
    (this.$refs.preview as any).change_review_print();
  }

  private print(row: any) {
    if (!this.value) {
      this.$message({ type: 'error', message: '当前PC未启动打印服务' })
      return
    }
    let data = [
      {
        sku_id: row.sku_id,
        order_id: row.purchase_order_id,
        print_num: row.print_number,
        order_detail_id: row.id
      }
    ];
    this.printParams = {
      data: JSON.stringify(data),
      label_id: (this.$refs.preview as any).template_id
    };
    this.row = row;
    this.isOne = false;
    this.printVisible = true;
    (this.$refs.preview as any).change_review_print();
  }

  private async get_print_data(callback: any, preview: any) {
    let params = Object.assign({}, this.printParams, { preview: preview });
    await getPrintData(params).then((res: any) => {
      if (this.isOne) {
        if (
          !this.multipleTable.every(
            o => String(o.print_number).indexOf(".") === -1
          )
        ) {
          this.$message({
            message: "打印数量不能为小数",
            type: "error"
          });
          return;
        }
        this.batchData = res.map((v: any, i: number) => {
          v.print_num = this.multipleTable[i].print_number;
          return {
            ...v
          };
        });
      } else {
        if (!(String(this.row.print_number).indexOf(".") === -1)) {
          this.$message({
            message: "打印数量不能为小数",
            type: "error"
          });
          return;
        }
        this.batchData = res;
        this.batchData[0].print_num = this.row.print_number;
      }
      callback();
    });
  }
  /**
   * 重置时间戳计数器
   */
  private reset_time_index() {
    this.timeIndex = 0
  }
  /**
   * 勾选数据缓存
   */
  private select_change(selection: any, item: any) {
    this.selectData[item.id] = selection.map((row: any) => row.sku_id)
    this.multipleTable = selection
  }
  /**
   *  转换新的二维码值
   */
  private qr_code(label: any) {
    if(label.length !== 16) return label
    let value = label.slice(7);
    value = this.string10to62(value);
    return label.slice(0, 7) + value;
  }
  /** 
   *  二进制转换
  */
  private string10to62(number: any) {
    let chars = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ".split(
      ""
    );
    let radix = chars.length;
    let qutient = +number;
    let arr = [];
    let mod;
    do {
      mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join("");
  }
  @Watch('warehouse_id')
  private onWarehouse_idChange(val: any) {
    this.$nextTick(() => {
      (this.$refs.preview as any).get_template_data()
    })
  }
}
</script>

<style lang="scss" scoped>
// .print-labels-pending {
//   height: calc(100vh - 290px);
//   // overflow-y: scroll;
// }
.print-cell {
  padding: 0.15rem 0;
  position: relative;
  .print {
    position: absolute;
    right: 0.15rem;
    top: 0.15rem;
  }
  .select-print {
    margin-left: 0.4rem;
  }
}
.print-tip {
  background: url("~@/assets/send-manager/print-tip.png");
  background-size: cover;
  width: 0.25rem;
  height: 0.25rem;
}
.select-printer {
  vertical-align: super;
  margin-left: 0.2rem;
}
.table {
  // margin-bottom: 0.1rem;
  .table-info {
    padding: 0.1rem 0;
  }
  .table-info-text {
    font-weight: bold;
    padding-left: 0.2rem;
  }
}
</style>
