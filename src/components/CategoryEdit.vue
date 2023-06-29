<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select v-model="this.state.current" ref="select">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="state.title"
            :class="{ invalid: v$.title.$dirty && v$.title.required.$invalid }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.$invalid"
            >TITLE</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="state.limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.$invalid }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.$invalid"
          >
            LIMIT
          </span>
        </div>
        <div class="row">
          <div class="col s6">
            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </div>

          <div class="col s6">
            <button class="btn waves-effect waves-light" type="button" @click="deleteHandler">
              Удалить
              <i class="material-icons right">delete</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "vuelidate/lib/validators";
import { remove } from 'firebase/database';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.state.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    this.state.select.destroy();
  },
  watch: {
    "state.current"(categoryID) {
      const { title, limit } = this.categories.find((c) => c.id === categoryID);
      this.state.title = title;
      this.state.limit = limit;
      this.state.current = categoryID;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.state.current = id;
    this.state.title = title;
    this.state.limit = limit;
  },
  setup() {
    const state = reactive({
      title: "",
      limit: 1,
      current: null,
    });
    const rules = {
      title: { required },
      limit: { minValue: minValue(1) },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        await this.$store.dispatch("updateCategory", this.state);
        this.$message(
          `Категория &nbsp;<b>${this.state.title}</b>&nbsp; обновлена`
        );
        this.$emit("updated", this.state);
      } catch (error) {}
    },
    async deleteHandler() {
      try {
        await this.$store.dispatch("removeCategory", this.state.current);
        this.$message(
          `Категория &nbsp;<b>${this.state.title}</b>&nbsp; удалена`
        );
        this.$emit("updated", this.state , remove);
      } catch (error) {console.log(error)}
    },
  },
};
</script>
