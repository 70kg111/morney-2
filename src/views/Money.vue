<template>
    <Layout contentClass="content-wrapper">

        <Tags @update:value="record.tags = $event"/>

        <div class="notes">
            <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注" :value="this.record.notes"/>
        </div>

        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>

        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  window.localStorage.setItem('version', '0.0.1');

  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {

    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError) {
        window.alert('创建成功');
      }
      this.record.notes = '';
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