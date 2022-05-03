<template>
  <view class="cart" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <view class="cart-address">
      <my-address></my-address>
    </view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text>购物车</text>
    </view>
    <!-- 购物车列表区域 -->
    <uni-swipe-action>
      <block v-for="(item, index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click='onSwipeClick(item)'>
          <my-goods :item="item" :show-radio="true" @radio-change="getCartItem" show-num-box
            @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 自定义结算组件 -->
    <my-settle></my-settle>
  </view>
  <view class="cart-empty" v-else>
    <image src="../../static/my-icons/cart_empty.png" mode=""></image>
    <text>空空如也~</text>
  </view>
</template>

<script>
  import badgeMixin from '../../mixins/setBadge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMixin],
    computed: {
      ...mapState(['cart'])
    },
    data() {
      return {
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ]
      };
    },
    onLoad() {
      console.log(this.cart.length === 0);
    },
    methods: {
      ...mapMutations(['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      getCartItem(e) {
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 点击滑动操作的按钮
      onSwipeClick(goods) {
        this.removeGoodsById(goods)
        uni.redirectTo({
          url: '/pages/cart/cart'
        })
      }
    }
  }
</script>

<style lang="scss">
  .cart {
    padding-bottom: 50px;
    &-title {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 5px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;

      text {
        margin-left: 10px;
      }
    }
    &-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50%;
      transform: translateY(-40%);
      image {
        width: 200px;
        height: 200px;
      }
      text {
        font-size: 16px;
        color: #ccc;
      }
    }
  }
</style>
