<template>
  <div class="search-container">
    <van-search
      v-model="value"
      show-action
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <van-cell title="历史信息" value="内容"
      ><van-icon name="delete-o"/> <van-icon name="delete-o"
    /></van-cell>
  </div>
</template>
<script>
export default {
  name: 'searchIndex',
  data() {
    return {
      value: ''
    }
  },
  props: {},
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.$toast(val)
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>
<style lang="less" scoped></style>
