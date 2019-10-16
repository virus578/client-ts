<template>
  <div class="usertable">
    <div class="mt-ms mb-ms">
      <el-button
        size="mini"
        type="primary"
        @click="add"
      >
        添加
      </el-button>
      <el-button
        size="mini"
        type="primary"
        :disabled="selectArray.length===0"
        @click="allstope"
      >
        批量停用
      </el-button>
    </div>
    <el-table
      v-loading="tableLoding"
      border
      :data="table"
      style="width: 100%"
      :height="Height"
      element-loading-text="拼命加载中"
      @selection-change="chagneSelect"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
      />
      <el-table-column
        label="ID"
        prop="id"
        width="115"
        align="center"
      />
      <el-table-column
        label="用户名"
        prop="username"
        width="180"
        align="center"
      />
      <el-table-column
        label="邮箱"
        prop="email"
        width="220"
        align="center"
      />
      <el-table-column
        label="用户类型"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.account_type ? '主账号' : '子账号' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#0389FF"
            inactive-color="#ff4949"
            @change="chagneSwitch(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="最近登陆时间"
        align="center"
        width="180"
        prop="last_login_time"
      >
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.last_login_time }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        label="管理操作"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <a
            v-show="!scope.row.account_type"
            class="button"
            @click="modify(scope.row)"
          >编辑</a> -->
          <el-button
            v-show="!scope.row.account_type"
            size="mini"
            type="primary"
            @click="modify(scope.row)"
          >
            编辑
          </el-button>
          <!-- <span v-show="!scope.row.account_type"> | </span> -->
          <!-- <a
            class="button"
            @click="Reset(scope.row)"
          >重置密码</a> -->
          <!-- | -->
          <!-- <a
            class="button"
            @click="log(scope.row)"
          >日志</a> -->
          <el-button
            size="mini"
            type="success"
            @click="log(scope.row)"
          >
            日志
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Reset(scope.row)"
          >
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import searchCard from './searchCard.vue'
import { UserManagerModule } from '@/store/modules/user-managser'
import { LoginModule } from '@/store/modules/login'
import { AppModule } from '@/store/modules/app'
import { userData } from './user-manager'
@Component({
  name: 'tableData'
})
export default class extends Vue {
  @Prop({ default: {} }) table!: Array<userData>
  @Prop() private tableLoding!: boolean
  private selectArray:Array<userData>=[]
  get Height() {
    return 600 * AppModule.Height
  }
  private chagneSwitch(val:userData) {
    val.status = !val.status
    this.$confirm(`您将更改用户${val.username}用户状态为${val.status ? '停用' : '启用'}，确认此操作吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_ => {
      UserManagerModule.changeStatus({ user_ids: [val.user_id], status: val.status ? '0' : '1' }).then((res:any) => {
        val.status = !val.status
        this.$message({
          type: 'success',
          message: '重置密码成功'
        })
        LoginModule.RefreshToken()
      })
    })
  }
  private chagneSelect(arr:Array<userData>) {
    this.selectArray = arr
  }
  private modify(row:userData) {
    this.$emit('modify', row)
  }
  private Reset(row:userData) {
    this.$emit('Reset', row)
  }
  private log(row:userData) {
    this.$emit('log', row)
  }
  private add() {
    this.$emit('add')
  }
  private allstope() {
    this.$emit('allstope', this.selectArray)
  }
  // private gettime(val) {
  //   return (new Date(+new Date(val).getTime() * 1000 + 8 * 3600 * 1000)).toISOString().substr(0, 19).replace(/[a-z]/i, ' ')
  // }
}
</script>

<style lang="scss">
.usertable{
  .el-table td{
    padding: 0px
  }
}

</style>
