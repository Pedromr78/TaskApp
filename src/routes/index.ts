import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import Calendar from "../components/Calendar.vue";
import Home from "../components/Home.vue";
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
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },  
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
   {
    path: "/",
    name: "home",
    component: Home,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;