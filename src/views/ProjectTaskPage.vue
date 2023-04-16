<template>

  <div class="ProjectTaskPage-container" v-if="user">
    <div class="Sidebar">
      <SideBar />
    </div>
    <div class="Wrapper">
      <div class="Header">
        <Header/>
      </div>
      <div class="KanbanBoard">
        <KanbanBoard/>
      </div>
    </div>

    <div class="UsersInProject">
    </div>
  </div>
</template>

<script>
import KanbanBoard from "@/components/Kanban/KanbanBoard.vue";
import Header from "@/components/Header.vue"
import SideBar from "@/views/SideBar.vue";
import Modal from "@/components/Modal.vue";

import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default {
  name: "ProjectTaskPage",
  data() {
    return {
      addCardPopupVisible: false,
      addUserPopupVisible: false,
      addListPopupVisible: false,
      editElemPopupVisible: false,
      user : false 
    };
  },
  created() {
    console.log(this.$props.projName);
  },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user; 
        } else {
          this.$router.push("/login");
        }
      })
    },
  methods: {
  },
  components: {SideBar, Modal, KanbanBoard, Header}
};
</script>

<style scoped>
.ProjectTaskPage-container {
  display: flex;
  flex-direction: row;
  z-index: 0;
}

.Sidebar {
  max-width: 17%;
  flex: 1;
  z-index: 1;
}
.Wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: calc(100% - 17% - 17%);
  overflow: hidden;
}

.Header {
  height: 7%;
}
.KanbanBoard {
  flex: 1;
  overflow-x: scroll;
}

.UsersInProject {
  flex: 1;
}







</style>
