<template>
  <div class="sidebar-bg" v-if="user" >
    <div class="sidebar-header" >
       <!-- user's name -->
      <div class="SideBar-Name">
        <img
            alt="Icon"
            src="src/assets/sidebar-person-icon.png"
            class="UserIcon"
          />
        <span class="sidebar-usersname"><span>{{ userDetails[0].username }}</span></span>
      </div>
      <!-- users points -->
      <CIcon :icon="cilGem" size="custom"></CIcon>
      <span class="sidebar-pointstext"><span>{{ userDetails[0].points }}</span></span>
    </div>
    <div class="sidebar-body" >
      <!-- home -->
      <div class="sidebar-homebutton">
        <router-link to="/home">Home</router-link>
      </div>
      <!-- team projects -->
      <dropdown class="my-dropdown-toggle"
          :options="arrayOfObjects" 
          :selected="object" 
          v-on:updateOption="methodToRunOnSelect" 
          :closeOnOutsideClick="boolean">
      </dropdown>
        <!-- add project -->
        <div class="sidebar-addproj" @click="showModal">+ Add Project</div>
          <!-- analytics -->
        <div class="sidebar-analyticsbutton">
          <router-link to="/signup">Analytics</router-link>
        </div>
      </div>
        <!-- add project pop up -->
          <Modal v-show="isModalVisible" @close="closeModal">
            <template v-slot:header>
              Add project
            </template>
            
            <template v-slot:body>
              <form>
              <div class="addproject-addprojtitle">
                <div class="addproject-projtitletext">Project title:</div>
                
                  <input type="text" class="addproject-inputbg" placeholder="eg. Stakeholder Analysis" id="newProjName" required>
                
              </div>
                <div class="addproject-adduser">
                  <div class="addproject-userstext">Authorised Users:</div>
                
                  <input type="text" class="addproject-inputbg" placeholder="Username" id="newUsers" required>
                  <input type='button' class="addproj-adduser-btn" value='Add user' id='add' @click="addUser()">
                
                <div class="addproject-addeduserstext">Added users:</div>
                <ul class="addproject-currentusers" id='list'>
                    <li>{{  user.email  }}</li>
                </ul>
              </div> 
            </form>
            </template>

            <template v-slot:footer>
              <div class="addproject-pushbuttons">
                <button class="addproject-addbutton" @click="addData">Add project</button>
              </div>
            </template>
          </Modal>
        
      <div class="sidebar-footer">
        <!-- signout -->
        <button class="sidebar-signout" @click.prevent="signOut"><span>Sign out</span></button>
      </div>
    </div>
</template>
  
  <script>
import Modal from '@/components/Modal.vue';
import dropdown from '@/components/Dropdown.vue';
import { getUser } from '../components/SidebarAPI/index.js';
import { CIcon } from '@coreui/icons-vue';
import { cilGem } from '@coreui/icons';
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";

let project1 = {name: "Project 1"};


  export default {
    name: 'Sidebar',
    components: {Modal, dropdown, CIcon},
    setup() {
      return {
        cilGem
      }
    },
    data() {
      return { 
        isModalVisible: false,
        user : false,
        arrayOfObjects: [project1],
        userDetails: getUser()
      }
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
    },
    methods: {
      async signOut() {
        const auth = getAuth();
        const user = auth.currentUser;
        await signOut(auth, user);
        this.$router.push("/login")
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        document.getElementById("newUsers").value = "";
        document.getElementById("newProjName").value = "";
        document.getElementById("list").innerHTML = "<li>" + this.user.email + "</li>";
        this.isModalVisible = false;
      },
      addData() {
        var emailList = document.getElementById("list");
        var projname = document.getElementById("newProjName").value;
        let newProj = {name: projname};
        this.arrayOfObjects.push(newProj);
        document.getElementById("newUsers").value = "";
        document.getElementById("newProjName").value = "";
        document.getElementById("list").innerHTML = "<li>" + this.user.email + "</li>";
        this.isModalVisible = false;
      },
      addUser() {
        var input = document.getElementById("newUsers").value;
        var list = document.getElementById("list");
        var item = document.createElement("li");
        item.append(document.createTextNode(input));
        list.append(item);
        document.getElementById("newUsers").value = "";
      },
      methodToRunOnSelect(payload) {
            this.object = payload;
      }
    }
  }

  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
  * {
    font-family: 'Josefin Sans', sans-serif;
  }
  .sidebar-bg {
    width: 16%;
    height: 100%;
    display: flex;
    position: fixed;
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 1;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #5E72EB;
    padding-top: 3%; 
    align-content: space-between;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .sidebar-header {
    height: 20%;
    width: 100%;
    display: flex;
    overflow: hidden;
    align-self: auto;
    box-sizing: border-box;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-radius: 0px 0px 0px 0px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-left: 3%;
  }
  .sidebar-body {
    height: 60%;
    width: 100%;
    display: flex;
    overflow: hidden;
    align-self: auto;
    box-sizing: border-box;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-radius: 0px 0px 0px 0px;
    flex-direction: column;
    justify-content: flex-start;
  }

  .sidebar-footer {
    height: 20%;
    width: 100%;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .SideBar-Name{
    align-self: auto;
    width: auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .sidebar-addproj {
    align-self: auto;
    background-color: transparent;
    margin-left: 5%;
    color: rgba(255, 255, 255, 1);
    height: auto;
    width: 100%;
    font-size: 20px;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    padding: 10px;
  }

  .sidebar-usersname {
    color: rgba(255, 255, 255, 1);
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    height: auto;
    font-size: 20px;
  }
  .sidebar-points {
    display: flex;
    padding: 1%;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    border-radius: 0px 0px 0px 0px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
    align-items: center;
    margin-top: 5%;
  }
  .sidebar-pointstext {
    color: rgba(255, 255, 255, 1);
    height: auto;
    font-size: 20px;
    font-style: Regular;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-pointsvector {
    padding: 3%;
  }
  .sidebar-homebutton {
    color: rgba(255, 255, 255, 1);
    height: auto;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: 'Josefin Sans';
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    background: none;
    margin-left: 5%;
    margin-top: 5%;
  }
  .sidebar-analyticsbutton{
    color: rgba(255, 255, 255, 1);
    height: auto;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    background: none;
    margin-left: 5%;
    margin-top: 5%;
  }

  .sidebar-signout {
  border-color: transparent;
  color: rgba(94, 114, 235, 1);
  padding: 2%;
  width: 40%;
  font-size: 15px;
  font-style: Regular;
  text-align: center;
  font-family: Josefin Sans;
  font-weight: 400;
  background: white;
  border-radius: 12px;
  cursor: pointer;
}

a { 
  text-decoration: none; 
  color: white 
}
input {
    text-indent: 10px;
}

.icon {
  height: 24px;
  padding: 2%;
  color: white;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
</style>
  