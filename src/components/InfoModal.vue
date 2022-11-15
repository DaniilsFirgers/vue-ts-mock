<template>
  <div class="main-info">
    <main>
      <p>Data is retrieved from OpenWeatherMap</p>
      <p>
        First search for a weather forecast using coordinates. Then you will be
        able to download it in XLSM format.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

const props = defineProps({
  msg: {
    type: String,
  },
  showModal: {
    type: Boolean,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-info {
  position: absolute;
  left: 55px;
  top: 45px;
  z-index: 9999 !important;
  width: 200px;
  color: white;
  height: fit-content;
  border: solid blue 2px;
  background-color: cadetblue;
}
</style>
