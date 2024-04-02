<script lang='ts'>
import { defineComponent } from 'vue'
import { CalendarOptions, EventApi} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { reload } from './event-utils'
import axios from 'axios';
import { EventInput } from '@fullcalendar/core'

// import { EventInput } from '@fullcalendar/core'


export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      
      tasks: {},
      time: 0,
      error:'',
      tocken: localStorage.getItem('tocken'),
      id: '',
      arg: {
        dateStr:''
      },
      name: '',
      description: '',
      task: {
        name: '',
        date: '',
        description: '',
        ID: '',
        status: ''

      },
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: this.reload,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        dateClick: this.handleDateClick,
        // eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    }
  },

  mounted: function () {
    //   this.time = setInterval(() => {
    //     this.calendarOptions.events= reload;
    //     // console.log("me hago" + this.calendarOptions.events)
    // }, 1000)

    this.getTasks()

  },

  methods: {
   async reload(){
  const INITIAL_EVENTS: EventInput[] = [

  ]
  
  let token= localStorage.getItem('tocken')
  if(token){
const data: any = await axios.get('http://localhost:3000/tasks',{
  headers: {
    Authorization :  localStorage.getItem('tocken'),
  }
})
 let tasks= data.data.tasks
for(var i =0; i< tasks.length; i++ )
{
  tasks[i].date= tasks[i].date.split("-").reverse().join("-");
  tasks[i].title= tasks[i].name
  tasks[i].id=  tasks[i].ID

  INITIAL_EVENTS.push(tasks[i]);
}
}
  return INITIAL_EVENTS;
},
    close() {
      const ermerg:any = document.getElementById('emerg');
      ermerg.style.display = 'none';
    },
    async ondelete(id: number) {


     await axios.delete('http://localhost:3000/tasks/task/' + id, {
        headers: {
          Authorization: this.tocken
        }

      })
      let calendarApi =   this.$refs['fullCalendar']as any
      calendarApi.getApi().refetchEvents()

      this.getTasks();




    },
    async getTasks() {

      const data: any = await axios.get('http://localhost:3000/tasks', {
        headers: {
          Authorization: this.tocken
        }
      })


      const all= data.data.tasks
      for (var i in all) {
        all
        all[i].date = all[i].date.split("-").reverse().join("-");
      }
      
      this.tasks = all;


    },
    update(){
      var datechanged = this.arg.dateStr.split("-").reverse().join("-");
      const form = {
        name: this.name,
        description: this.description,
        date: datechanged,
        status: 'succes'
      }
      const requestOptions:any = {
        method: "PUT",
        headers: {
          'Authorization': localStorage.getItem('tocken'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      };

      fetch("http://localhost:3000/tasks/task/"+this.id, requestOptions)
        .then(async response => {
          const taskresponse = await response.json()
          this.task = taskresponse
          // console.log(taskresponse)
        }).catch(error => {
          this.error=error
          this.task.status = 'error'
        })
        
        this.getTasks()
        let calendarApi =   this.$refs['fullCalendar']as any
      calendarApi.getApi().refetchEvents()
      let divtasks:any=document.getElementById('tasks')
      divtasks.style.display = '';
      let updateform:any=document.getElementById('updateform')
      updateform.style.display = 'none';
      this.name = '';
      this.description = '';
    },
    onsubmit() {
      var datechanged = this.arg.dateStr.split("-").reverse().join("-");
      const form = {
        name: this.name,
        description: this.description,
        date: datechanged,
        status: 'succes'

      }

      const requestOptions:any = {
        method: "POST",
        headers: {
          'Authorization': localStorage.getItem('tocken'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      };




      fetch("http://localhost:3000/tasks/task", requestOptions)
        .then(async response => {
          const taskresponse = await response.json()
          this.task = taskresponse

        }).catch(error => {
          this.error= error
          this.task.status = 'error'
        })


      this.getTasks()
      let calendarApi =   this.$refs['fullCalendar']as any
      calendarApi.getApi().refetchEvents()
      let divtasks:any=document.getElementById('tasks')
        divtasks.style.display = '';
        let divform:any=document.getElementById('form')
      divform.style.display = 'none';
      this.name = '';
      this.description = '';
    },
    showform() {
      let divtasks:any=document.getElementById('tasks')
      divtasks.style.display = 'none';
      let divform:any=document.getElementById('form')
      divform.style.display = '';
    },
    handleDateClick: function (arg:any) {
      this.arg = arg;
      let emerg:any=document.getElementById('emerg')
      emerg.style.display = '';
      let divtasks:any=document.getElementById('tasks')
      divtasks.style.display = '';
      let divform:any=document.getElementById('form')
      divform.style.display = 'none';

    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    },
    showUpdate(id: any) {
      this.id = id
      let divtasks:any= document.getElementById('tasks')
      divtasks.style.display = 'none';
      let divupdateform:any= document.getElementById('updateform')
      divupdateform.style.display = '';
    }
  },
  //   beforeDestroy() {
  //   clearInterval(this.time)
  // }
})

</script>

<template>

  <div class='demo-app'>

    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions' :events="calendarOptions.events" ref="fullCalendar">
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div id="emerg" class='emerg border-t border-gray-200 dark:border-gray-600' style="display: none;">
      <button @click="close()" style="float:left; margin: 1%;">x</button>
      <h2 class=""> {{ arg.dateStr }}</h2>

      <div id="tasks" class="p-5">

        <ol v-for="task in tasks">
          <li v-if="task['date'] == arg.dateStr">
            <h4><strong>{{ task['name'] }}</strong></h4>
            <p class="mt-3"> {{ task['description'] }}</p>

            <p class="mt-3"> <button @click.prevent="showUpdate(task['ID'])"
                class="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded">Update</button>

              <button @click.prevent="ondelete(task['ID'])"
                class="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded">Delete</button>
            </p>
          </li>
        </ol>

        <button @click.prevent="showform()"
          class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">+</button>
      </div>

      <div id="updateform" class=" flex items-center justify-center mt-10 " style="display: none;">

        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="update()">
          <h1 class="mb-6">Update Task</h1>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input v-model="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Name" type="text" placeholder="Name">
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea v-model="description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description" type="text" placeholder="Description"></textarea>
          </div>




          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" id="button">
              Update
            </button>

          </div>
          <div v-if="task.status == 'success'"
            class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg></div>
              <div>
                <p class="font-bold">Tarea Añadida</p>

              </div>
            </div>
          </div>

          <div v-if="task.status == 'error'" role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Danger
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Error al añadir tarea</p>
            </div>
          </div>

        </form>

      </div>




      <!--fORMULARIO ADD-->
      <div id="form" class=" flex items-center justify-center mt-10 " style="display: none;">

        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " @submit.prevent="onsubmit()">
          <h1 class="mb-6">Add Task</h1>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input v-model="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Name" type="text" placeholder="Name">
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea v-model="description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description" type="text" placeholder="Description"></textarea>
          </div>




          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" id="button">
              Add
            </button>

          </div>
          <div v-if="task.status == 'success'"
            class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg></div>
              <div>
                <p class="font-bold">Tarea Añadida</p>

              </div>
            </div>
          </div>

          <div v-if="task.status == 'error'" role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Danger
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Error al añadir tarea</p>
            </div>
          </div>

        </form>

      </div>
    </div>
  </div>
  <footer
    class="relative mt-5 bottom-0 left-0 z-20 w-full p-4 bg-indigo-100 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">

    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-indigo-700 dark:text-gray-400 sm:mt-0 ">
      <li>
        <a target="_blank" href="https://pedromr78.com/" class="hover:underline  me-4 md:me-6 text-indigo-700">About
          me</a>
      </li>
      <li>
        <a target="_blank" href="https://www.linkedin.com/in/pedro-montero-rodriguez/"
          class="hover:underline me-4 md:me-6 text-indigo-700">Linkdn</a>
      </li>
      <li>
        <a target="_blank " href="https://github.com/Pedromr78"
          class="hover:underline me-4 md:me-6 text-indigo-700">Github</a>
      </li>
    </ul>
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a target="_blank"
        href="https://pedromr78.com/" class="hover:underline">pedromr78.com™</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

h2 {
  color: rgb(99 102 241);
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  margin-top: 5%;
}

.demo-app {
  display: flex;
  position: relative;
  min-height: 50%;
  min-width: 75%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {

  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.emerg {
  right: 0;
  min-height: 100vh;
  position: absolute;
  height: 100%;
  min-width: 25%;
  z-index: 3;
  opacity: 1;

  background-color: rgb(231, 243, 253);
}

.demo-app-main {
  flex-grow: 1;
  margin-top: 3em;
  z-index: 1;
}

footer {
  z-index: 1;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
