import { mapGetters } from 'vuex'
  
export default {
    computed: {
      ...mapGetters(['cartCount'])
    },
    watch: {
      cartCount() {
        this.setBadge()
      }
    },
    onload() {
      this.setBadge()
    },
    onShow() {
      this.setBadge()
    },
    methods: {
      setBadge() {
        if (this.cartCount) {
        uni.setTabBarBadge({
          index: 2,
          text: this.cartCount + ''
        })
        }
      }
    }
}