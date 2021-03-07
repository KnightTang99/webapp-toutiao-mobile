<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <!-- 支持路由模式，跳转到指定路由 -->
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="bar-text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="bar-text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="bar-text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="bar-text">{{
          $store.state.user ? '我的' : '未登录'
        }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.bar-text {
      font-size: 20px;
      color: #666;
    }
  }
}
</style>
