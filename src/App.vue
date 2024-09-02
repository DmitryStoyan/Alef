<script setup>
import Header from '@/components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <div>
    <Header />
    <div class="content-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
