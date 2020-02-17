<template>
    <Layout contentClass="content-wrapper">

        <Tags :dataSource.sync="tags"/>

        <Notes/>

        <Types/>

        <NumberPad/>

    </Layout>
</template>

<script lang="js">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    data() {
      return {
        tags: ['衣', '食', '住', '行']
      };
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