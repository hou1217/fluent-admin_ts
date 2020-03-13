<template>
  <page>
    <tpulse-breadcrumbs :data="breadcrumbs"></tpulse-breadcrumbs>
    <div class="click-btn" @click="modalOptions.show = true;">点击出现弹框</div>
    <!-- modal -->
    <modal :options="modalOptions" @close="modalOptions.show=false">
        <h2>弹框里的内容</h2>
        <template v-slot:button>
            <div>
                <!-- <el-button type="primary" @click.stop="backupConfirm">保存</el-button> -->
                <el-button @click.stop="modalOptions.show=false">取消</el-button>
            </div>
        </template>
    </modal>
  </page>
</template>
<script lang="ts">
  import {PageComponent as Page,PageOptions} from '@/modules'
  import {ModalComponent as Modal, ModalOptions} from '@/modules'
  import {TpulseBreadcrumbs, TpulseButtonBar} from '@/modules/common'
  import Vue from 'vue';
  export default Vue.extend({
    components: {
      Page,
      Modal,
      TpulseBreadcrumbs
    },
    data(){
      return{
        breadcrumbs: [
            {
              name: 'modal实例'
            }
        ],
        pageOptions: {},
        modalOptions: new ModalOptions({title: '这里是标题', width: 60}),
      }
    }
  })
</script>
<style scoped>
.click-btn{
  width:100px;
  height:40px;
  line-height: 40px;
  border: 1px solid #ccc;
  text-align: center;
  margin: 100px auto;
}
</style>