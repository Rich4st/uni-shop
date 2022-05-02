<template>
    <uni-card margin="8px" spacing="3px">
    <view class="goods-item">
      <view class="goods-item-left">
        <image :src="item.goods_small_logo || defaultPic" mode=""></image>
      </view>
      <view class="goods-item-right">
        <view class="goods-item-right-title">
          {{item.goods_name}}
        </view>
        <view class="goods-item-right-price">
          ￥{{item.goods_price}}.00
        </view>
      </view>
    </view>
    </uni-card>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // 商品图片缺省值
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    computed: {
      price: function (num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  &-left{
    margin: 5px;
    image {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  &-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-title{
      font-size: 14px;
    }
    &-price {
      font-size: 18px;
      color: orangered;
    }
  }
}
</style>