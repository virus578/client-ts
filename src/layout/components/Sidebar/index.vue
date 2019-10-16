<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#0389FF"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      :default-active="activeMenu"
      mode="vertical"
    >
      <div style="text-align: center">
        <img
          :src="logo"
          :style="{width: sidebar.opened ? '1.4rem' : '0.5rem', paddingTop: sidebar.opened ? '5px': '0'}"
          class="logo"
          alt=""
        >
      </div>
      <sidebar-item
        v-for="(route, index) in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
        :index="index"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'
import Layout from '@/layout/index.vue'
import { constantRoutes } from '@/router'
import { PermissionModule } from '@/store/modules/permission'
import { get } from 'http'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  get logo() {
    return AppModule.sidebar.opened ? require('@/assets/theme/logo_blue.png') : require('@/assets/theme/R.png')
  }
  get sidebar() {
    return AppModule.sidebar
  }

  get routes() {
    return PermissionModule.routes
    // 不使用权限
    // return (this.$router as any).options.routes
  }

  get variables() {
    return variables
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
  .el-menu {
    //   background-color: #fff !important;
    li {
      // background-color: #fff !important;
      color: #2f3f4d;
    }
  }
}
</style>

<style lang="scss" scoped>
.logo {
  height: 0.5rem;
  image-rendering: -webkit-optimize-contrast;
  object-fit: fill;
}
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
