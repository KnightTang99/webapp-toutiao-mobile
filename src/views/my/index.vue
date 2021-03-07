<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo">
            <van-loading slot="loading" type="spinner" size="25" />
          </van-image>
          <span class="username">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button to="/user/profile" round size="mini" type="default"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div
        class="login-btn"
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img class="mobile" src="@/assets/mobile.png" alt="" />
        <span class="text">注册 / 登录</span>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell
      v-if="user"
      title="退出登录"
      clickable
      class="logout-cell"
      @click="onLogout"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { removeItem } from '@/utiles/storage.js'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {},
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          message: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },

    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取信息失败，请稍后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .mobile {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 22px;
        }
        .username {
          color: #fff;
          font-size: 30px;
        }
      }
      .right {
        .van-button {
          color: #666;
          font-size: 20px;
          background-color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .count {
          font-size: 36px;
          color: #fff;
          margin-bottom: 18px;
        }
        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 9px;
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
        margin-bottom: 16px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
        color: #333;
      }
    }
  }
  .mb-9 {
    margin-bottom: 9px;
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
    font-size: 30px;
  }
}
</style>
