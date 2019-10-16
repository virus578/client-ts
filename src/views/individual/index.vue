<template>
  <div class="page-config individual">
    <el-tabs
      v-model="activeName"
      class="role"
    >
      <el-tab-pane
        label="账号信息"
        name="first"
      >
        <account
          :account_info="MessageModule.account_info"
          @open="open"
        />
      </el-tab-pane>
      <el-tab-pane
        label="公司信息"
        name="second"
      >
        <company :company_info="MessageModule.company_info" />
      </el-tab-pane>
      <el-tab-pane
        label="角色管理"
        name="third"
      >
        <role :finance_info="MessageModule.finance_info" />
      </el-tab-pane>
    </el-tabs>
    <mdfpassword v-model="mdfPassword_dialog" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MessageModule } from '@/store/modules/message'
import account from './account.vue'
import company from './company.vue'
import role from './role.vue'
import mdfpassword from './mdfPassword.vue'

import { privateEncrypt } from 'crypto'
import { setTimeout } from 'timers'
@Component({
  components: {
    account,
    company,
    role,
    mdfpassword
  }
})
export default class extends Vue {
  private mdfPassword_dialog:Boolean=false
  private activeName: string = 'first'
  private table_data:object={}
  mounted() {
    MessageModule.GetMessage()
  }
  get MessageModule() {
    return MessageModule
  }
  private open() {
    this.mdfPassword_dialog = true
  }
}
</script>
<style lang="scss">
.individual {
  padding: 0 0.1rem;
}
</style>
