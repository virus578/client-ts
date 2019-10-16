<template>
  <div class="company">
    <div class="row">
      <div class="key">
        交易类型：
      </div>
      <div class="value">
        {{ finance_info.transaction_type }}
      </div>
      <div class="key right">
        支付方式：
      </div>
      <div class="value">
        {{ finance_info.transaction_type_txt }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        对私账户：
      </div>
      <div class="value">
        {{ finance_info.private_bank_account }}
      </div>
      <div class="key right">
        户名：
      </div>
      <div class="value">
        {{ finance_info.private_bank_account_name }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        开户支行：
      </div>
      <div class="value">
        {{ finance_info.private_bank }}
      </div>
      <div class="key right">
        开户行所在市：
      </div>
      <div class="value">
        {{ finance_info.private_bank_city }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        开户身份证号：
      </div>
      <div class="value">
        {{ finance_info.opening_id_card }}
      </div>
      <div class="key right">
        银行留存联系方式：
      </div>
      <div class="value">
        {{ finance_info.bank_retained_contact_way }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        对公账户：
      </div>
      <div class="value">
        {{ finance_info.public_bank_account }}
      </div>
      <div class="key right">
        户名：
      </div>
      <div class="value">
        {{ finance_info.public_bank_account_name }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        开户支行：
      </div>
      <div class="value">
        {{ finance_info.public_bank }}
      </div>
      <div class="key right">
        开户行所在市：
      </div>
      <div class="value">
        {{ finance_info.public_bank_city }}
      </div>
    </div>
    <div class="row">
      <div class="key">
        默认收款账户：
      </div>
      <div class="value">
        {{ finance_info.default_payment_method }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'role'
})
export default class extends Vue {
  @Prop({}) private finance_info!: object
}
</script>

<style scoped lang='scss'>
  .company{
    font-size: 13px;
    height: 100vh;
    .row{
      line-height: 30px;
      overflow: hidden;
      div{
        float: left;
        height: 30px;
      }
      .key{
        text-align: right;
        float: left;
        min-width: 200px;
        font-weight: bolder;
      }
      .right{
        min-width: 0px;
      }
      .value{
        min-width: 300px;
      }
    }
  }
</style>
