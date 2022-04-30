<template>
  <view class="search">
    <view class="search-wrp">
      <uni-search-bar :focus="true" @update:modelValue="input" :radius="30" placeholder="请输入搜索内容" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    
    <uni-card margin="1px" spacing="3px">
    <view class="search-suggestion" v-if="searchRults">
      <view class="search-suggestion-item" v-for="(item, index) in searchRults" :key="index" @click="onItemClicktoDetail(item)">
        <view class="search-suggestion-item-title">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- /搜索建议列表 -->
    <!-- 搜索历史-->
    <view class="search-history" v-if="!searchValue">
      <view class="search-history-header">
        <text>搜索历史</text>
        <image @click="clearHistory" src="/static/my-icons/delete.png" class="trash-icon" mode=""></image>
      </view>
      <view class="search-history-item">
        <uni-tag class="history-tag" v-for="(item, index) in historys" :key="index" :text="item" type="success" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
    </uni-card>
    <!-- /搜索历史-->
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: '',
        // 防抖
        timer: null,
        // 搜索结果列表
        searchRults: [],
        // 搜索历史记录
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        
        this.timer = setTimeout(() => {
          this.searchValue = e
          this.getSearchList()
        }, 500);
      },
      async getSearchList() {
        if (this.searchValue === '') {
          this.searchRults = [] 
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: '小米' })
        if ( res.meta.status !== 200 ) return uni.$showMsg()
        this.searchRults = res.message
      },
      // 点击搜索建议跳转到商品详细列表
      onItemClicktoDetail(item) {
        this.saveSearchHistory()
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.searchValue)
        set.add(this.searchValue)
        this.historyList = Array.from(set)
        // 将历史记录存储到本地
        uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
      },
      // 清空历史记录
      clearHistory() {
        uni.clearStorageSync()
        this.historyList = []
      },
      // 点击历史记录跳转到商品列表
      goToGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed: {
      historys() {
        return [...this.historyList].reverse()
      } 
    }
  }
</script>

<style lang="scss">
.search-suggestion{
  padding: 0 5px;
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    &-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 8px;
    }
  }
}

.search-history {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ccc;
    font-size: 12px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    text {
      margin-left: 3px;
    }
    .trash-icon {
      width: 20px;
      height: 20px;
      margin-right: 7px;
    }
  }
  &-item {
    margin-top: 5px;
    margin-left: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .history-tag {
      margin: 5px;
    }
  }
}
</style>
