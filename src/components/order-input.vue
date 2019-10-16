<template>
  <div class="p-order-input">
    <div
      v-if="isInput"
      :class="['tab-div',show?'visable-no':'visable-yes']"
      :title="textarea"
      tabindex="0"
      @focus="focus"
    >
      <span
v-if="!textarea"
            class="light-gray-order"
>{{ placeholder }}</span>
      {{ textarea }}
    </div>
    <el-input
      v-if="isInput"
      ref="textarea"
      v-model="textarea"
      :autosize="{minRows: 5, maxRows: 10}"
      :class="['textarea',show?'visable-yes':'visable-no']"
      :placeholder="placeholder"
      type="textarea"
      @blur="blur"
      @keydown.native="key_down_event"
    />
  </div>
</template>
<style lang="scss">
    .p-order-input {
        height: 26px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        .tab-div {
            width: 100%;
            height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            outline: none;
            padding: 5px;
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px solid #C0CCDA;
        }
        .textarea {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0
        }
        .visable-no {
            visibility: hidden;
            z-index: -1;
        }
        .visable-yes {
            z-index: 5;
            visibility: visible;
        }
        .light-gray-order {
            color: #8492a6;
        }
        > div {
            line-height: 1;
        }
        .width-full {
            width: 100%;
            [type="textarea"] {
                resize: none;
                height: 105px;
            }
        }
    }
</style>
<script>
export default {
  name: 'OrderInput',
  components: {
  },
  props: {
    value: {},
    placeholder: {
      default() {
        return ''
      }
    },
    maxLargestNumber: {
      default() {
        return 500
      }
    },
    isInput: {
      default() {
        return true
      }
    }
  },
  data() {
    return {
      show: false,
      textarea: this.value
    }
  },
  watch: {
    value(val) {
      // let curString = val.trim();
      // if (curString.length>0) {
      //      let cut=curString.replace(/\s/g,'\n').split('\n').map(row=>row.trim()).filter(row => row !== '');
      //      if(cut.length>this.maxLargestNumber){
      //          this.$nextTick(()=>{
      //              this.textarea='';
      //          });
      //          this.$refs.textarea.$refs.textarea.blur();
      //          return this.$message({type:'warning',message:'批量搜索只支持'+this.maxLargestNumber+'条数据'});
      //      }
      // }else{
      this.textarea = val
      //  }
    },
    textarea(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    focus() {
      this.show = true
      this.$nextTick(() => {
        this.$refs.textarea.$refs.textarea.select()
      })
    },
    blur(e) {
      this.$emit('input', e.target.value)
      this.show = false
    },
    key_down_event(e) {
      if (e.shiftKey && !e.altKey && !e.ctrlKey && e.keyCode === 13) { // shift+enter按下
        e.preventDefault()
        const start = e.target.selectionStart
        const end = e.target.selectionEnd
        if (start === end) { // 如果相等，就是未选择内容
          // 先替换e.target.value里面的内容并设置光标的位置，在blue()中再对this.textarea文本进行赋值
          e.target.value = e.target.value.slice(0, start) + '\n' + e.target.value.slice(end)
          e.target.selectionStart = end + 1
          e.target.selectionEnd = end + 1
        } else { // 否则就是选择了内容
          // 先替换e.target.value里面的内容并设置光标的位置，在blue()中再对this.textarea文本进行赋值
          e.target.value = e.target.value.replace(e.target.value.slice(start, end), '\n')
          e.target.selectionStart = start + 1
          e.target.selectionEnd = start + 1
        }
      }
      if (!e.shiftKey && !e.altKey && !e.ctrlKey && e.keyCode === 13) { // enter按下
        e.preventDefault()
        this.blur(e)
        this.$emit('input', e.target.value)
        this.$emit('keydown')
      }
    }
  }
}
</script>
