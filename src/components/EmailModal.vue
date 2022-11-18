<template>
  <div class="email-form-component" v-if="showModal"  >Aaaa</div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue';


const props = defineProps({
  showModal: {
    type: Boolean,
  },
});


</script>

<style>
.email-form-component {
  position: absolute;
  z-index: 4;
  width: 25%;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: black;
  color: white;
}
</style>
