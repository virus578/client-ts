<template>
  <div
    :style="styles"
    class="o-ui-tip ellipsis"
  >
    <slot />
    <a
      v-if="isLink"
      :href="url"
      :title="urlContent"
      target="_blank"
      class="link center ellipsis"
    >{{ urlContent }}</a>
    <span
      v-else
      :title="date"
      class="center ellipsis"
    >{{ date }}</span>
  </div>
</template>

<style>
.o-ui-tip {
    text-align: center;
}
</style>

<script>
export default {
  name: 'UiTip',
  components: {
  },
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      required: true
    },
    isDate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    styles() {
      return { width: `${this.width}px` }
    },
    date() {
      return this.isDate ? new Date(this.content).toLocaleString('chinese', { hour12: false }) : this.content ? this.content : '--'
    },
    urlContent() {
      return this.content ? this.content : '--'
    }
  },
  methods: {}
}
</script>
