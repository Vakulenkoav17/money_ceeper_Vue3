<template>
    <div class="grey darken-1 empty-layout">
        <router-view />
    </div>
</template>

<script>
import messages from '@/utils/messages'
export default{
  computed:{
    ifError(){
     return this.$store.getters.error
    }
  },
  watch:{
    ifError(fbError){
      this.$error(messages[fbError.code] || 'Что то пошло не так')
      console.log(fbError.code)
    }
  }
}
</script>