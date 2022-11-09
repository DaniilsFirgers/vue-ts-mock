<template>
  <div class="main">
    <div class="weather-info">
      <form class="submit-form" id="weather-data-submit">
        <label for="lat">Latitude</label>
        <input
          type="text"
          id="lat"
          class="weather-input-field"
          v-model="latitudeInput"
        />
        <label for="lon">Longitude</label>
        <input
          type="text"
          id="lon"
          class="weather-input-field"
          v-model="longitudeInput"
        />
        <button
          type="button"
          class="weather-submit-button"
          value="Submit"
          form="weather-data-submit"
          @click="submitForm"
        >
          Submit
        </button>
      </form>

      <div></div>
      <div v-show="loadingIconDiv" class="loading-icon"></div>
      <div v-for="(item, index) in weatherData" :key="index">
        <h1>{{ item.datetime }}</h1>
      </div>
    </div>
    <div class="map">
      <h1>aaaaa</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";

let latitudeInput = ref();
let longitudeInput = ref();

var errorSound = new Audio("/audio/error_sound.mp3");

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

const submitForm = async () => {
  await axios
    .get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat: latitudeInput.value,
        lon: longitudeInput.value,
        appid: "e3f9a6c2b88332ca04725bd27f037716",
      },
    })
    .then((response) => {
      const data: WeatherForecast = response.data;
      console.log("response: ", data);
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

      longitudeInput.value = null;
      latitudeInput.value = null;
    })
    .catch((err) => {
      console.log(err);
      requestError.value == err;
      errorSound.play();
    });
};

const loadingIcon = () => {
  setTimeout(() => {
    loadingIconDiv.value = false;
  }, 3000);
};

onMounted(() => {
  loadingIcon();
});
watch(latitudeInput, (newValue) => {
  latitudeInput.value = newValue;
});

watch(longitudeInput, (newValue) => {
  longitudeInput.value = newValue;
});
</script>

<style>
.main {
  display: flex;
  flex-direction: row;
}
.weather-info {
  width: 50%;
}
.map {
  flex-grow: 1;
}
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
  width: 5vw;
  height: 2wh;
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
