<template>
  <div class="article-edit">
    <van-cell :border="false">
      <div slot="title" class="channel">我的频道</div>
      <van-button
        @click="editMyChannels"
        class="edit-btn"
        size="mini"
        type="danger"
        plain
        round
        >{{ isEditChange ? '编辑' : '完成' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item my-channel"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        @click="deleteOrJump(channel, index)"
      >
        <van-icon
          v-if="!isEditChange && index !== 0"
          name="clear"
          slot="icon"
        />
        <div slot="text" class="text" :class="{ active: index === active }">
          {{ channel.name }}
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="channel">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item recommend-channel"
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utiles/storage'
export default {
  name: 'articleEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEditChange: true
    }
  },
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  computed: {
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => mychannel.id === channel.id)
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toash('获取数据失败')
      }
    },
    async addChannel(channel) {
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.myChannels.push(channel)
          this.$toast('添加频道成功')
        } catch (err) {
          this.$toast('添加频道失败，请稍后重试')
        }
      } else {
        this.myChannels.push(channel)
        setItem('USER_CHANNELS', this.myChannels)
      }
    },
    editMyChannels() {
      this.isEditChange = !this.isEditChange
    },
    async deleteOrJump(channel, index) {
      if (this.isEditChange) {
        this.$emit('update-active', index, false)
      } else {
        if (index === 0) return
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannels(channel)
      }
    },
    async deleteChannels(channel) {
      if (this.user) {
        try {
          await deleteUserChannel(channel.id)
          this.$toast('删除频道成功')
        } catch (err) {
          this.$toast('删除失败，请稍后重试')
        }
      } else {
        setItem('USER_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.article-edit {
  padding: 85px 0;
  .channel {
    color: #333;
    font-size: 32px;
  }
  .edit-btn {
    width: 106px;
    height: 50px;
    padding: 0 20px;
    .van-button__text {
      font-size: 28px;
      color: #f85959;
    }
  }

  /deep/ .grid-item {
    white-space: nowrap;
    .van-grid-item__content {
      flex-direction: row;
      width: 160px;
      height: 86px;
      background-color: #f4f5f6;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        color: #cecece;
        z-index: 2;
        font-size: 30px;
      }
      .active {
        color: red !important;
      }
      .van-grid-item__text,
      .text {
        margin-top: 0;
        margin-left: 6px;
        font-size: 28px;
        color: #222;
      }
      .van-icon-plus {
        font-size: 24px;
        color: #222;
      }
    }
  }
}
</style>
