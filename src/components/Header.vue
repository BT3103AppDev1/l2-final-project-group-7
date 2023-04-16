<template>
    <div class="header">
      <div class="project-name">
        {{ this.$route.params.projName }}
      </div>
      <div class="buttons">
        <button ref="tasksButton" @click="goToTasks" :class="{ 'nav-button': true, 'clicked': $route.path.match(/tasks/i) }" >Tasks</button>
        <button ref="calendarButton" @click="goToCalendar" :class="{ 'nav-button': true, 'clicked': $route.path.match(/calendar/i) }">Calendar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Header",
    mounted() {
      const tasksButton = this.$refs.tasksButton;
      const calendarButton = this.$refs.calendarButton;

      tasksButton.addEventListener('click', () => {
        tasksButton.classList.add('clicked');
        calendarButton.classList.remove('clicked');
        console.log("clicked Tasks button");
      });

      calendarButton.addEventListener('click', () => {
        calendarButton.classList.add('clicked');
        tasksButton.classList.remove('clicked');
        console.log("clicked Calendar button");
      });
      
      // Check the current route and set the appropriate button as clicked
      if (this.$route.path.match(/tasks/i)) {
        tasksButton.classList.add('clicked');
      } else if (this.$route.path.match(/calendar/i)) {
        calendarButton.classList.add('clicked');
      }
    },
    methods: {
      goToCalendar() {
        this.$router.push("/calendar/" + this.$route.params.projID + '/' + this.$route.params.projName)
      },
      goToTasks() {
        this.$router.push("/tasks/" + this.$route.params.projID + '/' + this.$route.params.projName)
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
  * {
    font-family: 'Josefin Sans', sans-serif;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 60vw;
    padding: 5px 20px;
  }
  .project-name {
    font-size: 35px;
    font-weight: bold;
    align-items: center;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background: #5E72EB;
    color: white;
    border: none;
    border-radius: 49px;
    cursor: pointer;
    text-align: center;
  }

  button.clicked {
    background-color: #130D6F;
  }
  .btn:hover {
      cursor: pointer;
  }
  </style>
  