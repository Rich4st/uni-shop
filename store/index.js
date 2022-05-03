import {
	createStore
} from "vuex";

export default createStore({
	state: {
    // 购物车列表
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    //收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}')
	},
  
	mutations: {
		// 定义mutations，用于修改状态(同步)
    // 加入购物车
    addToCart(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      
      // 如果商品已经存在购物车中，则只需要更新商品数量即可
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('saveToStorage')
    },
    // 持久化处理
    saveToStorage(state) {
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 修改购物车商品的勾选状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('saveToStorage')
      }
    },
    // 更新购物车商品数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('saveToStorage')
      }
    },
      // 滑动删除购物车的商品
    removeGoodsById(state, goods) {
      // 过滤掉所有id与传过来的不同的数据实现删除
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
      this.commit('saveToStorage')
    },
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('saveAddressToStorage')
    },
    // 收货地址持久化处理
    saveAddressToStorage(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    // 购物车商品的全选与反选功能
    updateAllGoodsState(state, newState) {
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('saveToStorage')
    }
	},
  
	actions: {
		// 定义actions，用于修改状态(异步)
		// 2秒后更新状态
	},
	getters: {
		// 定义一个getters
    addressStr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    },
    // 购物车商品已选择的数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((preVal, curVal) => preVal+=curVal.goods_count,0)
    },
    // 购物车商品总数
    cartCount(state) {
      return state.cart.reduce((preVal, curVal) => preVal + curVal.goods_count, 0)
    },
    // 计算所有已勾选商品的价格
    checkGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((preVal, curVal) => preVal+=curVal.goods_price * curVal.goods_count,0).toFixed(2)
    }
	},
	modules: {}
});