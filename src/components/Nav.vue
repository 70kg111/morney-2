<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>

        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="labels"/>
            标签
        </router-link>

        <router-link to="statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            统计
        </router-link>

    </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';


  @Component
  export default class Nav extends Vue {

  }
</script>

<style lang="scss" scoped>

    @import "src/assets/style/helper.scss";

    nav {
        display: flex;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
        flex-direction: row;
        font-size: 12px;

        > .item {
            width: 33.33333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 2px 0;

            > .icon {
                width: 32px;
                height: 32px;
            }
        }

        > .item.selected {
            background-color: $color-height;
        }
    }
</style>