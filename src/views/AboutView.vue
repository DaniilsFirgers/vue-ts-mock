<template>
  <div class="main">
    <div class="weather-info">
      <div
        @mouseover="handleMouseOverInfo"
        @mouseleave="handleMouseLeaveInfo"
        class="hover-info-button"
      >
        INFO
      </div>
      <component :is="infoModalState ? InfoModal : null" />
      <div class="submit-form-component">
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
      </div>

      <div></div>
      <div v-show="loadingIconDiv" class="loading-icon"></div>
      <div v-show="requestError" class="request-error">Oops, error</div>
      <ul
        v-for="(item, index) in weatherData"
        :key="index"
        v-if="!requestError"
        class="forecast-interval-data"
      >
        <li>
          Date: {{ moment(item.datetime * 1000).format("DD/MM/YYYY HH:mm:ss") }}
        </li>
        <li>
          Temperature:
          {{ Math.round((item.temperature - 273.15) * 10) / 10 }}
        </li>
      </ul>
    </div>
    <div class="map">
      <h1>aaaa</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import moment from "moment";
import InfoModal from "../components/InfoModal.vue";

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
const requestError = ref<boolean>(false);
const loadingIconDiv = ref<boolean>(true);
const infoModalState = ref<boolean>(false);

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

      requestError.value = false;

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
      console.log(requestError);

      longitudeInput.value = null;
      latitudeInput.value = null;
    })
    .catch((err) => {
      console.log(err);
      requestError.value = true;
      console.log(requestError);
      errorSound.play();
    });
};

const loadingIcon = () => {
  setTimeout(() => {
    loadingIconDiv.value = false;
  }, 3000);
};

const handleMouseOverInfo = () => {
  infoModalState.value = true;
};
const handleMouseLeaveInfo = () => {
  infoModalState.value = false;
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
  z-index: 1;
  border: solid 2px blue;
  width: 20vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.submit-form-component {
  z-index: 1 !important;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.weather-submit-button {
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
.forecast-interval-data {
  margin: 5px;
  border: solid 2px blue;
}
.weather-info > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hover-info-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #4169e1;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
