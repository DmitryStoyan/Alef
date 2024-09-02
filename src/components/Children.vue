<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseInput from './UI/BaseInput.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js'

const router = useRouter()
const userStore = useUserStore()

const children = computed(() => userStore.children)
const maxChildren = 5;
const newChild = ref({ name: '', age: '' })

onMounted(() => {
  userStore.loadUserData();
})


const addChild = () => {
  if (children.value.length < maxChildren) {
    userStore.addChild({ ...newChild.value })
    newChild.value = { name: '', age: '' }
  }
}

const removeChild = (index) => {
  console.log('remove')
  children.value.splice(index, 1)
}


const saveData = () => {
  if (userStore.user.fullName.trim() === '' || userStore.user.age === '') {
    alert('Пожалуйста, заполните имя и возраст.')
    return
  }

  for (let i = 0; i < userStore.children.length; i++) {
    const child = userStore.children[i]
    if (child.name.trim() === '' || child.age === '') {
      alert(`Пожалуйста, заполните имя и возраст для ребенка ${i + 1}.`)
      return
    }
  }
  userStore.saveChildren();
  router.push('/preview')
}
</script>

<template>
  <section class="children">

    <div class="title-wrapper">
      <h1>Дети (макс. 5)</h1>
      <button v-if="children.length < maxChildren" class="btn add-button" @click="addChild"
        :disabled="children.length >= maxChildren">
        <svg class="add-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.13332 7.85555C1.50125 7.85555 0.988866 8.36794 0.988867 9C0.988867 9.63206 1.50126 10.1445 2.13332 10.1445L7.85544 10.1445L7.85545 15.8668C7.85545 16.4989 8.36784 17.0113 8.9999 17.0113C9.63196 17.0113 10.1444 16.4989 10.1444 15.8668L10.1443 10.1445L15.8667 10.1445C16.4988 10.1445 17.0112 9.63207 17.0112 9.00001C17.0112 8.36795 16.4988 7.85556 15.8667 7.85556L10.1443 7.85556L10.1443 2.13338C10.1443 1.50132 9.63195 0.988927 8.99989 0.988927C8.36783 0.988927 7.85544 1.50131 7.85544 2.13338L7.85544 7.85555L2.13332 7.85555Z"
            fill="currentColor" />
        </svg>
        Добавить ребенка
      </button>
    </div>

    <div v-for="(child, index) in children" :key="index" class="input-container">
      <BaseInput v-model="child.name" label="Имя" :id="'childName' + index" />
      <BaseInput v-model="child.age" label="Возраст" :id="'childAge' + index" />
      <button @click="removeChild(index)" class="delete-button">Удалить</button>
    </div>
    <button v-if="children.length > 0" @click="saveData" class="btn save-button">Сохранить</button>

  </section>
</template>

<style scoped>
.children {
  margin: 33px 0 0 0;
}

.input-container {
  display: flex;
  gap: 18px;
  margin: 0 0 30px 0;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 11px 0;
}

.delete-button {
  border: none;
  background: none;
  font-size: var(--font-size-medium);
  font-weight: 400;
  color: var(--primary-color);
  cursor: pointer;
  transition: color .3s ease-in-out;
}

.delete-button:hover {
  color: var(--secondary-color);
}

.btn {
  font-family: Montserrat;
  font-size: var(--font-size-medium);
  font-weight: 400;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
}

.add-button {
  border: 2px var(--primary-color) solid;
  color: var(--primary-color);
  background: none;
  display: flex;
  align-items: center;
  gap: 7.5px;
  transition: color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.add-button:hover {
  color: var(--secondary-color);
  border: 2px var(--secondary-color) solid;
}

.save-button {
  border: none;
  color: var(--background-color);
  background-color: var(--primary-color);
  transition: background-color 0.3s ease-in-out;
}

.save-button:hover {
  background-color: var(--secondary-color);
}
</style>
