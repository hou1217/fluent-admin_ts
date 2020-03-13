<template>
  <div class="tpulse-button-bar">
    <el-button
      v-for="(button, buttonIndex) in buttons"
      :key="buttonIndex"
      :type="getType(button)"
      :disabled="button.disabled"
      @click.stop="onButtonClick(button)"
    >{{button.label}}</el-button>
    <slot name="message"></slot>
  </div>
</template>
<script>
export default {
  name: "TpulseButtonBar",
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  methods: {
    onButtonClick(button) {
      if (button.tips) {
        this.$confirm(button.tips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          button.action();  
        }).catch(() => {})
      } else {
        button.action();
      }
    },
    getType(button) {
      if (
        Object.keys(button).includes("options") &&
        Object.keys(button.options).includes("primary") &&
        !button.options.primary
      ) {
        return 'default';
      }
      return 'primary';
    }
  }
};
</script>
<style lang="stylus" scoped>
.tpulse-button-bar {
    margin-top: 10px;
}
</style>