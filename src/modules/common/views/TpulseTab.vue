<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :type="type">
    <el-tab-pane v-for="tab in data" :key="tab.name" :label="tab.label" :name="tab.name"></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "TpulseTab",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      type: String,
      default: ""
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    initTab: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeName: null
    };
  },
  watch: {
    data: {
      handler(val) {
        console.debug("tab data");
        console.debug(val);
        if (val && val[0]) {
          this.activeName = val[0].name;
        }
      },
      deep: true,
      immediate: true
    },
    noMargin: {
      handler(val) {
        console.debug("TpulseTab watch");
        console.debug(val);
        if (val) {
          this.$nextTick(() => {
            document.querySelector(".el-tabs__header").classList.add("nm");
          });
        }
      },
      immediate: true
    },
    initTab: {
      handler() {
        if (this.initTab) {
          this.activeName = this.initTab;
        }
      },
      immediate: true
    }
  },
  methods: {
    handleClick(tab, event) {
      console.debug("handleClick");
      console.debug(this.activeName);
      this.$emit("action", this.activeName);
    }
  }
};
</script>
<style lang="stylus" scoped>
.nm {
  margin: 0;
}
</style>