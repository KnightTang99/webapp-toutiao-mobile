<template>
  <van-list
    class="commentList"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      @click-reply="$emit('click-reply', $event)"
      :comment="item"
    />
  </van-list>
</template>
<script>
import { getCommentLists } from '@/api/comments'
import CommentItem from '@/views/detail/components/comment-item'
export default {
  name: 'commentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: value => {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list:[]
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loading = true
    // 一刷新就调用一次防止数据出现空白
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      this.loading = true
      try {
        const { data } = await getCommentLists({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        this.$emit('onload-success', data.data)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.commentList {
  padding-bottom: 88px;
}
</style>
