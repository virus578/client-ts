<template>
  <div class="inline-block">
    <span
      class="select-printer"
    >打印机：</span>
    <el-select
      v-model="value"
      placeholder="请选择"
      size="mini"
    >
      <el-option
        v-for="item in printerList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang='ts'>
import axios from 'axios'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

interface printer {
    key: string,
    value: string,
    label: string
}

@Component({
  name: ''
})

export default class extends Vue {
  @Prop() protected value!:string

  private printerList:Array<printer>=[]

  private printer:string=''

  mounted() {
    this.printer = this.value
    axios.get('http://127.0.0.1:10093/getPrintList').then(({ data }) => {
      this.printerList = data.pintList.map((row:any) => {
        return {
          label: row,
          key: `http://127.0.0.1:10093/${row}`,
          value: JSON.stringify({ url: 'http://127.0.0.1:10093', name: row })
        }
      })
      this.printerList.length > 0 && (this.printer = this.printerList[0].value)
    }).catch(code => {
    })
  }

  @Watch('printer')
  private onPrinterChange(value: string) {
    this.$emit('input', value)
  }

  @Watch('value')
  private onValueChange(val: string) {
    this.printer = val
  }
}
</script>

<style lang="">

</style>
