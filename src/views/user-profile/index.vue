<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="个人信息"
    />
    <input type="file" ref="file" @change="onAvatarChange" hidden />
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdateNameShow = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdateGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      :value="user.birthday"
      is-link
    />
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isUpdateNameShow"
        @input="user.name = $event"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <van-popup
      v-if="isUpdateGenderShow"
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
        @input="user.gender = $event"
      />
    </van-popup>
    <van-popup
      v-if="isUpdateBirthdayShow"
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <van-popup
      v-if="isUpdatePhotoShow"
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        @update-avatar="user.photo = $event"
        :img="avatarImage"
        @close="isUpdatePhotoShow = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdateAvatar from './components/update-avatar'

export default {
  name: 'userProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      avatarImage: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('获取个人信息失败')
      }
    },
    onAvatarChange() {
      const img = this.$refs.file.files[0]
      this.avatarImage = window.URL.createObjectURL(img)

      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #eee;
  }
}
</style>
