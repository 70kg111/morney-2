<template>
    <div class="layout-wrapper" >
        <div class="content" :class="contentClass">
            <slot></slot>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Layout extends Vue {
    @Prop(String) contentClass!:string;
  }
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;

        > .content {
            overflow: auto;
            flex-grow: 1;
        }
    }
</style>