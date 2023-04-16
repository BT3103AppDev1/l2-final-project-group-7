<template>
  <div class="Homepage-container" v-if="user">
    <div class="Sidebar">
      <SideBar />
    </div>

    <div class="Homepage-body">
      <div class="Homepage-title">
        <span class="Homepage-greeting-hellotext">Hello, let's get to work! <!-- {{ userDetails[0].username }}--></span>
        <div class="Homepage-date">
          <span class="Homepage-todaytext">Today</span>
          <span class="Homepage-datetext">{{currentDate()}}</span>
        </div>
      </div>

    
    <div class="Homepage-items">
      <div class="ToDoList">
        <ToDoList />
      </div>
      <div class="HomeCalendar">
        <HomeCalendar />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getUser } from '../components/SidebarAPI/userinfo.js';
import SideBar from "@/views/SideBar.vue";
import ToDoList from "@/components/ToDoList.vue";
import HomeCalendar from "@/components/HomeCalendar.vue"

export default {
  name: "HomePage",
  mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          
        } else {
          this.$router.push("/login")
        }
      })
    },
  data() {
    return {
      todaysdate: new Date().toLocaleString,
      //userDetails: getUser(),
      user: false
    }
  }, 
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  },
  components: {SideBar, ToDoList, HomeCalendar}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
  * {
    font-family: 'Josefin Sans', sans-serif;
  }
.Homepage-container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
  position: relative;
  overflow: hidden;
}
.Sidebar {
  max-width: 17%;
  flex: 1;
}
.Homepage-title {
  width: auto;
  display: flex;
  height: 7%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px 20px;
}
.Homepage-greeting {
  flex-direction: column;
  justify-content: flex-start;
}
.Homepage-todaytext {
  color: rgba(0, 0, 0, 1);
  font-size: 30px;
  font-style: Regular;
  text-align: center;
  font-family: Yeseva One;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.Homepage-date{
  flex-direction: row;
  justify-content: flex-start;
}
.Homepage-body{
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px 20px;
}
.Homepage-datetext {
  color: rgba(96, 96, 96, 1);
  font-size: 20px;
  align-self: auto;
  font-style: Regular;
  text-align: center;
  font-family: Yeseva One;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
  padding: 5%;
}

.Homepage-greeting-hellotext {
  color: rgba(0, 0, 0, 1);
  font-size: 50px;
  font-style: Regular;
  text-align: left;
  font-family: Yeseva One;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.ToDoList{
  margin-left: 5%;
  width: 32em;
  padding-top: 0.5em;
  z-index: 100;
}

body {
  background-color: #abc;
}
*,
h1,
button {
  font-family: 'Nunito', sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.tasks {
  width: 100%;
  max-width: 45rem;
  padding: 1em;
  margin: 1em auto;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
}
.tasks__list {
  clear: both;
}
.tasks__item {
  margin-bottom: 0.5em;
  position: relative;
}
.tasks__item__toggle {
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.85em 2.25em 0.85em 1em;
  background-color: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
}
.tasks__item__toggle:hover {
  background-color: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.15);
}
.tasks__item__toggle--completed {
  text-decoration: line-through;
  background-color: rgba(0,128,0,0.15);
  border-color: rgba(0,128,0,0.2);
}
.tasks__item__toggle--completed:hover {
  background-color: rgba(0,128,0,0.25);
  border-color: rgba(0,128,0,0.3);
}
.tasks__item__remove {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.tasks__item__remove i {
  vertical-align: middle;
}

.Homepage-items {
  display: flex;
  justify-content: space-between;
}

.HomeCalendar {
  padding-left: 10em;
  padding-top: 3em;
  z-index: 0;
}
</style>
