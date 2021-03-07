<template>
  <van-icon
    @click="onCollect(articleId)"
    :name="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
  />
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'collectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
    async onCollect(id) {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(id)
          // this.$toast.fail('取消收藏')
        } else {
          await addCollect(id)
          // this.$toast.success('收藏成功')
        }
        // 更新视图
        this.$emit('input', !this.value)
        // 这里的value还是没有改变之前的，也就是说$emit 改变的数据还拿不到
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.collected {
  color: #ffa500;
}
</style>
