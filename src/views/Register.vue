<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="state.email"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.$invalid) ||
              (v$.email.$dirty && v$.email.required.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="
            (v$.email.$dirty && v$.email.$invalid) ||
            (v$.email.$dirty && v$.email.required.$invalid)
          "
        >
          {{ "Введите корректный E-mail" }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="state.password"
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.minLength.$invalid) ||
              (v$.password.$dirty && v$.password.required.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          {{
            `Пароль содержит меньше ${v$.password.minLength.$params.min} символов`
          }}
        </small>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          {{ `Введите пароль` }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="state.name"
          :class="{
            invalid:
              (v$.name.$dirty && v$.name.minLength.$invalid) ||
              (v$.name.$dirty && v$.name.minLength.$invalid),
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          {{ "Введите мия" }}
        </small>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.minLength.$invalid"
        >
          {{
            `Минимальная длинна имени ${v$.name.minLength.$params.min} символа`
          }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="false"
          @click="registration"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  setup() {
    const state = reactive({
      password: "",
      email: "",
      name: "",
    });
    const rules = {
      password: { required, minLength: minLength(6) },
      email: { required, email },
      name: { required, minLength: minLength(2) },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    async registration() {

      if (this.v$.$invalid) {
        this.v$.$touch();
        return
      }
      try {
        await this.$store.dispatch("register", this.state);
        this.$router.push('/')
      } catch (error) {console.log(error)}  
    },
  },
};
</script>
