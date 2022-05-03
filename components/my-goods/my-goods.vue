<template>
    <uni-card margin="8px" spacing="3px">
    <view class="goods-item">
      <view class="goods-item-left">
        <radio value="" :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="onRadioClick" />
        <image :src="item.goods_small_logo || defaultPic" mode=""></image>
      </view>
      <view class="goods-item-right">
        <view class="goods-item-right-title">
          {{item.goods_name}}
        </view>
        <view class="goods-item-right-price">
          <view class="goods-item-right-price-left">
            ￥{{item.goods_price}}.00
          </view>
          <uni-number-box :min="1" :value="item.goods_count" @change="bindChange" v-if="showNumBox"></uni-number-box>
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
      },
      // 是否显示单选按钮
      showRadio: {
        type: Boolean,
        default: false
      },
      // 是否显示number box
      showNumBox: {
        type: Boolean,
        default: false
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
    },
    methods: {
      onRadioClick() {
        this.$emit('radio-change',{
          goods_id: this.item.goods_id,
          goods_state: !this.item.goods_state
        })
      },
      // 数字文本框值的change事件
      bindChange(e) {
        this.$emit('num-change',{
          goods_id: this.item.goods_id,
          goods_count: e
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  &-left{
    display: flex;
    align-items: center;
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
    justify-content: space-between;
    &-title{
      font-size: 14px;
    }
    &-price {
      font-size: 18px;
      color: orangered;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>