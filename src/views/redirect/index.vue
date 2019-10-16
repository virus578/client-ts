<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Redirect'
})
export default class extends Vue {
  created() {
    const { params, query } = this.$route
    const { path } = params
    // 刷新
    this.$router.replace({ path: '/' + path, query })
  }

  render() {
    // Avoid warning for missing template
  }
}
</script>
