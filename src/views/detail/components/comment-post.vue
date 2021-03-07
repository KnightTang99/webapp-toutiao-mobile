<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" :disabled="!message.length" class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comments'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id:
            this.articleId === this.target ? null : this.articleId.toString()
        })

        this.$emit('post-success', data.data)
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
