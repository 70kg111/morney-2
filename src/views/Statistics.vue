<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval"/>

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
    type = '-';
    interval = 'day';

    recordTypeList = recordTypeList;
    intervalList = intervalList;

  }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item {
        background-color: white;

        &.selected {
            background-color: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }

</style>