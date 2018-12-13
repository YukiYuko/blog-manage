import {getDate} from '../libs/tools'
export default {
  methods: {
    getDate,
    go ({name, params, query}) {
      this.$router.push({
        name,
        params,
        query
      })
    }
  }
}
