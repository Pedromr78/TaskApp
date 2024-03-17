<template>
<h1>TASKS</h1>

    <div class="mt-10" v-for="task in tasks"><h1><router-link to="/task/1">{{ task.name + " " + task.date}}</router-link></h1></div>
   
    

</template>
<script setup lang="ts">
import { ref } from 'vue'


const tasks = ref('')


   const requestOptions = {
    method: "GET",
    headers: { 'Authorization':  localStorage.getItem('tocken') }
  };
  fetch("http://localhost:3000/tasks", requestOptions)
  .then(async response => {
    const tasksresponse=await response.json()
    console.log(tasksresponse)
    tasks.value= tasksresponse.tasks
  })
</script>