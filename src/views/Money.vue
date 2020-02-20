<template>
    <Layout contentClass="content-wrapper">

        <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>

        <div class="notes">
            <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
        </div>

        <Types :value.sync="record.type"/>

        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import recordListModel from '@/models/recordListModel';

  window.localStorage.setItem('version', '0.0.1');

  const recordList = recordListModel.fetch();

  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })
  export default class Money extends Vue {

    tags = window.tagList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
    recordList: RecordItem[] = recordList;

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      recordListModel.create(this.record);
    }

    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save();
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