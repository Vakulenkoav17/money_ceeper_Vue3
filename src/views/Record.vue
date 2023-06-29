<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="state.loading" />

    <p class="center" v-else-if="!state.categories.length">
      Категорий пока нет <br>
      <router-link to="/categories"> Создать категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="state.category">
          <option v-for="c in state.categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="state.operType"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="state.operType"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="state.amount"
          :class="{ invalid: v$.amount.$dirty && v$.amount.$invalid }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && v$.amount.$invalid"
          >Минимальное значение : 1</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="state.description"
          :class="{ invalid: v$.description.$dirty && v$.description.$invalid }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && v$.description.$invalid"
          >Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, nextTick } from "vue";
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "vuelidate/lib/validators";


export default {
  name: "record",
  setup() {
    const state = reactive({
      loading: true,
      categories: [],
      select: null,
      category: null,
      operType: "outcome",
      amount: 1,
      description: "",
    });
    const rules = {
      description: { required },
      amount: { minValue: minValue(1) },
    };
    const options = {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

    const v$ = useVuelidate(rules, state);

    return { state, v$, options };
  },
  async mounted() {
    this.state.categories = await this.$store.dispatch("fetchCategories");
    this.state.loading = false;
    nextTick(() => {
      this.state.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    });

    if (this.state.categories.length) {
      this.state.category = this.state.categories[0].id;
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.state.operType === "income") {
        return true;
      }
      return this.info.bill >= this.state.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          const date = new Date().toLocaleDateString("ru-RU",  this.options)
          await this.$store.dispatch("createRecord", {
            categoryID: this.state.category,
            amount: this.state.amount,
            description: this.state.description,
            type: this.state.operType,
            date: date,
          });

          const bill =
            this.state.operType === "income"
              ? this.info.bill + this.state.amount
              : this.info.bill - this.state.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись добавлена");

          this.v$.$reset();
          this.state.amount = 1;
          this.state.description = "";
        } catch (error) { throw error}
      } else {
        this.$error(
          `Нехватает ${this.state.amount - this.info.bill} руб. на счете  `
        );
      }
    },
  },
};
</script>
