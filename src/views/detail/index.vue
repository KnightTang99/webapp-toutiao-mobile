<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="$router.back()"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->

      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <!-- v-else-if="details.title" 如果有内容，则渲染文章详情页 -->
      <div class="article-detail " v-else-if="details.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ details.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="details.aut_photo"
          />
          <div slot="title" class="user-name">{{ details.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ details.pubdate | relativeTime }}
          </div>
          <!-- 将关注按钮封装成一个组件，其他地方也可调用 -->
          <!-- 给组件添加类名会作用到组件的根节点上 -->
          <!-- 组件内使用数据不需要this -->
          <!-- $event 接受传过来的参数 -->

          <!-- 收藏组件 -->
          <follow-user
            v-model="details.is_followed"
            :user-id="details.aut_id"
            class="follow-btn"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="details.content"
          ref="details_content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论组件 -->
        <comment-list
          @onload-success="total = $event.total_count"
          :source="details.art_id"
          :list="commentList"
          @click-reply="onClickReply"
        />
        <!-- 添加评论弹框 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            @post-success="onPostSuccess"
            :target="details.art_id"
            :articleId="articleId"
          />
        </van-popup>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="total" color="#777" />
          <collect-article
            :article-id="details.art_id"
            v-model="details.is_collected"
          />

          <like-article
            v-model="details.attitude"
            :article-id="details.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleDetail"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        @click-close="isReplyShow = false"
        :comment="currentComment"
        :articleId="articleId"
      />
    </van-popup>
  </div>
</template>

<script>
// 根据id获取文章详情
import { getArticleDetailById } from '@/api/article'
// 为什么这样导入（函数的方式导入）
import { ImagePreview } from 'vant'
// 导入关注按钮组件
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commentList from '@/views/detail/components/comment-list'
import commentPost from '@/views/detail/components/comment-post'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  // 导入--> 注册 --> 使用
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      details: {},
      loading: true,
      errStatus: 0,
      total: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticleDetail()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    async loadArticleDetail() {
      this.loading = true
      try {
        const { data } = await getArticleDetailById(this.articleId)
        this.details = data.data

        // !内容是条件渲染的，只能利用异步拿到参数
        // this.$refs 是拿到指定的DOM元素
        setTimeout(() => {
          const img = this.$refs.details_content.querySelectorAll('img')
          const images = []
          img.forEach((item, index) => {
            images.push(item.src)
            item.onclick = () => {
              ImagePreview({
                images: images,
                startPosition: index
              })
            }
          })
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    onPostSuccess(data) {
      this.commentList.unshift(data.new_obj)
      this.isPostShow = false
    },
    onClickReply(comment) {
      this.currentComment = comment

      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
