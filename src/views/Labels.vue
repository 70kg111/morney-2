<template>

    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>

        <div class="createTag-wrapper">
            <Button class="createTag" @click.native="createTag">新建标签</Button>
        </div>

    </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button},
  })
  export default class Labels extends Vue {
    get tags() {
      return this.$store.state.tagList;
    }

    beforeCreate() {
      this.$store.commit('fetchTags');
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      if (!name) { return window.alert('标签名不能为空'); }
      this.$store.commit('createTag', name);
    }
  }
</script>

<style lang="scss" scoped>
    .tags {
        background-color: white;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;

            > svg {
                width: 24px;
                height: 24px;
                color: #333333;
                margin-right: 16px;
            }
        }
    }

    .createTag-wrapper {
        text-align: center;
        padding-top: 40px;

        > .createTag {
            background-color: #767676;
            color: white;
            border-radius: 4px;
            height: 44px;
            padding: 0 16px;
        }
    }

</style>