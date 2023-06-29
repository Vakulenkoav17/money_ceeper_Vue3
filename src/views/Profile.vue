<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="changeName">
      <div class="input-field">
        <input
          id="description"
          type="text"
          :class="{ invalid: v$.name.$dirty && v$.name.required.$invalid }"
          v-model.trim="state.name"
        />
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          {{ `Введите имя` }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup() {
    const state = reactive({
      name: "",
    });
    const rules = {
      name: { required },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    async changeName() {
      if (this.v$.$invalid) {
        this.v$.$touch();

        return;
      }
      try {
        await this.$store.dispatch("updateInfo", { name: this.state.name });

        this.$message("Обновлено");
      } catch (error) {}
    },
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    this.state.name = this.info.name;
    this.$nextTick(() => {
      M.updateTextFields();
    });
  },
};
</script>
