
<template >

    <div class="flex items-center justify-center mt-10">
    <div class="max-w-sm rounded overflow-hidden shadow-lg ">
        <h1>Task</h1>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{ task.name }}</div>
    <p class="text-gray-700 text-base">
     {{ task.description }}
    </p>
    <p class="text-gray-700 text-base">
        {{ task.date }}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    <button @click.prevent="onsubmit()">Delete</button>
  </div>
</div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { defineProps, onMounted } from "vue";

const id= ref('')

const task = ref('')

   const requestOptions = {
    method: "GET",
    headers: { 'Authorization':  localStorage.getItem('tocken') }
  };    
  console.log(id)
  fetch("http://localhost:3000/tasks/task/1", requestOptions)
  .then(async response => {
    const taskresponse=await response.json()
    console.log(taskresponse)
    task.value= taskresponse.task
  })




  const onsubmit= () => {

    const requestOptions = {
    method: "DELETE",
    headers: { 'Authorization':  localStorage.getItem('tocken') }
  };  


    fetch("http://localhost:3000/tasks/task/1", requestOptions)
  .then(async response => {
    const taskresponse=await response.json()
    console.log(taskresponse)
    task.value= taskresponse.task
  })
  
  
  
  }
</script>