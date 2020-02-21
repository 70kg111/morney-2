<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval"/>

        <ol>
            <li v-for="(group,index) in result" :key="index.id">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>

    </Layout>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, Tags}
  })
  export default class Statistics extends Vue {

    tagString(tags: Tags[]) {
      return tags.length === 0 ? '(҂‾ ▵‾)σ(˚▽˚’!)/' : tags.join(',');
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string, items: RecordItem[] }

      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    type = '-';
    interval = 'day';

    recordTypeList = recordTypeList;
    intervalList = intervalList;

  }
</script>

<style lang="scss" scoped>
 
    %item {
        padding: 0 16px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        @extend %item;
    }

    .record {
        @extend %item;
        background-color: white;
    }

    .notes{
        margin-right: auto;
        padding-left: 20px;
        color: #999999;
    }

    ::v-deep {
        .type-tabs-item {
            background-color: white;

            &.selected {
                background-color: #c4c4c4;

                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            height: 48px;
        }
    }

</style>