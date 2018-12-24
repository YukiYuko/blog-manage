<template>
  <NewsDetail :isEdit="true" :id="id"></NewsDetail>
</template>
<script>
import NewsDetail from './news_detail'
export default {
  name: 'news_edit',
  data () {
    return {
      id: ''
    }
  },
  components: {
    NewsDetail
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.params.id
    next()
  }
}
</script>
<style lang="less">
</style>
