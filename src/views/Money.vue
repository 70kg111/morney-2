<template>
    <Layout contentClass="content-wrapper">

        <Tags/>

        <div class="notes">
            <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
        </div>

        <Types :value.sync="record.type"/>

        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import store from '@/store/index2';

  window.localStorage.setItem('version', '0.0.1');

  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })
  export default class Money extends Vue {

    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
    recordList = store.recordList;

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      store.createRecord(this.record);
    }

  }
</script>

<style lang="scss">
    .content-wrapper {
        display: flex;
        flex-direction: column;

        .tags {
            flex-grow: 1;
            display: flex;
            flex-direction: column-reverse;
        }

        .notes {
            padding: 12px 0;
        }
    }
</style>

<style lang="scss" scoped>
</style>