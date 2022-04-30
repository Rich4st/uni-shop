<template>
  <view class="search" :style="{backgroundColor: bgColor}" @click="onSearchClick">
    <view class="search-box">
      <image src="../../static/tab_icons/search.png" mode=""></image>
      <text style="font-size: 12px;color: #ccc;">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      bgColor: {
        type: String,
        default: '#90D4DD'
      },
      text: {
        type: String,
        default: '搜索'
      },
    },
    data() {
      return {
        
      };
    },
    methods: {
      onSearchClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.search {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-box{
    background-color: #fff;
    height: 30px;
    width: 90%;
    border-radius: 30px;
    display: flex; 
    justify-content: center;
    align-items: center;
    image {
      width: 18px;
      height: 18px;
    }
    text {
      margin-left: 10rpx;
    }
  }
}
</style>