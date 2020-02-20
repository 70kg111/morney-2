<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
            <span class="title">编辑标签</span>
            <Icon class="rightIcon"></Icon>
        </div>

        <div class="form-wrapper">
            <FormItem :value="tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名"></FormItem>
        </div>

        <div class="button-wrapper">
            <Button @click.native="remove">删除标签</Button>
        </div>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button}
  })
  export default class EditLabel extends Vue {

    tag?: { id: string, name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.tag) {
        tagListModel.update(this.tag.id, name);
      }
    }

    remove() {
      if (this.tag) {
        if (tagListModel.remove(this.tag.id)) {
          window.alert('删除成功');
          this.$router.back();
        }
      }
    }

    goBack() {
      this.$router.back();
    }

  }
</script>

<style lang="scss" scoped>
    .navBar {
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        padding: 12px 16px;
        background-color: white;

        > .title {
        }

        svg {
            width: 24px;
            height: 24px;
            color: #333333;
        }
    }

    .form-wrapper {
        background-color: white;
        margin-top: 8px;
        display: flex;
        align-items: center;
    }

    .button-wrapper {
        text-align: center;
        padding-top: 44px;
    }
</style>