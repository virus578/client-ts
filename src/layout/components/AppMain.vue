<template>
  <section class="app-main">
    <router-view />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  padding: 10px 0 0 10px;
  background-color: #F2F4F5;
}
</style>
