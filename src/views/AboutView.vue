<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-show="loadingIconDiv" class="loading-icon"></div>
    <div v-for="(item, index) in weatherData" :key="index">
      <h1>{{ item.datetime }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

let weatherData = ref<
  {
    datetime: number;
    temperature: number;
    clouds: number;
    windSpeed: number;
    humidity: number;
  }[]
>([]);
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

const fetchData = async () => {
  await axios
    .get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=56.946&lon=24.10589&appid=e3f9a6c2b88332ca04725bd27f037716"
    )
    .then((response) => {
      const data: WeatherForecast = response.data;
      const arrayOfHourlyData = data.list;

      var arrayOfWeatherObjects: any = [];

      arrayOfHourlyData.forEach((el) => {
        const weatherObject = {
          datetime: el.dt,
          temperature: el.main.temp,
          clouds: el.clouds,
          windSpeed: el.wind.speed,
          humidity: el.main.humidity,
        };
        arrayOfWeatherObjects.push(weatherObject);
      });
      weatherData.value = arrayOfWeatherObjects;
      console.log("data", weatherData.value);
    })
    .catch((err) => {
      console.log(err);
      requestError.value == err;
    });
};

const loadingIcon = () => {
  setTimeout(() => {
    loadingIconDiv.value = false;
  }, 3000);
};

// export default defineComponent({
//   name: "WeatherData",
//   data() {
//     return {
//       showElement: loadingIconDiv,
//       data: {} as WeatherForecast,
//     };
//   },
//   methods: {},
//   setup() {
//     // loadingIcon();
//     // fetchData();
//   },
// });
onMounted(() => {
  loadingIcon();
  fetchData();
});
</script>

<style>
.loading-icon {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
