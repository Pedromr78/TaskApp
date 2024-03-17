<template>
    <div id="form" class=" flex items-center justify-center mt-10 ">
       
       <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="onsubmit()">
         <h1 class="mb-6">Add Task</h1>
       
            <div class="mb-4">
           <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
             Name
           </label>
           <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" >
           </div>

           <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
             Description
           </label>
           <input v-model="description"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="description" >
           </div>

           <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
             Date
           </label>
           <input v-model="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="text" placeholder="date" >
           </div>


         <div class="flex items-center justify-between">
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" id="button">
             Register
           </button>
        
         </div>
         <div v-if=" task.status == 'success'" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div  class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Usuario registrado</p>
                 
                </div>
              </div>
          </div>

          <div v-if=" task.status == 'error'" role="alert">
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Danger
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Error al crear al usuario</p>
              </div>
          </div>
        
       </form>
     
     </div>

</template>
<script setup lang="ts">
import {ref} from 'vue'


const name = ref('')
const description = ref('')
const date = ref('')


const task = ref('');

const onsubmit= () => {
    
  const form= {
    name: name.value,
    description: description.value,
    date: date.value,
    status: 'succes'
 
  }
 
  const requestOptions = {
    method: "POST",
    headers: { 'Authorization':  localStorage.getItem('tocken'),
    "Content-Type": "application/json"
},
    body: JSON.stringify(form)
  };
  fetch("http://localhost:3000/tasks/task", requestOptions)
  .then(async response => {
    const taskresponse= await response.json()

    task.value=taskresponse
  })
 

}
  

</script>