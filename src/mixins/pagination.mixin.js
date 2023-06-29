import _ from 'lodash'

export default{
  name:'paginationMixin',
  data(){
    return{
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount:0,
      allItems: [],
      items: []
    }    
  },
  
  methods: {
    setupPagination(allItems){ 
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    paginateHandler(page){
      this.items = this.allItems[page - 1] || this.allItems[0]
      this.$router.push(  page === 1 ? `/history`: `${this.$route.path}?page=${page}`)
    }
  }
}