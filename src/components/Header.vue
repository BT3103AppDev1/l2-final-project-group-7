<template>
    <div class="header">

      <div class="project-name">
          {{ this.$route.params.projName }}
      </div>
      <div class="buttons">
        <CIcon class="settings-icon" :icon="cilSettings" size="sm" @click.prevent="showModal"/>
        <button ref="tasksButton" @click="goToTasks" :class="{ 'nav-button': true, 'clicked': $route.path.match(/tasks/i) }" >Tasks</button>
        <button ref="calendarButton" @click="goToCalendar" :class="{ 'nav-button': true, 'clicked': $route.path.match(/calendar/i) }">Calendar</button>
      </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Edit Project
      </template>
      <template v-slot:body>
        <form>
          <div class="addproject-addprojtitle">
            <div class="addproject-projtitletext">Project Name:</div>
            <input type="text" class="addproject-inputbg" placeholder="Project name..." id="newProjName" v-model="projName" required>
          </div>
                  <div class="addproject-adduser">
                    <div class="addproject-userstext">Stakeholders:</div>
                    <input type="text" class="addproject-inputbg" placeholder="Username" id="newUsers" v-model="stakeHolderEmail">
                    <input type='button' class="addproj-adduser-btn" value='Add user' id='add' @click="addStakeholder">
                    <div>
                      {{ formattedStakeHolders }}
                    </div>
                    <button class="copy-link" v-if="!linkCopied" @click.prevent="copyLink">Copy Link!</button>
                    <button class="copied-link" v-else> Link Copied!</button>
          </div> 
        </form>
      </template>
      <template v-slot:footer>
        <div class="addproject-pushbuttons">
          <button class="deleteproject-button" @click.prevent="deleteProject">Delete</button>
          <button class="addproject-addbutton" @click.prevent="editProject">Submit</button>
        </div>
      </template>
    </Modal>
  </template>
  
  <script>
    import { CIcon } from '@coreui/icons-vue';
    import { cilPlus, cilTrash, cilArrowThickLeft, cilSettings} from '@coreui/icons'; 
    import Modal from './Modal.vue';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/init';
import { getAuth } from 'firebase/auth';

  export default {
    name: "Header",
    data() {
      return {
        isModalVisible: false,
        projName: this.$route.params.projName,
        stakeHolderEmail: "",
        stakeHolderArrayEmail: [],
        stakeHolderArrayID: [],
        linkCopied: false
      }
    },
    components: {
      CIcon,
      Modal
    },
    computed: {
      formattedStakeHolders() {
        return this.stakeHolderArrayEmail.join(", ")
      }
    },
    setup() {
      return {cilSettings, cilTrash}
    },
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
      },
      showModal() {
        this.isModalVisible = true;
        this.linkCopied = false;
      },
      closeModal() {
        this.isModalVisible = false;
      },

      async editProject() {
        const auth = getAuth();
        const projDoc = doc(collection(db, 'projects'), this.$route.params.projID)
        const updateData = {
          projName: this.projName,
          users: this.stakeHolderArrayID,
        }
        await updateDoc(projDoc, updateData);
        this.$router.push({
                name: "Project Task Page",
                params: {
                    projID: this.$route.params.projID,
                    projName: this.projName
                }
            })
        this.stakeHolderArrayID = [];
        this.stakeHolderArrayEmail = [];
        this.isModalVisible = false;
      },
      async addStakeholder() {
        const userQuery = query(collection(db, 'users'), where("email", "==", this.stakeHolderEmail));
        const querySnapshot = await getDocs(userQuery);
        const stakeholder = querySnapshot.docs[0];
        if (stakeholder) {
          this.stakeHolderArrayID.push(stakeholder.data().uid)
          this.stakeHolderArrayEmail.push(this.stakeHolderEmail);
        }
        this.stakeHolderEmail = "";
      },

      async deleteProject() {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (confirmDelete) {
          const listQuery = query(collection(db, 'lists'), where("projID", "==", this.$route.params.projID))
          const listDocs = await getDocs(listQuery)
          listDocs.forEach(listDoc => {
            const document = doc(collection(db, "lists"), listDoc.id)
            const taskCollection = collection(db, `lists/${listDoc.id}/tasks`)
            const tasksDocs = getDocs(taskCollection, listDoc.id)
            tasksDocs.forEach(taskDoc => {
              const taskDocument = doc(taskCollection, taskDoc.id)
              deleteDoc(taskDocument)
            })
            deleteDoc(document);
          })
          const tasksCollectionRef = collection(db, "tasks");
          const taskQuery = query(collection(db, "tasks"), where("projID", "==", this.$route.params.projID));
          const mainTasksDocs = await getDocs(taskQuery)
          mainTasksDocs.forEach(taskDoc => {
            const document = doc(tasksCollectionRef, taskDoc.id)
            deleteDoc(document); 
          })
          
          const projDoc = doc(collection(db, "projects"), this.$route.params.projID)
          await deleteDoc(projDoc)
          this.isModalVisible = false;
          this.$router.push('/projects')
        }

      },

      copyLink() {
        navigator.clipboard.writeText(this.$route.params.projID);
        this.linkCopied = true;
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
    gap: 10px;
    margin-right: 20rem ;
}

  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .settings-icon {
    min-width: 30px;
    cursor: pointer;
    margin-right: 1rem;
  }

  .settings-icon path {
    fill: grey;
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
  .addproject-pushbuttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .deleteproject-button {
    background-color: red;
  }

  input {
    text-indent: 8px;
  }

  .copy-link {
    background-color: rgb(58, 141, 58);
  }

  .copied-link {
    background-color: rgb(3, 73, 3);
  }
  </style>
  