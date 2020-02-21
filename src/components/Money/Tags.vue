<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagsList" :key="tag.id" @click="toggle(tag)"
                :class="{selected:selectedTags.indexOf(tag)>=0} ">
                {{tag.name}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,} from 'vue-property-decorator';
  import store from '@/store/index';

  @Component({
      computed: {
        tagsList() {
          //TODO
          //return this.$store.fetchTags();
          return []
        }
      }
    }
  )
  export default class Tags extends Vue {

    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    create() {
      const name = window.prompt('请输入标签名：');
      if (!name) { return window.alert('请输入正确的标签名！'); }

      //TODO
      //store.createTag(name);
    }

  }
</script>

<style lang="scss" scoped>
    .tags {
        background-color: white;
        font-size: 14px;
        padding: 16px;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                $bg: #d9d9d9;
                background-color: $bg;
                $h: 24px;
                height: $h;
                border-radius: ($h/2);
                padding: 0 16px;
                margin-right: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 4px;

                &.selected {
                    background-color: darken($bg, 32%);
                    color: white;
                }
            }
        }

        > .new {
            padding-top: 16px;

            > button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }

    }
</style>