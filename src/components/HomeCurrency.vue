<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
            </tr>
          </thead>

          <tbody>
            <tr 
            v-for="cur of currencies"
            :key="cur"
            >
              <td>{{this.rates[cur].code}}</td>
              <td>{{(this.rates["RUB"].value/this.rates[cur].value).toFixed(3)}}</td>
              <td>{{this.$store.currentDate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['rates'],
  data: () => ({
    currencies: ["USD", "EUR", "GEL"],
  }),
}
</script>