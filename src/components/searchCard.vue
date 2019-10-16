<template>
  <el-card>
    <slot />
    <el-button
      v-waves
      class="ml-ms"
      type="primary"
      size="mini"
      @click="init"
    >
      搜索
    </el-button>
    <el-button
      v-waves
      :type="!chagne?'info':'primary'"
      size="mini"
      :disabled="!chagne"
      @click="restore"
    >
      还原修改
    </el-button>
    <el-button
      v-waves
      type="warning"
      size="mini"
      @click="clear"
    >
      清空条件
    </el-button>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'searchCard'
})
export default class extends Vue {
  private chagne:Boolean=false
  private init() {
    this.chagne = true
    this.$emit('search')
  }
  private restore() {
    this.chagne = false
    this.$emit('restore')
  }
  private clear() {
    this.$emit('clear')
  }
}
</script>
