
<template>
<Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
           
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4" v-if="user">
             
              <a class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined><router-link to="/tasks">Tasks</router-link></a>
              <a class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined><router-link to="/addtask">New task</router-link></a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
         

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4" v-if="!user">
             
              <a class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined><router-link to="/login">login</router-link></a>
              <a class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined><router-link to="/register">register</router-link></a>
            </div>
            <div class="flex space-x-4" v-if="user">
             
             <a class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined>{{ user.name }}</a>
             <button @click.prevent="onsubmit()" class="bg-gray-900 text-white:text-gray-300 hover : bg-gray-700 hover:text-white : rounded-md px-3 py-2 text-sm font-medium" aria-current="page" undefined >logout</button>
           </div>
          </div>
            </div>
          
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
       
      </div>
    </DisclosurePanel>
  </Disclosure>

</template>

<style scoped>

.read-the-docs {
  color: #888;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [

  { name: 'Tasks', href: '', current: false },
  { name: 'New task', href: '', current: false },
 
]
const users = [

  { name: 'login', current: false },
  { name: 'register', current: false },
 
]





defineProps<{ msg: string }>()

const count = ref(0)
const user = ref('')


user.value=JSON.parse(localStorage.getItem('user'))


const onsubmit= () => {
  localStorage.clear();
  window.location.href = "http://localhost:5173/login";
}


</script>
