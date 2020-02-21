<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>

        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index.id">
                <h3 class="title">{{beautify(group.title)}} <span>总计：￥{{group.total}}</span></h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">这里还没有记账噢</div>

    </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  const api = dayjs();

  @Component({
    components: {Tabs, Tags}
  })
  export default class Statistics extends Vue {

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';

    recordTypeList = recordTypeList;

    tagString(tags: Tags[]) {
      return tags.length === 0 ? '(҂‾ ▵‾)σ(˚▽˚’!)/' : tags.map(t => t.name).join('，');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList).filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = {
        title: string,
        total?: number,
        items: RecordItem[]
      }[]

      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];

      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    beautify(string: string) {
      const api = dayjs(string);
      const now = dayjs();

      if (api.isSame(now, 'day')) {
        return '今天';
      } else if (api.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (api.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (api.isSame(now, 'year')) {
        return api.format('MM月DD日');
      } else {
        return api.format('YYYY年MM月D日');
      }

    }

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

    .notes {
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

    .noResult{
        padding: 80px;
        text-align: center;
    }

</style>