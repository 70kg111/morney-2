<template>
    <div>
        <ul class="types">
            <li :class="type === '-' && 'selected' " @click="selected('-')">支出</li>
            <li :class="type === '+' && 'selected' " @click="selected('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    type: string = '-'; //'-'表示支出，'+'表示收入
    selected(type: string) {
      if (type === '-' || type === '+') {
        this.type = type;
      }
    }

  }
</script>

<style lang="scss" scoped>
    .types {
        font-size: 24px;
        display: flex;
        background-color: #c4c4c4;
        text-align: center;

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>