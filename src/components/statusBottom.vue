<template>
  <div>
    <label>{{ title||'title' }}</label>
    <el-button
      v-waves
      v-for="(item,_index) in operation"
      :key="_index"
      size="mini"
      :type="item.click?'primary':''"
    @click="clickButtom(_index)">
      {{ item.label }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Prop,Component } from 'vue-property-decorator'
interface bottomType{
  label:string,
  click:Boolean
}
@Component({
  name:"statusBottom"
})
export default class extends Vue {
  @Prop({}) private title!:string
  @Prop({}) private operation!:Array<bottomType>
  private clickButtom(ind:number) {
    this.operation.forEach((row:bottomType) => {
      row.click = false
    })
    const changValue=this.prop(this.operation,<never>ind)
    changValue.click = true
    this.operation.splice(ind, 1 , changValue);
    this.$emit("change")
  }
  private prop<T, K extends keyof T>(obj: T, key: K){
    return obj[key]
  }
}
</script>
