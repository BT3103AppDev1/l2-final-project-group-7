<template>
  <div class="todolist-bg">
    <div class="todolisttitle">Tasks</div>
      <!-- Show added items in list view-->
      <ul class="task-list" id="list">
        <!-- v-for to iterates over the items array and create a list of item for each item in the array -->
        <!-- v-bind to check whether item is completed or not-->
        <!-- finding indiv tasks -->
        <li class="task-list-item" v-for="(item) in indivitems" :key="item.id" v-bind:class="{completed: item.completed}">
          <div class="item-details">
            <input class="checkbox" type="checkbox" 
            v-model="item.completed" v-on:change="clickChecked(item); updatePoints(item.points)"/>
            <span class="item-title">{{ item.name }}</span>
            <div>
              <a class="item-duedate"><CIcon :icon="cilCalendar" size="custom"/> {{  `${item.endDate.getDate()}/${item.endDate.getMonth()+1}/${item.endDate.getFullYear()}` }}</a>
              <a class="item-location">in {{ item.location }}</a>
            </div>
          </div>
          <div class="item-points">+ {{ item.points }} points</div>
          <div class="button btn-edit" @click="showEditModal(item)"><CIcon :icon="cilPencil" size="custom"></CIcon></div>

          <div class="button btn-edit" @click="deleteItem(item)"><CIcon :icon="cilTrash" size="custom"></CIcon></div>
           <!-- edit indiv task pop up -->
          <Modal v-show="isEditModalVisible" @close="closeEditModal" style="margin-right: 20em;">
            <template v-slot:header>
              Edit individual task
            </template>
            
            <template v-slot:body>
              <form @submit.prevent="addData" >
                <div class="addproject-addprojtitle">
                  <div class="addproject-projtitletext">Edit name:</div>
                    <input type="text" class="addproject-inputbg" placeholder="New name" id="newTaskName" v-model="newItemEdit" required>  
                  </div>
                  <div class="addproject-adduser">
                  <div class="addproject-userstext">Edit Due date:</div>
                    <Datepicker class="addproject-inputbg" id="dueDate" v-model="pickedEdit" placeholder="New due date"></Datepicker>
                  </div> 
              </form>
            </template>

            <template v-slot:footer>
              <div class="addproject-pushbuttons">
                <button class="addproject-addbutton" type="submit" @click="editData">Save</button>
              </div>
            </template>
          </Modal>
        </li>

        <!-- finding project items-->
        <li class="task-list-item" v-for="(item) in projitems" :key="item.id" v-bind:class="{completed: item.completed}">
          <div class="item-details">
            <input class="checkbox" type="checkbox" 
            v-model="item.completed" v-on:change="clickChecked(item); updatePoints(item.points)"/>
            <span class="item-title">{{ item.name }}</span>
            <div>
              <a class="item-duedate"><CIcon :icon="cilCalendar" size="custom"/> {{  `${item.endDate.getDate()}/${item.endDate.getMonth()+1}/${item.endDate.getFullYear()}` }}</a>
              <a class="item-location">in {{ item.location }}</a>
            </div>
        </div>
          <div class="item-points">+ {{ item.points }} points</div>
        </li>
      </ul>

      <!-- to add new item into the list -->
      <div class="task">
      <div class="task-input" @click="showModal"><CIcon :icon="cilLibraryAdd" size="custom"/> Add individual task</div>
      </div>
      
      <!-- add indiv task pop up -->
      <Modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          Add individual task
        </template>
            
        <template v-slot:body>
          <form @submit.prevent="addData" >
            <div class="addproject-addprojtitle">
              <div class="addproject-projtitletext">Task:</div>
                <input type="text" class="addproject-inputbg" placeholder="eg. Stakeholder Analysis" id="newTaskName" v-model="newItem" required>  
              </div>
              <div class="addproject-adduser">
                <div class="addproject-userstext">Due date:</div>
                  <Datepicker class="addproject-inputbg" id="dueDate" v-model="picked" placeholder="YYYY-MM-DD"></Datepicker>
              </div> 
          </form>
        </template>

        <template v-slot:footer>
          <div class="addproject-pushbuttons">
            <button class="addproject-addbutton" type="submit" @click="addData">Add task</button>
          </div>
        </template>
      </Modal>
    </div>
  </template>
  
  <script> 
  import Modal from '@/components/Modal.vue';
  import { getCards } from '@/components/ToDoListAPI/index.js';
  import { getIndiv } from '@/components/ToDoListAPI/indivtasks.js';
  import { CIcon } from '@coreui/icons-vue';
  import { cilCalendar, cilLibraryAdd, cilTrash, cilPencil } from '@coreui/icons';
  import Datepicker from '@/components/Datepicker/Datepicker.vue';
  import { auth, db } from "../firebase/init.js"
  import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
  import { collection, getDocs, doc, addDoc, setDoc, updateDoc, where, query, deleteDoc } from "firebase/firestore";

  export default {
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
    },
    data() {
      return {
        newItem: "", //item before adding into array
        indivitems: getIndiv(),
        projitems: getCards(),
        isModalVisible: false,
        isEditModalVisible: false,
        picked: new Date(),
        completed: false,
        selectedItem: "",
        newItemEdit: "",
        pickedEdit: new Date(),
      };
    },
    components: {Modal, CIcon, Datepicker},
    setup() {
      return {
        cilCalendar,
        cilLibraryAdd,
        cilTrash,
        cilPencil
      }
    },
    methods: {
      async addData() {
        try {
          const docRef = await addDoc(collection(db, 'individualtasks'), {
            Name: this.newItem,
            points: 100,
            endDate: this.picked,
            completed: false,
            uid: auth.currentUser.uid,
            location: "Individual task",
          });
          this.isModalVisible = false;
          this.newItem = "";
          this.picked = new Date();
          document.getElementById("newTaskName").value = "";
        } catch (error) {
          console.log("this also shouldnt run")
        }
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
        document.getElementById("dueDate").value = "";
        document.getElementById("newTaskName").value = "";
      },
      showEditModal(item) {
        this.isEditModalVisible = true;
        this.selectedItem = item;
      },
      closeEditModal() {
        this.isEditModalVisible = false;
        this.selectedItem = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("newTaskName").value = "";
      },
      async updatePoints(pointsAdded) {
        try {
          const quer = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));
          const userRef = await getDocs(quer);
          const userDoc = userRef.docs[0]; 
          const userPoints = userDoc.data().points;
          const newPoints = userPoints + pointsAdded;
          await updateDoc(userDoc.ref, {
            points: newPoints 
          })
          console.log("points updated") 
        } catch (error) {
          console.log("points not updating correctly")
        }
      },
      async clickChecked(item) {
        try {
          const docRef = doc(db, 'individualtasks', item.id);
          await updateDoc(docRef, {
            completed: true,
          });
          console.log('Field updated successfully.');
          this.completed = false;
        } catch (error) {
          const docRef = doc(db, 'tasks', item.id);
          await updateDoc(docRef, {
            completed: true,
          });
          console.log('Field updated successfully.');
          this.completed = false;
        }
      },
      async editData() {
        try {
          const docRef = doc(db, 'individualtasks', this.selectedItem.id);
          await updateDoc(docRef, {
            Name: this.newItemEdit,
            endDate: this.pickedEdit,
          });
          console.log("task updated")
          this.isEditModalVisible = false;
          this.selectedItem = "";
          document.getElementById("dueDate").value = "";
          document.getElementById("newTaskName").value = ""; 
        } catch (error) {
          console.log(item.id),
          console.log(error);
        }
      },
      async deleteItem(item) {
        await deleteDoc(doc(db, 'individualtasks', item.id));
      }
    }
  };
  </script>
  
  <style scoped >
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
  * {
    font-family: 'Josefin Sans', sans-serif;
  }

  .todolisttitle {
  color: rgba(0, 0, 0, 1);
  height: auto;
  font-size: 30px;
  font-style: Regular;
  text-align: left;
  font-family: Yeseva One;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}

body{
  font-family: Josefin Sans;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
}

form {
  margin: 5px;
  align-items: center;
  background: white;
  text-align: left;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  background-color: #EEEEEE;
  width: auto;
}
h1{
  color: black;
  font-weight: bold;
}
label {
  padding-bottom: 10px;
}
button{
  font-weight: bold;
}
ul {
  list-style: none;
  padding: 0;
}
.wrapper{
  background-color: #fff;
  padding: 5px;
  align-items: center;
}

.task {
  width: 100%;
  margin-top: 10px;
  height: 40px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
}
.complete {
  text-decoration: line-through;
}
.task-input{
  color: #616161;
}

.task-input:hover{
  cursor: pointer;
  color:#FF9190;
}
.btn-add{
  flex-shrink: 0;
  height: 34px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #5E72EB;
  color: rgba(255, 255, 255, 1);
}

.btn-add:hover {
  color:#FF9190;
  cursor: pointer;
}

.btn-edit{
  margin-left: auto;
  border: none;
  background: none;
  color: #616161;
  float: right;
}

.btn-edit:hover {
  color:#FF9190;
  cursor: pointer;
}
.task-list {
  border-radius: 2px;
  display: block;
  width: 100%;
}
.task-list-item {
  width: 100%;
  display:flex;
  align-items: center;
  padding-top: 5%;
  padding-bottom: 5%;
  border-bottom-color: #616161;
  border-bottom: solid;
}
.item-details input:checked + div{
  color: grey;
}
.item-details input:checked + span{
  text-decoration: line-through;
}

.item-details {
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
}

.item-title {
  font-style: Regular;
  font-family: Josefin Sans;
  font-size: 23px;
}

.item-duedate {
  margin: 0% 1% 0% 3%;
  color: #FEC195;
  padding: 5px;
  font-size: 20px;
  font-style: Regular;
  text-align: left;
  font-family: Josefin Sans;
}



.item-location {
  color: #616161;
  font-style: Regular;
  font-family: Josefin Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
  font-size: 20px;
}

.item-points {
  color: #FF9190;
  float: right;
}
.checkbox {
  color:#5E72EB;
}

.icon {
  height: 20px;
}

.modal-mask {
  position: fixed;
  z-index: 9999; 
}
  </style>