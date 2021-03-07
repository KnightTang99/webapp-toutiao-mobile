<template>
  <div class="history-container">
    <van-cell title="搜索历史">
      <div v-if="isDeleteIconShow">
        <!-- 全部删除，子传父，将数组置为[] -->
        <span @click="$emit('updateHistoryList', [])">全部删除</span
        ><span @click="isDeleteIconShow = false" class="complete">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteIconShow = true"
    /></van-cell>
    <van-cell
      @click="onClickItem(item, index)"
      v-for="(item, index) in historyList"
      :key="index"
      :title="item"
    >
      <van-icon v-show="isDeleteIconShow" name="close" />
    </van-cell>
  </div>
</template>
<script>
import { getHistoryList } from '@/api/search'
import { getItem } from '@/utiles/storage'
import { mapState } from 'vuex'
export default {
  name: 'historyIndex',
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteIconShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.changeHistoryList()
  },
  mounted() {},
  methods: {
    onClickItem(item, id) {
      if (this.isDeleteIconShow) {
        this.historyList.splice(id, 1)
      } else {
        this.$emit('search', item)
      }
    },
    async changeHistoryList() {
      if (this.user) {
        try {
          const { data } = await getHistoryList()
          const { keywords } = data.data
          this.$emit('updateHistoryList', keywords)
        } catch (err) {
          this.$toast('获取信息失败，请稍后重试')
        }
      } else {
        const list = getItem()
        this.$emit('updateHistoryList', list)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.history-container {
  .complete {
    margin-left: 15px;
  }
}
</style>
