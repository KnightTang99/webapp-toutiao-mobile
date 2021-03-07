<template>
  <!-- 条件渲染只会有一个根节点，所有不会报错 -->
  <van-button
    v-if="is_Followed"
    round
    size="small"
    :loading="loading"
    loading-type="spinner"
    @click="onFollow(userId)"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    loading-type="spinner"
    @click="onFollow(userId)"
    >关注</van-button
  >
</template>
<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'followUser',
  components: {},
  model: {
    prop: 'is_Followed',
    event: 'update-follow'
  },
  props: {
    is_Followed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow(id) {
      this.loading = true
      try {
        if (this.is_Followed) {
          await deleteFollow(id)
        } else {
          await addFollow(id)
        }
        this.$emit('update-follow', !this.is_Followed)
      } catch (err) {
        let message = '操作失败，请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '您不可以关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped></style>
