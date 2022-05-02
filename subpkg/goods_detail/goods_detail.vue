<template>
  <view class="goods-detail">
    <!-- 轮播图区域 -->
    <view class="goods-detail-swiper">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item, index) in goodsInfo.pics" :key="index">
          <image :src="item.pics_big" mode="heightFix" @click="previewImg(index)"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 商品信息区域 -->
    <view class="goods-detail-info">
      <!-- 价格区域 -->
      <view class="goods-detail-info-price" v-if="goodsInfo.goods_price">
        ￥ {{goodsInfo.goods_price}}
      </view>
      <!-- 标题和收藏 -->
      <view class="goods-detail-info-body">
        <view class="goods-detail-info-body-name" v-if="goodsInfo.goods_name">
          {{goodsInfo.goods_name}}
        </view>
      </view>
      <!-- 快递运费 -->
      <view class="goods-detail-info-delivery">
        快递：免运费
      </view>
    </view>
    <view class="goods-detail-intro">
      <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    </view>
    <!-- 商品详情导航 -->
    <view class="goods-detail-nav">
      <uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="onOptionClick" @buttonClick="onButtonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: {},
        /* 商品详情nav */
        // 左侧按钮的配置项
        options: [
        {
          icon: 'chat',
          text: '客服'
        }, 
        {
          icon: 'shop',
          text: '店铺',
          info: 0,
          infoBackgroundColor: '#007aff',
          infoColor: "#f5f5f5"
        }, 
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
            color: '#fff'
          }
        ],
      };
    },
    onLoad(options) {
      this.getGoodsInfo(options.goods_id)
    },
    methods: {
      async getGoodsInfo(id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"')
        console.log(res.message);
        this.goodsInfo = res.message
      },
      previewImg(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsInfo.pics.map(item => item.pics_big)

        })
      },
      // 导航栏左侧按钮的点击事件
      onOptionClick(e) {
        uni.showToast({
          title: `点击了${e.content.text}`,
          icon: 'none'
        })
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      onButtonClick(e) {
        this.options[2].info ++
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail {
    padding-bottom: 50px;
    swiper {
      height: 750rpx;

      image {
        height: 100%;
        width: 100%;
      }
    }

    &-info {
      &-price {
        margin: 8px;
        font-size: 24px;
        color: orangered;
      }

      &-body {
        display: flex;
        justify-content: space-between;
        height: 40px;

        &-name {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          border-right: 1px solid #ccc;
          padding: 0 10px;
        }
      }

      &-delivery {
        font-size: 14px;
        color: #999;
        padding: 5px 10px;
      }
    }
    &-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
