<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart" v-if="chartData && records.length">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет <br />
      <router-link to="/record"> Создать запись</router-link>
    </p>

    <section v-else>
      <table class="centered highlight">
        <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, idx) in items" :key="record.id">
            <td>{{ idx + 1 + (page - 1) * pageSize }}</td>
            <td>{{ record.amount }} р.</td>
            <td>{{ record.date }}</td>
            <td>{{ record.categoryName }}</td>
            <td>
              <span class="white-text badge" :class="[record.typeClass]">
                <i class="material-icons right">{{ record.typeArrow }}</i>
                {{ record.typeText }}
              </span>
            </td>
            <td>
              <button
                class="btn-small btn"
                @click="$router.push('/detail/' + record.id)"
              >
                <i class="material-icons" v-tooltip="'подробнее'"
                  >open_in_new</i
                >
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="center">
        <Paginate
          v-model="page"
          :pageCount="pageCount"
          :clickHandler="paginateHandler"
          prev-text="Назад"
          next-text="Вперед"
          container-class="center pagination waves-effect"
          page-class="waves-effect"
        />
      </div>
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import {  Doughnut } from "vue-chartjs";
import Chart from "chart.js/auto";
import colors from '@/utils/colors'


export default {
  name: "History",
  extends: Doughnut,
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: [],
      chartData: null,
    };
  },
  async mounted() {
    const categories = await this.$store.dispatch("fetchCategories");
    this.records = await this.$store.dispatch("fetchRecords");
    this.setup(categories);
    this.loading = false;
    this.$nextTick(() => {
      if (this.records.length) {
        this.renderChart();
      }
    });
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryID)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
            typeArrow:
              record.type === "income" ? "arrow_upward" : "arrow_downward",
          };
        })
      );

      this.prepareChartData(categories);
    },
    prepareChartData(categories) {
      this.chartData = {
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Сумма руб.",
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryID === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return  total ;
              }, 0);
            }),
            backgroundColor: colors,
          },
        ],
      };
    },
    renderChart() {
      const canvas = this.$refs.chartCanvas;
      const ctx = canvas.getContext("2d");
      this.renderChartJS(ctx, this.chartData);
    },
    renderChartJS(ctx, data) {
      new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>
