<script setup lang="ts">
import Navbar from './components/globals/Navbar.vue'
import Footer from './components/globals/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div>
      <Navbar />
    </div>
    <div class="flex-grow bg-slate-100">
      <RouterView />
    </div>
  </div>
  <div>
    <Footer />
  </div>
</template>

<style scoped></style>
