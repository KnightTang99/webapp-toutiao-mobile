<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        round
        size="small"
        type="info"
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channel-tabs" swipeable animated v-model="active">
      <van-tab
        v-for="channel in channelList"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger" @click="isEditShow = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹框 -->
    <van-popup
      close-icon-position="top-left"
      v-model="isEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <article-edit
        @update-active="updateActive"
        :active="active"
        :my-channels="channelList"
      ></article-edit>
    </van-popup>
  </div>
</template>
<script>
import ArticleList from './components/article-list.vue'
import ArticleEdit from './components/articleEdit'
import { getChannelList } from '@/api/user.js'
import { mapState } from 'vuex'
import { getItem, setItem } from '@/utiles/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channelList: [],
      isEditShow: false
    }
  },
  components: {
    ArticleList,
    ArticleEdit
  },
  created() {
    this.loadChannelList()
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {},
  methods: {
    async loadChannelList() {
      let channels = []
      if (this.user) {
        try {
          const { data } = await getChannelList()
          channels = data.data.channels
        } catch (err) {
          this.$toast('获取频道列表失败')
        }
      } else {
        const localChannels = getItem('USER_CHANNELS')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getChannelList()
          channels = data.data.channels
          setItem('USER_CHANNELS', channels)
        }
      }
      this.channelList = channels
    },
    updateActive(index, isEditShow) {
      this.active = index
      this.isEditShow = isEditShow
    }
  }
}
</script>
<style lang="less" scoped>
// /deep/ 深度作用选择器
.home-container {
  padding-top: 174px;
  margin-bottom: 100px;
  .page-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
        color: #fff;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      color: #777;
      font-size: 28px;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      font-size: 30px;
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
    .hamburger {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
