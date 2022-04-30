<template>
  <view>
    <my-search @click="goToSearch"></my-search>
    <!-- 轮播图区域-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item">
          <image :src="item.image_src" mode="widthFix"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- /轮播图区域-->
    <!-- 首页导航-->
    <view class="nav-list">
      <view class="nav-list-item" v-for="(item, index) in navList" :key="index" @click="onNavItemClick(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- /首页导航-->
    <!-- 首页楼层图区域-->
    <view class="floor"  v-for="(item, index) in floorList" :key="index">
      <!--  标题 -->
      <view class="floor-title">
        <image :src="item.floor_title.image_src"></image>
      </view>
      <!-- 图片区域 -->
      <view class="floor-image-box">
        <navigator class="left-image-box" :url="item.product_list[0].navigator_url">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
        </navigator>
        <view class="right-image-box">
          <navigator :url="child.navigator_url" class="right-image-box-item" v-for="(child, i) in item.product_list" :key="i">
            <image :src="child.image_src" :style="{width: child.image_width + 'rpx'}" mode="widthFix"  v-if="i!==0"></image>
          </navigator>
        </view>
      </view>
      <!-- /图片区域 -->
    </view>
    <!-- /首页楼层图区域-->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const {data: res} =  await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
      },
      // 获取首页分类选项的数据
       async getNavList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 首页分类栏的点击事件
      onNavItemClick (item) {
        if(item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取首页楼层图数据
      async getFloorList () {
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach(floor => {
          floor.product_list.forEach(item => {
            item.navigator_url =  '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
        console.log(this.floorList);
      },
      // 点击搜索框跳转到搜索页面
      goToSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 10rpx 0;
  &-item,image {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor{
  &-title,image {
    width: 100%;
    height: 60rpx;
  }
  &-title:first-child {
    margin-top: 30rpx;
  }
  .floor-image-box{
    display: flex;
    .left-image-box {
      padding-left: 10rpx;
    }
    .right-image-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
.search {
  position: sticky;
  top: 0;
  z-index: 99;
}

</style>
