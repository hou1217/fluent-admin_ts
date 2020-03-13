<template>
    <div class="option">
        <!-- <div>
            <el-radio-group v-model="radio">
                <el-radio :label="true">展示</el-radio>
                <el-radio :label="false">隐藏</el-radio>
            </el-radio-group>
        </div> -->
        <div>
            <label>参数1：</label><el-input v-model="input" style="width: 200px;"></el-input>
        </div>
    </div>
</template>
<script>
export default {
    props: ['initValue'],
    data() {
        return {
            radio: null,
            input: ''
        }
    },
    computed: {
        // output() {
        //     const {radio, input} = this;
        //     return {
        //         show: radio,
        //         option: {
        //             text: input
        //         }
        //     };
        // }
    },
    watch: {
        // initValue: {
        //     handler() {
        //         console.log('[FormItemOption.vue]: watch-initValue');
        //         console.log(this.initValue);
        //     },
        //     immediate: true,
        //     deep: true
        // },
        // radio() {
        //     if (!this.radio) {this.input = ''}
        //     this.$emit('on-change', this.output);
        // },
        input() {
            this.$emit('on-change', this.input);
        }
    },
    destroyed() {
        console.log('[FormItemOption]: destroyed');
        this.$emit('on-change', null);
    }
}
</script>