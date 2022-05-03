<template>
  <view class="address">
    <view class="address-body-button" v-if="JSON.stringify(address) === '{}'">
      <button type="default" size="mini" @click="chooseAddressHandler">请选择收货地址+</button>
    </view>
    <view class="address-body-info" v-else>
      <view class="address-body-info-top">
        <view class="address-body-info-top-left" v-if="address.userName">
          收货人：<text>{{address.userName}}</text>
        </view>
        <view class="address-body-info-top-right" v-if="address.telNumber">
          电话：<text>{{address.telNumber}}</text>
          <uni-icons type="arrowright" size="16" @click="chooseAddressHandler()"></uni-icons>
        </view>
      </view>
      <view class="address-body-info-bottom" v-if="addressStr">
        收货地址：<text>{{addressStr}}</text>
      </view>
    </view>
    <image src="../../static/cart_border@2x.png" mode="widthFix" class="address-border"></image>
  </view>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name:"my-address",
    computed: {
      ...mapState(['address']),
      ...mapGetters(['addressStr'])
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapMutations(['updateAddress']),
      async chooseAddressHandler() {
        const res = await uni.chooseAddress().catch(err => err)

        if (res.errMsg === 'chooseAddress:ok') {
          this.updateAddress(res)
        }
      }
    }
  }
</script>

<style lang="scss">
.address{
  &-body-button {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-body-info {
    margin: 10px 0;
    font-size: 14px;
    color: #999;
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }
    &-bottom {
      padding: 5px;
    }
  }
  &-border {
    display: block;
    height: 3px;
    width: 100%;
  }
}
</style>