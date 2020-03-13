<template>
  <el-breadcrumb class="tpulse-breadcrumb">
    <el-breadcrumb-item v-for="breadcrumb in data" :key="breadcrumb.name">
      <span
        :class="{
        'fake-link': breadcrumb.action
      }"
        @click.stop="onCrumbsClick(breadcrumb)"
      >{{breadcrumb.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'TpulseBreadcrumbs',
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    console.debug("tpulseBreadcrumbs created");
  },
  methods: {
    onCrumbsClick(breadcrumb) {
      if (breadcrumb.action) {
        breadcrumb.action();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.tpulse-breadcrumb {
  margin-bottom: 20px;
}

.fake-link {
  color: #3b8ee7;
  cursor: pointer;
}
</style>