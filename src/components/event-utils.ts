import { EventInput } from '@fullcalendar/core'
import axios from 'axios';



// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// const INITIAL_EVENT: EventInput[] = [

// ]
//   let token= localStorage.getItem('tocken')
//   if(token){
// const data: any = await axios.get('http://localhost:3000/tasks',{
//   headers: {
//     Authorization :  localStorage.getItem('tocken'),
//   }
// })
//  let tasks= data.data.tasks
// for(var i =0; i< tasks.length; i++ )
// {
//   tasks[i].date= tasks[i].date.split("-").reverse().join("-");
//   tasks[i].title= tasks[i].name
//   tasks[i].id=  tasks[i].ID

//   INITIAL_EVENT.push(tasks[i]);
// }
// }
// export const INITIAL_EVENTS= INITIAL_EVENT





export async function reload(){
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
}

export function createEventId() {
  return String(eventGuid++)
}
