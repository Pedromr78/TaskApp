import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import tasks from "../components/tasks.vue";
import addtasks from "../components/addtask.vue";
import task from "../components/task.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: tasks,
  },
  {
    path: "/addtask",
    name: "addtasks",
    component: addtasks,
  },
  {
    path: "/task/:id",
    name: "task",
    component: task,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;