<template>
    <el-radio-group v-model="radio">
        <el-radio :label="true">展示</el-radio>
        <el-radio :label="false">隐藏</el-radio>
    </el-radio-group>
</template>
<script>
export default {
    data() {
        return {
            radio: null
        }
    },
    computed: {},
    watch: {
        radio() {
            this.$emit('on-change', this.radio);
        }
    },
    methods: {}
}
</script>