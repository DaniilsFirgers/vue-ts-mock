<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div class="map">
      <p>{{ currentTime.toLocaleString() }}</p>
      <h1>aaaaa</h1>
    </div>
  </nav>
  <router-view />
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
const currentTime = ref(new Date());
const updateCurrentTime = () => {
  currentTime.value = new Date();
};
const updateTimeInterval = setInterval(updateCurrentTime, 1000);
onBeforeUnmount(() => {
  clearInterval(updateTimeInterval);
});
</script>

<style></style>
