<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { SetRem, proportion } from '@/utils/rem'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'App'
})
export default class extends Vue {
  mounted() {
    // GetRem()
    window.onload = () => {
      SetRem(1920, 100)
      // AppModule.SET_WIDTH(proportion('w'))
      AppModule.SET_HEIGHT(proportion('h'))
    }
    window.onresize = () => {
      SetRem(1920, 100)
      //   AppModule.SET_WIDTH(proportion('w'))
      AppModule.SET_HEIGHT(proportion('h'))
    }
  }
}
</script>
<style lang="scss">
 #app {
   font-size: 16px;
   color: $titleColor
 }
</style>
