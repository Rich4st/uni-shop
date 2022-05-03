<template>
  <!-- 搜索栏 -->
  <view class="cate-container">
    
    <my-search @click="goToSearch"></my-search>
    <view class="scroll">
      <!-- 左侧滚动区域 -->
      <scroll-view class="scroll-left" scroll-y 
      :style="{height: windowHeight + 'px'}">
        <view :class="['scroll-left-item', index === active ? 'active' : '']" v-for="(item,index) in cateList" :key="index" @click="onCateItemClick(index)">
          <text>{{ item.cat_name }}</text>
        </view>
      </scroll-view>
      <!-- 右侧滚动区域 -->
      <scroll-view class="scroll-right" scroll-y :style="{height: windowHeight + 'px'}" :scroll-top="isScrollTop">
        <view class="scroll-right-item" v-for="(item2,index2) in cateLevel2" :key="index2">
          <view class="scroll-right-item-title">
            {{item2.cat_name}}
          </view>
          <view class="scroll-right-item-lv3">
            <view class="scroll-right-item-lv3-item"  v-for="(item3,index3) in item2.children" :key="index3" @click="goToGoodsList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view> 
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMixin from '../../mixins/setBadge.js'
  export default {
    mixins: [badgeMixin],
    data() {
      return {
        // 当前设备窗口可用高度
        windowHeight: 0,
        // 分类列表数据
        cateList: [],
        // 二级分类列表数据
        cateLevel2: [],
        active: 0,
        // 切换分类时重置滚动条位置
        isScrollTop: 0
      };
    },
    onLoad() {
      const systemInfo = uni.getSystemInfoSync()
      this.windowHeight = systemInfo.windowHeight
      // 获取分类数据列表
      this.getCateList()
    },
    
    methods: {
      async getCateList () {
        const {data: res} = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      // 左侧分类点击事件
      onCateItemClick(index) {
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        this.isScrollTop = this.isScrollTop ? 0 : 1
      },
      // 点击三级分类跳转到商品详情
      goToGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
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
.scroll {
  display: flex;
  font-size: 12px;
  &-left {
    width: 120px;
    &-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 6rpx;
          height: 60px;
          background-color: #1ED760;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
    }
  }
  
  &-right {
    font-size: 15px;
    &-item{
      &-title {
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
      &-lv3 {
        display: flex;
        flex-wrap: wrap;
        &-item{
          width: 33.33%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        image{
          width: 120rpx;
          height: 120rpx;
        }
        text {
          font-size: 12px;
        }
      }


    }
  }
}
</style>
