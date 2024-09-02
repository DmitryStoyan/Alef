<script setup>
import { ref, onMounted } from 'vue'
import BaseInput from './UI/BaseInput.vue'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

const parentName = ref(userStore.user.fullName)
const parentAge = ref(userStore.user.age)

const updateUser = () => {
  userStore.setUser({
    fullName: parentName.value,
    age: parentAge.value
  })
}

onMounted(() => {
  userStore.loadUserData();
  parentName.value = userStore.user.fullName
  parentAge.value = userStore.user.age
})
</script>

<template>
  <section class="Personal-data">
    <h1 class="title">Персональные данные</h1>
    <div class="input-container">
      <BaseInput v-model="parentName" label="Имя" id="parentName" @update:modelValue="updateUser" />
      <BaseInput v-model="parentAge" label="Возраст" id="parentAge" type="number" @update:modelValue="updateUser" />
    </div>
  </section>
</template>


<style scoped>
.title {
  font-family: Montserrat;
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: 24px;
  color: var(--text-color);
  margin: 0 0 20px 0;
}

.input-container {
  display: grid;
  row-gap: 10px;
}
</style>
