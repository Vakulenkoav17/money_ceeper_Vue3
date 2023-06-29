<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name" type="text" 
          v-model="state.title" 
          :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid"
          v-if="v$.title.$dirty && v$.title.required.$invalid"

          >Введите название</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number"
           v-model.number="state.limit" 
           :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"

           />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid"
          v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"

          >Минимальный лимит 1 руб
          </span>

          
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  mounted(){
    M.updateTextFields()
  },
  setup() {
    const state = reactive({
      title: "",
      limit: 1,
      
    });
    const rules = {
      title: { required },
      limit: { minValue: minValue(1) },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods:{
    async submitHandler(){
      if(this.v$.$invalid){
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory',{
        title: this.state.title,
        limit: this.state.limit
      })
      this.$message(`Категория &nbsp;<b>${category.title}</b>&nbsp; создана` )
      this.state.title = ''
      this.state.limit = 1
      this.v$.$reset()
      this.$emit('created', category)
    } catch (error) {}
    }
  }
};
</script>
