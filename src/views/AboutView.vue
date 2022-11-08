<template>
  <div class="about">
    <form class="submit-form">
      <label for="lat">Latitude</label>
      <input type="text" id="lat" class="weather-input-field" />
      <label for="lon">Longitude</label>
      <input type="text" id="lon" class="weather-input-field" />
      <input type="submit" value="Submit" class="weather-submit-button" />
    </form>

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
.submit-form {
  border: solid 2px blue;
  width: 20vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.weather-submit-button {
  border: 1px;
  width: 40%;
  border-radius: 5px;
  border-color: black;
  background-color: blue;
  color: white;
  box-shadow: 0 8px 16px 0 rgba(3, 138, 255, 0.55),
    0 6px 20px 0 rgba(3, 138, 255, 0.49);
}

.weather-input-field {
  background-color: lightgrey;
  border-radius: 5px;
}
</style>
