<template>
  <NewsDetail :isEdit="false"></NewsDetail>
</template>
<script>
import NewsDetail from './news_detail'
export default {
  name: 'news_publish',
  components: {
    NewsDetail
  }
}
</script>
<style lang="less">
</style>
