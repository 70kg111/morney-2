<template>
    <Layout contentClass="content-wrapper">

        {{record}}

        <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>

        <Notes @update:value="onUpdateNotes"/>

        <Types :value.sync="record.type"/>

        <NumberPad :value.sync="record.amount"/>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
  }

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {

    tags = ['衣', '食', '住', '行'];

    record: Record = {tags: [], notes: '', type: '-', amount: 0};

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
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
    }
</style>

<style lang="scss" scoped>
</style>