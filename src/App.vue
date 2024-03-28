<script lang="ts">
import Menu from './components/menu.vue'
import Footer from './components/Footer.vue'
import { defineComponent } from 'vue';


export default defineComponent({
  components: {
    Menu,
    Footer
  },
  data() {
    return {
      user: '',
      timer: 0
    }
  },
  mounted: function () {

    this.timer = setInterval(() => {
      if (localStorage.user) {
        this.user = JSON.parse(localStorage.user)
        
      }
    }, 1000)
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = ''
      this.$router.push({ path: 'login' })

    },


  },
  beforeDestroy() {
  clearInterval(this.timer)
}

})
</script>

<template>
 <Menu/>

 <router-view></router-view>
<Footer/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
/* footer{
  position: absolute;
  bottom: 0;
} */
</style>
