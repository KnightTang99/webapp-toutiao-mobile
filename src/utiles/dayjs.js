import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)
Vue.filter('relativeTime', dataTime => {
  return dayjs().to(dayjs(dataTime))
})
Vue.filter('getStr', str => {
  return '<span class="active">qqq</span>'
})
