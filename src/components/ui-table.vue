<template>
  <div class="o-ui-table">
    <table
      border="1"
      cellspacing="0"
      cellpadding="0"
    >
      <colgroup>
        <col
          v-for="head in heads"
          :key="head.lebel"
          :width="head.width"
        >
      </colgroup>
      <tbody>
        <tr class="table-head">
          <th
            v-for="(head, index) in heads"
            :key="`${head}${index}`"
          >
            {{ head.label }}
          </th>
        </tr>
      </tbody>
    </table>
    <!-- style="border-right: 1px solid #ccc;" -->
    <div
      class="table-cell"
    >
      <table
        border="1"
        cellspacing="0"
        cellpadding="0"
        style="border-top: none;"
        :style="sytles"
      >
        <colgroup>
          <col
            v-for="head in heads"
            :key="head.lebel"
            :width="head.width"
          >
        </colgroup>
        <slot />
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.o-ui-table {
  position: relative;
table {
    border: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    width: 100%;
    color: #333;
    border-collapse:collapse;
    font-size: 14px;
    th {
        padding: 5px 10px;
        background-color: $subMenuHover;
    }
}
.table-cell {
  overflow-x: hidden;
  overflow-y: auto;
  height: 6.7rem;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
.border {
  border-right: 1px solid #ccc
}
}
</style>

<script>
export default {
  name: 'UiTable',
  components: {
  },
  props: {
    heads: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // height: 0
    }
  },
  computed: {
    sytles() {
      // const height =  +window.getComputedStyle(document.getElementsByTagName('table')[1]).height.replace(/px/g, '') : 0
      let height = document.getElementsByTagName('table').length ? +window.getComputedStyle(document.getElementsByTagName('table')[1]).height.replace(/px/g, '') : 0
      console.log(height > 550 ? { width: '100.3%' } : { width: '100%' })
      // return height > 550 ? { width: '100.3%' } : { width: '100%' }
      return { width: '100.4%' }
    }
  },
  methods: {
    head_width(width) {
      // return `${width}px`
    }
  }
}
</script>
