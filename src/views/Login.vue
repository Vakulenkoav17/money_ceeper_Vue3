<template>
  <form class="card auth-card" @submit.prevent = "submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" 
        type="text" 
        v-model.trim="state.email" 
        :class="{invalid: v$.email.$dirty && v$.email.$invalid || v$.email.$dirty && v$.email.required.$invalid }"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" 
        v-if="(v$.email.$dirty && v$.email.$invalid || v$.email.$dirty && v$.email.required.$invalid) "
        >
       {{'Введите корректный E-mail'}}</small
        >
      </div>
      <div class="input-field">
        <input id="password" 
        type="password" 
        v-model.trim="state.password" 
        :class="{invalid: v$.password.$dirty && v$.password.minLength.$invalid || v$.password.$dirty && v$.password.required.$invalid }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.minLength.$invalid "
        >
          {{ `Пароль содержит меньше ${v$.password.minLength.$params.min} символов` }}
        </small>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid "
        >
          {{ `Введите пароль` }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            @click="login"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register" >Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import { reactive } from "vue"; 
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = {
      email: { required, email }, 
      password: { required, minLength: minLength(5) }, 
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    async login() {
      if(this.v$.$invalid){
        this.v$.$touch()
        return
      }
      try {
        await this.$store.dispatch('login', this.state)
        this.$router.push('/')
      } catch (error) {}
    },
  },
  mounted(){
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  }
};
</script>