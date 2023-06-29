<template>
  <nav class="navbar teal lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('navClick')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text " >{{ currentDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="drop"
          >
            {{userName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentDate: null,
      interval: null,
      dropdown: null,
      options: {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      const date = new Date();
      return this.currentDate = date.toLocaleDateString("ru-RU",  this.options);
    }, 1000);
    M.Dropdown.init(this.$refs.drop, {});
  },
  computed:{
    userName(){
      return this.$store.getters.info.name
    }
  },
  methods: {
   async logout() {
     await this.$store.dispatch('logout')
     await this.$router.push("/login?message=logout");

    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  
};
</script>
