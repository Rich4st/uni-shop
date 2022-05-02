<template>
  <view class="goods">
    <block v-for="(item,index) in goodsList" :key="index">
      <view class="my-goods" @click="goToDetail(item)">
        <my-goods :item="item" ></my-goods>
      </view>
   </block>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类id
          cid: '',
          // 页码值
          pagenum: 1,
          //每页条数n
          pagesize: 10
        },
        // 商品列表数据 
        goodsList: [],
        total: 0,
        // 商品图片缺省值
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading: false
        
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表
      async getGoodsList(cb) {
        this.isLoading = true // 打开节流阀
        
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        cb && cb() // 请求完成后调用回调函数关闭下拉刷新的效果
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
        
        this.isLoading=false // 关闭节流阀
      },
      // 点击商品列表跳转到的对应的商品详情
      goToDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id 
        })
      }
    },
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return
      if (this.isLoading) return
      this.queryObj.pagenum ++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1,
      this.total = 0,
      this.isLoading = false,
      this.goodsList = []
      
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>
<style lang="scss">

</style>
