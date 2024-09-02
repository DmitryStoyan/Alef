<script setup>
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

onMounted(() => {
  userStore.loadUserData()
})

const userData = computed(() => userStore.user)
const childrenData = computed(() => userStore.isChildrenSaved ? userStore.children : []);

onMounted(() => {
  userStore.loadUserData();
});
</script>

<template>
  <section class="preview">
    <h1 class="title">Персональные данные</h1>
    <h2 v-if="userData.fullName || userData.age" class="user-info">{{ userData.fullName }}, {{ userData.age }} лет</h2>
    <h2 v-else class="user-info">Заполните ФИО</h2>
    <div v-if="childrenData.length > 0">
      <h2 class="subtitle">Дети</h2>
      <ul class="child-list">
        <li v-for="(child, index) in childrenData" :key="index" class="child-item">
          <span class="child-text">{{ child.name }}, {{ child.age }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="user-info">Нет данных о детях.</p>
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
}

.user-info {
  font-family: Montserrat;
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: 24px;
  color: var(--text-color);
  margin: 30px 0 0 0;
}

.subtitle {
  font-family: Montserrat;
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: 24px;
  margin: 60px 0 20px 0;
}

.child-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  list-style-type: none;

}

.child-item {
  background-color: #F1F1F1;
  border-radius: 5px;
  padding: 10px 20px;
}

.child-text {
  font-family: Montserrat;
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: 24px;
  color: #000000;
}
</style>
