<template>
  <van-icon
    @click="onlike(articleId)"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
  />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'likeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
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
    async onlike(id) {
      this.loading = true
      try {
        // state 单独声名的变量，来控制value
        let state = -1
        if (this.value === 1) {
          await deleteLike(id)
        } else {
          await addLike(id)
          state = 1
        }
        this.$emit('input', state)
        this.$toast.success(state === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.liked {
  color: red;
}
</style>
