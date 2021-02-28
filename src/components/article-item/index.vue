<template>
  <van-cell class="article-item">
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ article.title }}
    </div>
    <div slot="label" class="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" class="cover-img" :src="img" />
        </div>
      </div>
      <div class="label-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-img"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .label {
    color: #b4b4b4;
    font-size: 23px;

    .label-info span {
      margin-right: 22px;
    }
    .cover-wrap {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        .cover-img {
          width: 100%;
          height: 146px;
        }
        &:not(:last-child) {
          padding-right: 4px;
        }
      }
    }
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;
  }
  .right-img {
    width: 232px;
    height: 146px;
  }
}
</style>
