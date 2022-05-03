<template>
  <view class="settle">
    <!-- 全选按钮 -->
    <view class="settle-full-select">
      <label class="radio" @click="changeAllState">
        <radio :checked="ifFullCheck" value="" /><text>全选</text>
      </label>
    </view>
    
    <!-- 价格合计区域 -->
    <view class="settle-price">
      合计：<text>￥ {{checkGoodsAmount}}</text>
    </view>
    
    <!-- 结算区域 -->
    <view class="settle-submit">
      结算( {{checkedCount}} )
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name:"my-settle",
    computed: {
      ...mapGetters(['checkedCount','cartCount','checkGoodsAmount']),
      ifFullCheck () {
        return this.checkedCount === this.cartCount
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations(['updateAllGoodsState']),
      changeAllState() {
        this.updateAllGoodsState(!this.ifFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.settle {
  height: 50px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-full-select {
    display: flex;
    align-items: center;
  }
  &-price {
    text {
      color: orangered;
      font-size: 18px;
    }
  }
  &-submit {
        height: 50px;
        min-width: 100px;
        background-color: #c00000;
        color: white;
        line-height: 50px;
        text-align: center;
        padding: 0 10px;
        border-radius: 50px;
  }
}
</style>