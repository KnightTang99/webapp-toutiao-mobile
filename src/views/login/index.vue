<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="userFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>

        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="primary"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <p class="Privacy">隐私条款</p>
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1(3|5|7|8)\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      const user = this.user
      // $toast 是挂载在vue原型上的
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        console.log(data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.userFormRef.validate('mobile')
      } catch (err) {
        return this.$toast.fail('手机号验证失败')
      }
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .login-btn-wrap {
    padding: 53px 38px;
    .login-btn {
      background-color: #6db4fb;
      font-size: 30px;
      border: none;
      border-radius: 8px;
    }
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    color: #666;
    border: 0;
    background-color: #ededed;
  }
  .Privacy {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 25px;
    color: #666;
  }
}
</style>
