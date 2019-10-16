<template>
  <div class="dashboard-container page-config">
    <p>{{ `${supplier_info.company_name}，欢迎回来！` }}</p>
    <div class="date">
      <img
        src="~@/assets/theme/icon_date.png"
        alt=""
        class="icon-date"
      >
      <span class="data-content">{{ supplier_info.date }}</span>
    </div>
    <!-- <div style="margin: 20px 0 20px 5px;">
      <span>已完成订单(笔)：</span><span>{{ supplier_info.finish_order_all }}</span>
      <div
        class="answer"
        title="从合作日起，已完成订单数量"
      />
    </div>
    <p><span>本月已完成订单(笔)：</span><span>{{ supplier_info.finish_order_month }}</span></p>
    <p><span>今日已完成订单(笔)：</span><span>{{ supplier_info.finish_order_today }}</span></p> -->
    <div class="supplie-data">
      <div class="all-order-complete order-complete">
        <div class="order-complete-cell">
          <div
            class="answer"
            title="从合作日起，已完成订单数量"
          />
          <p class="supplie-data-number data-number">
            <countTo
              :start-val="startVal"
              :end-val="Number(supplier_info.finish_order_all)"
              :duration="duration"
            />
          </p>
          <span>已完成订单(笔)</span>
        </div>
      </div>
      <div class="month-order-complete order-complete">
        <div class="order-complete-cell">
          <p class="complete-data-number data-number">
            <countTo
              :start-val="startVal"
              :end-val="Number(supplier_info.finish_order_month)"
              :duration="duration"
            />
          </p>
          <span>本月已完成订单(笔)</span>
        </div>
      </div>
      <div class="today-order-complete order-complete">
        <div class="order-complete-cell">
          <p class="supplie-data-last-number data-number">
            <countTo
              :start-val="startVal"
              :end-val="Number(supplier_info.finish_order_today)"
              :duration="duration"
            />
          </p>
          <span>今日已完成订单(笔)</span>
        </div>
      </div>
    </div>
    <mdfpassword v-model="is_dialog" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { SupplierInfoModule } from '@/store/modules/dashboard'
import { LoginModule } from '@/store/modules/login'
import mdfpassword from '@/views/individual/mdfPassword.vue'
import countTo from 'vue-count-to'

@Component({
  name: 'Dashboard',
  components: {
    mdfpassword,
    countTo
  }
})
export default class extends Vue {
  private is_dialog:Boolean=false
  private startVal = 0
  private duration = 3000
  get name() {
    return LoginModule.username
  }

  get supplier_info() {
    return SupplierInfoModule.supplier_info
  }
  get dialog() {
    return !!sessionStorage.getItem('modify')
  }
  mounted() {
    SupplierInfoModule.Get_Supplie_Info()
    this.is_dialog = !!+(sessionStorage.getItem('modify') as string)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  background:  url('~@/assets/theme/sy.png') no-repeat center center;
  background-size: cover;
  padding-left: 0.3rem;
  .supplie-data {
    display: flex;
    margin-left: -0.1rem;
    padding-right: 0.25rem;
    .order-complete-cell {
       height: 1.5rem;
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .order-complete {
      flex: 1;
      text-align: center;
      padding: 0 10px;
    }
    // .order-complet:first-of-type {
    //   padding-left: 0;
    // }
    .data-number {
        font-size: 32px;
        font-weight: bolder;
    }
    .supplie-data-number {
    //   font-size: 32px;
    //   font-weight: bolder;
      color: #0389FF;
    }
    .complete-data-number {
    //   font-size: 32px;
    //   font-weight: bolder;
      color: #67C23A;
    }
    .supplie-data-last-number {
    //   font-size: 32px;
    //   font-weight: bolder;
      color: #EB433A
    }
  }
  .all-order-complete {
    position: relative;
    .answer {
      position: absolute;
      right: 0.2rem;
      top: 0.1rem;
    }
  }
  .date {
    padding: 15px 0;
  }
  p {
    padding: 20px 0;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .test {
    width: 1200px;
    height: 200px;
    background-color: black;
  }
  .icon-date {
    // height: 40px;
    width: 30px;
    vertical-align: text-bottom;
  }
  .data-content {
      vertical-align: super;
      margin-left: 18px;
  }
  .answer {
    width: 20px;
    height: 20px;
    background:url('~@/assets/theme/emial.png');
    background-size: contain;
    display: inline-block;
    vertical-align: bottom;
  }
}
</style>
