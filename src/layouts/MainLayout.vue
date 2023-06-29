<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @navClick="isOpen = !isOpen" />
      <Sidebar :value="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-if="this.$route.path !== '/record'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import messages from '@/utils/messages'

export default {
  name: "main-layout",
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  computed:{
    ifError(){
     return this.$store.getters.error
    }
  },
  watch:{
    ifError(fbError){
      this.$error(messages[fbError.code] || 'Что то пошло не так')
      console.log(fbError)
    }
  },
  components: {
    Navbar,
    Sidebar,
    Loader,
  },
};
</script>
