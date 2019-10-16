<template>
  <el-dialog :visible.sync="visible" title="打印预览">
    <el-row class="select-printer">
      <select-printer v-model="printer" class="inline fr width-lg" />
    </el-row>
    <div class="relative">
      <el-table
        ref="table"
        v-loading="loading"
        :data="batchData"
        class="scroll-bar mt-sm"
        max-height="580"
        border
        highlight-current-row
      >
        <el-table-column label="标签">
          <template slot-scope="scope">
            <iframe
              frameborder="0"
              :style="{height: `100px`}"
              :srcdoc="htmlList[scope.$index]"
              name="image"
            />
          </template>
        </el-table-column>
        <el-table-column min-width="60" label="数量">
          <template slot-scope="scope">
            <el-input-number
              v-model.number="scope.row.print_num"
              :min="1"
              disabled
              :controls="false"
              :step="1"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button type="primary" size="mini" @click.native="print_sure">打印</el-button>
      <el-button size="mini" @click.native="visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import { getLabelTemplate } from "@/api/print-label";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { print } from "./preview-print";
import selectPrinter from "./select-printer.vue";

interface printer {
  key: string;
  value: string;
  label: string;
}

interface print {
  print_data: Object;
  sub_temp: Array<Object>;
  back_temp: Array<Object>;
  print_num: number;
}

interface params {
  type: string;
  token: string;
  width: string;
  height: string;
  direction: string;
  NumberList: string;
  content: string;
}

@Component({
  name: "preview",
  components: {
    selectPrinter
  }
})
export default class extends Vue {
  @Prop({ default: "" }) private value!: Boolean;
  @Prop() private batchData!: Array<print>;
  @Prop({ default: {} }) private custom!: Object;
  @Prop() private warehouse_id!: any;
  @Prop() private qrCode!: any;

  public template_id: any = "";
  private printer: string = "";
  private visible: Boolean = this.value;
  private loading: Boolean = false;
  private printData: print = {
    print_data: {},
    sub_temp: [],
    back_temp: [],
    print_num: 0
  };
  private templateData: Object = {};
  private htmlList: any = [];
  private printParams: params = {
    type: "html",
    token: "",
    width: "",
    height: "",
    direction: "vertical",
    NumberList: "",
    content: ""
  };

  mounted() {}

  private close() {
    this.printData = {
      print_data: {},
      sub_temp: [],
      back_temp: [],
      print_num: 0
    };
    this.reset_print_params();
  }

  private print_sure() {
    this.$emit(
      "get-print-data",
      () => {
        this.$nextTick(() => {
          this.print();
        });
      },
      0
    );
  }

  private print() {
    if (this.printer === "") {
      this.$message({ type: "error", message: "当前PC未启动打印服务" });
      return false;
    }
    if (!this.batchData.every(o => String(o.print_num).indexOf(".") === -1)) {
      this.$message({
        message: "打印数量不能为小数",
        type: "error"
      });
      return;
    }
    // 引入一个布尔值用来判断是否已经是最后一个打印数据传输
    let flag = false;

    this.htmlList = [];
    this.reset_print_params();

    this.batchData.forEach((row, index) => {
      this.printData = row;
      flag = index === this.batchData.length - 1;
      if (!this.printData.print_num) return false;
      print.call(this, true, flag);
      this.$emit("print-single");
    });
  }

  public async get_template_data() {
    await getLabelTemplate({ warehouse_id: this.warehouse_id }).then(res => {
      this.templateData = res;
       
      this.template_id = (res as any).id;
      this.review_print_data();
    });
  }

  public review_print_data() {
    this.htmlList = [];
    this.reset_print_params();
    this.batchData.forEach(row => {
      this.printData = row;
      print.call(this, false, false);
    });
  }

  public async change_review_print() {
    await this.get_template_data().then(() => {
      this.loading = true;
      this.$emit(
        "get-print-data",
        () => {
          this.$nextTick(() => {
            this.loading = false;
            this.review_print_data();
          });
        },
        1
      );
    });
  }

  private reset_print_params() {
    this.printParams = {
      type: "html",
      token: "",
      width: "",
      height: "",
      direction: "vertical",
      NumberList: "",
      content: ""
    };
  }
  @Watch("visible")
  private onPrinterChange(value: boolean) {
    this.$emit("input", value);
  }

  @Watch("value")
  private onValueChange(val: boolean) {
    this.visible = val;
  }
}
</script>

<style lang="scss" scope>
.select-printer {
  margin-bottom: 10px;
}
.fr {
  float: right;
}
</style>
