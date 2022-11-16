<template>
  <nav class="nav-bar">
    <div class="nav-position left">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="clock">
      {{ currentTime.toLocaleTimeString() }}
    </div>
    <div class="nav-position right">
      <p>Hello</p>
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

<style>
.nav-bar {
  height: 30px;
  color: white;
  background-color: cornflowerblue;
  display: flex;
  flex-direction: row;
}
.nav-position {
  display: flex;
  width: 50%;
  flex-direction: row;
  border: solid 2px gray;
}
.nav-position.left {
  justify-content: center;
}
.clock {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px gray;
  width: 100px;
  border-left: 0;
  border-right: 0;
}
</style>
