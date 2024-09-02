import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    fullName: '',
    age: ''
  })

  const children = ref([])
  const isChildrenSaved = ref(false)

  const loadUserData = () => {
    const data = localStorage.getItem('userData')
    if (data) {
      const parsedData = JSON.parse(data)
      user.value = parsedData.user || { fullName: '', age: '' }
      children.value = parsedData.children || []
      isChildrenSaved.value = parsedData.isChildrenSaved || false
    }
  }

  watch(
    [user, children, isChildrenSaved],
    () => {
      const data = {
        user: user.value,
        children: children.value,
        isChildrenSaved: isChildrenSaved.value
      }
      localStorage.setItem('userData', JSON.stringify(data))
    },
    { deep: true }
  )

  const setUser = (data) => {
    user.value = data
  }

  const addChild = (child) => {
    if (children.value.length < 5) {
      children.value.push(child)
    }
  }

  const removeChild = (index) => {
    children.value.splice(index, 1)
  }

  const saveChildren = () => {
    isChildrenSaved.value = true
  }

  return {
    user,
    children,
    isChildrenSaved,
    setUser,
    addChild,
    removeChild,
    saveChildren,
    loadUserData
  }
})
