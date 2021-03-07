<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <comment-list
        :list="currentCommentList"
        type="c"
        :source="comment.com_id"
        :articleId="articleId"
      />
    </div>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button size="small" round @click="isPostShow = true" class="post-btn"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        @post-success="onPost"
        :articleId="articleId"
        :target="comment.com_id"
      />
    </van-popup>
    <!-- /底部 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import commentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      currentCommentList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPost(data) {
      this.currentCommentList.unshift(data.new_obj)
      this.isPostShow = false
      this.comment.reply_count++
    }
  }
}
</script>

<style lang="less" scoped>
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #8d8d8d;
  .post-btn {
    width: 60%;
  }
}
.scroll {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>
