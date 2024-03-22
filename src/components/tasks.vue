<template>
  <h1>TASKS</h1>

  <div class="mt-10" v-for="task in tasks">
    <h1><router-link to="/task/1">{{ task.name + " " + task.date }}</router-link></h1>

   
  
  </div>




</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';




export default defineComponent({
  props: {

  }, data() {
    return {
      tasks: '',
      tocken: localStorage.getItem('tocken'),
      
    }
  },
  mounted() {

    this.getTasks()
  },
  methods: {
    async getTasks() {
     
      const data: any = await axios.get('http://localhost:3000/tasks',{
        headers: {
          Authorization : this.tocken 
        }
      })
      console.log(data.data);
      this.tasks= data.data.tasks
    }

  }

})



</script>