<!-- <template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" />
        <label for="email">Email</label>
        <small class="helper-text invalid"
        v-if="startValidation && !emailValidation"
        > {{`Введите корректный email ${emailValidation}`}} </small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="password" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
        v-if="startValidation && passwordValidation"
        >
          {{ `Пароль содержит меньше ${minPassLenghts} символов`  }}
        </small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" />
        <label for="name">Имя</label>
        <small class="helper-text invalid"
        v-if="startValidation && nameValidation"
        >
          {{ `Миниьальная длинна ${minNameLenghts} символа` }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
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

<script setup>
import { computed, ref } from 'vue';

const startValidation = ref(false)

const email = ref("")
const password = ref("")
const name = ref("")

const minPassLenghts = 6
const minNameLenghts = 2



function registration(){
  startValidation.value = true
 
}

const emailValidation =computed(() => {
   return startValidation? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) : null
})
const passwordValidation =computed(() => {
   return startValidation? password.value.length < minPassLenghts : null
})
const nameValidation =computed(() => {
   return startValidation? name.value.length < minNameLenghts : null
})
</script> -->
<template>
  
</template>
