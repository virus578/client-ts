<template>
  <div class="user-manager page-config">
    <search-card
      :operation="operation"
      @search="init"
      @restore="restore"
      @clear="clear"
      :searchData="searchData"
      :chagneDate="chagneDate"
    />
    <table-data
      :table="table"
      :tableLoding="tableLoding"
      @modify="modify"
      @Reset="Reset"
      @log="log"
      @add="add"
      @allstope="allstope"
    />
    <modify v-model="modifyDialog" @save="save" :ruleForm="ruleForm" @close="close" />
    <log v-model="logdialog" :title="logTitle" :table="logtable"/>
    <add v-model="addlogin" @init="init" />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[50,100, 200, 300, 400]"
      :page-size="page_size"
      class="fenye"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserManagerModule } from '@/store/modules/user-managser'
import { LoginModule } from '@/store/modules/login'
import { userData, logtable, bottomType, searchData, rule } from './user-manager'
import searchCard from './searchCard.vue'
import tableData from './tableData.vue'
import modify from './modify.vue'
import log from './log.vue'
import add from './add.vue'

@Component({
  name: 'user-manager',
  components: {
    searchCard,
    tableData,
    modify,
    log,
    add
  }
})
export default class extends Vue {
  private operation:Array<bottomType>=[
     { label: '全部', click: true, value: '' },
     { label: '启用', click: false, value: '1' },
     { label: '停用', click: false, value: '0' }
   ]
  private searchData:searchData={
    status: 0,
    selectType: 'usernames',
    inputText: ''
  }
  private chagneDate:searchData={
    status: 0,
    selectType: 'usernames',
    inputText: ''
  }
  private modifyDialog:Boolean=false
  private logdialog:Boolean=false
  private addlogin:Boolean=false
  private title:string=''
  private page:number=1
  private page_size:number=50
  private table: Array<userData> = []
  private logtable:Array<logtable>=[]
  private logTitle: string = ''
  private count:number=0
  private ruleForm:rule={
    username:'',
    email:'',
    user_id:0
  }
  private tableLoding = false
  private mounted() {
    this.init()
  }
  private async init() {
    this.tableLoding = true
    this.chagneDate = JSON.parse(JSON.stringify(this.searchData))
    let search = JSON.parse(JSON.stringify(this.searchData))
    search.inputText = search.inputText.replace(new RegExp(' ', 'gm'), '\n')
    search.inputText = JSON.stringify(search.inputText.split('\n').filter((row:any) => !!row))
    search[search.selectType] = search.inputText
    const find = this.operation.find((row:any) => row.click)
    search.status = (<bottomType>find).value
    search.page = this.page
    search.page_size = this.page_size
    delete search.inputText
    delete search.selectType
    await UserManagerModule.GETTABLE(search)
    this.count = UserManagerModule.count
    this.table = UserManagerModule.data.map((row:any) => {
       return {
        id: row.id,
        user_id: row.user_id,
        username: row.username,
        supplier_id: row.supplier_id,
        email: row.email,
        status: row.status === 1,
        supplier_name: row.supplier_name,
        last_login_time: row.last_login_time,
        status_text: row.status_text,
        account_type: row.account_type
      }
    })
    this.tableLoding = false
  }
  private handleSizeChange(val:number) {
    this.page_size = val
    this.init()
  }
  private handleCurrentChange(val:number){
    this.page = val
    this.init()
  }
  private restore() {
    this.searchData = JSON.parse(JSON.stringify(this.chagneDate))
  }
  private clear() {
    this.searchData = {
      status: 0,
      selectType: 'usernames',
      inputText: ''
    }
  }
  private modify(row:userData) {
    this.ruleForm={
      user_id:row.user_id,
      username:row.username,
      email:row.email
    }
    this.modifyDialog = true;
  }
  private Reset(row:userData) {
      console.log(row)
    this.$confirm(`确认给用户${row.username}的邮箱发送新密码邮件？`,`提示`,{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_ =>{
      UserManagerModule.updatapassworld({user_id:row.user_id}).then((res:any)=>{
        this.$message({type:"success",message:`${res.message}`})
      })
    }).catch(_=>{
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  }
  private async log(row:userData) {
    await UserManagerModule.showlog({user_id:row.user_id})
    this.logtable = UserManagerModule.log
    this.logTitle=`用户：${row.username} 操作日志`
    this.logdialog=true
  }
  private save() {
    UserManagerModule.changeMessage(this.ruleForm).then((res:any)=>{
        this.$message({type:'success',message:'修改用户信息成功'})
        this.modifyDialog = false
        LoginModule.RefreshToken()
        this.init()
    })
  }
  private close() {
    this.ruleForm = {
      username: '',
      email: '',
      user_id:0
    }
  }
  private add() {
    this.addlogin = true
  }
  private allstope(arr:Array<userData>) {
    if (arr.find(e => e.status_text === '禁用')) {
      this.$message({ type: 'error', message: '存在禁用用户,请重新选择' })
      return
    }
    const quaryArr = arr.map((row:userData) => row.user_id)
    this.$confirm('您将批量变更用户状态为“停用”，确认此操作吗？','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_=>{
      UserManagerModule.changeStatus({user_ids:quaryArr,status:'0'}).then((res:any)=>{
        this.$message({
            type: 'success',
            message: res.message
          })
          LoginModule.RefreshToken()
          let table = JSON.parse(JSON.stringify(this.table))
          quaryArr.forEach((el:number)=>{
            let find = table.find((row:userData)=>row.user_id===el)
            find.status = false
          })
          this.table=table
      })
    }).catch(_=>{
       this.$message({
            type: 'info',
            message: '已取消'
          })
    })
  }
}
</script>

<style lang='scss'>
.user-manager{
  font-size: 16px;
  .el-card {
    overflow: inherit;
  }
}

</style>
