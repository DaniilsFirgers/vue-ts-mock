<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface WeatherForecast {
  cod: String;
  message: Number;
  cnt: Number;
  list: List[];
}
interface List {
  dt: number;
}

export default defineComponent({
  name: "WeatherData",
  data() {
    return {
      info: null,
    };
  },
  methods: {
    async fetchData() {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast?lat=56.946&lon=24.10589&appid=e3f9a6c2b88332ca04725bd27f037716"
      );
      console.log(response);
    },
  },
  async mounted() {
    this.fetchData();
  },
});
</script>

<style></style>
