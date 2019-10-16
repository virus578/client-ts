<template>
  <div class="company">
    <div class="row">
      <div>供应商名称：</div>
      <label>{{ company_info.supplier_name }}</label>
    </div>
    <div class="row">
      <div>统一社会信用代码：</div>
      <label>
        {{ company_info.business_code }}</label>
    </div>
    <div class="row">
      <div>营业执照名称：</div>
      <label>{{ company_info.business_license }}</label>
    </div>
    <div class="row">
      <div>QQ号：</div>
      <label>{{ company_info.qq }}</label>
    </div>
    <div class="row">
      <div>省/市/区：</div>
      <label>{{ company_info.province }}/{{ company_info.city }}/{{ company_info.area }}</label>
    </div>
    <div class="row">
      <div>详细地址：</div>
      <label>{{ company_info.address }}</label>
    </div>
    <div class="row">
      <div>网店名称：</div>
      <label>{{ company_info.online_shop_name }}</label>
    </div>
    <div class="row">
      <div>店铺网址：</div>
      <label>{{ company_info.link }}</label>
    </div>
    <div class="row">
      <div>联系人：</div>
      <label>{{ company_info.contact }}</label>
    </div>
    <div class="row">
      <div>职务：</div>
      <label>{{ company_info.contact_job }}</label>
    </div>
    <div class="row">
      <div>联系方式：</div>
      <label>{{ company_info.mobile }}</label>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({
  name: 'company'
})
export default class extends Vue {
  @Prop({}) private company_info!: object
}
</script>

<style lang="scss" scoped>
  .company{
    font-size: 13px;
    height: 100vh;
    .row{
      line-height: 30px;
      clear: both;
      div{
        text-align: right;
        float: left;
        min-width: 200px;
        font-weight: bolder;
      }
    }
  }
</style>
