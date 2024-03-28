<template>
    <div id="form" class=" flex items-center justify-center mt-10 ">
       
       <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="onsubmit()">
         <h1 class="mb-6">Register</h1>
       
            <div class="mb-4">
           <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
             Name
           </label>
           <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" >
           </div>

           <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="surname">
             surname
           </label>
           <input v-model="surname"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text" placeholder="surname" >
           </div>

           <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
             email
           </label>
           <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" >
           </div>

         <div class="mb-6">
           <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
             Password
           </label>
           <input v-model="password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" >
           <p class="text-red-500 text-xs italic">Please choose a password.</p>
         </div>

         <div class="flex items-center justify-between">
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" id="button">
             Register
           </button>
        
         </div>
         <div v-if=" user.status == 'success'" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div  class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Usuario registrado</p>
                 
                </div>
              </div>
          </div>

          <div v-if=" user.status == 'error'" role="alert">
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Danger
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Error al crear al usuario</p>
              </div>
          </div>
        
       </form>
     
     </div>
     <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-indigo-100 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">

<ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-indigo-700 dark:text-gray-400 sm:mt-0 "> 
    <li>
        <a target="_blank" href="https://pedromr78.com/" class="hover:underline  me-4 md:me-6 text-indigo-700">About me</a>
    </li>
    <li>
        <a target="_blank" href="https://www.linkedin.com/in/pedro-montero-rodriguez/"  class="hover:underline me-4 md:me-6 text-indigo-700" >Linkdn</a>
    </li>
    <li>
        <a target="_blank " href="https://github.com/Pedromr78"  class="hover:underline me-4 md:me-6 text-indigo-700" >Github</a>
    </li>
</ul>
<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a target="_blank" href="https://pedromr78.com/" class="hover:underline">pedromr78.com™</a>. All Rights Reserved.
</span>
</footer>
</template>
<script setup lang="ts">
import {ref} from 'vue'


const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')

const user: any = ref('');

const onsubmit= () => {
  const form= {
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value
  }
 
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  };
  fetch("http://localhost:3000/users/register", requestOptions)
    .then(response => response.json())
    .then(data => (user.value = data));
 
    
}
  

</script>