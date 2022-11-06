<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-show="showElement">Visible only three seconds</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

const weatherData = ref({});
const requestError = ref({});
const loadingIconDiv = ref<boolean>(true);

interface WeatherForecast {
  cod: String;
  city: City;
  message: Number;
  cnt: Number;
  list: List[];
}

interface City {
  coord: Coord;
  country: string;
  id: number;
  name: String;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain?: Rain;
  sys: Sys;
  visibility: number;
  pop: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  h: string;
}

interface Sys {
  pod: string;
}

async function fetchData() {
  await axios
    .get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=56.946&lon=24.10589&appid=e3f9a6c2b88332ca04725bd27f037716"
    )
    .then((response) => {
      const data: WeatherForecast = response.data;
      weatherData.value = data;
      console.log("data", weatherData.value);
    })
    .catch((err) => {
      console.log(err);
      requestError.value == err;
    });
}

function loadingIcon() {
  setTimeout(() => {
    loadingIconDiv.value = false;
    console.log("aaaS");
  }, 3000);
  console.log(loadingIconDiv.value);
}

export default defineComponent({
  name: "WeatherData",
  data() {
    return { showElement: loadingIconDiv.value };
  },
  methods: {},
  setup() {
    fetchData();
    loadingIcon();
  },
  mount() {},
});
</script>

<style></style>
