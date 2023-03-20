<template>
  <div class="sidebar-sidebar">
      <!-- user's name -->
      <div class="SideBar-Name">
        <span class="sidebar-usersname"><span>Adam</span></span>
        <img
            alt="Icon"
            src="src/assets/sidebar-person-icon.png"
            class="UserIcon"
          />
      </div>

      <!-- users points -->
      <div class="sidebar-points">
        <span class="sidebar-pointstext"><span>900 points</span></span>
        <img
          src="src/assets/sidebar-points-vector.png"
          alt="Icon"
          class="sidebar-pointsvector"
        />
      </div>

      <!-- home -->
      <div class="sidebar-homebutton">
        <router-link to="/signup">Home</router-link>
      </div>

      <!-- team projects -->
      <div class="sidebar-projectstitle">
        <span class="sidebar-projectstext"><span>Team Projects</span></span>
      </div>
      <div class="sidebar-firstproj">
          <img
            src="src/assets/sidebar-pointer-vector.png"
            alt="Icon"
            class="sidebar-pointer1"
          />
          <span class="sidebar-project1"><router-link to="/projecttaskpage">Project 1</router-link></span>
        </div>
        <div class="sidebar-secondproj">
          <img
            src="src/assets/sidebar-pointer-vector.png"
            alt="Icon"
            class="sidebar-pointer2"
          />
          <span class="sidebar-project2"><router-link to="/signup">Project 2</router-link></span>
        </div>

        <!-- add project -->
        <div class="sidebar-addproj">
          <div class="sidebar-addprojtext" onclick="showAddProjPopup">Add Project
            <span class="addProjPopupText" id="myPopup">Popup text...</span>
          </div>
          <img
            src="src/assets/sidebar-plus-vector.png"
            alt="Icon"
            class="sidebar-vector2"
          />
        </div>
        <img
          src="src/assets/sidebar-pencil-vector.png"
          alt="Icon"
          class="sidebar-pencil"
        />

        <!-- analytics -->
        <div class="sidebar-analyticsbutton">
          <router-link to="/signup">Analytics</router-link>
        </div>

        
        <!-- signout -->
        <div class="sidebar-signout">
            <button class="sidebar-signouttext" onclick="signOut()"><span>Sign out</span></button>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    data() {
      return {addProjPopupVisible: false}
    },
    methods: {
      signOut() {
      },
      showAddProjPopup() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      },
    },
  }

  </script>
  
  <style scoped>
  .sidebar-sidebar {
    margin: 0;
    padding: 0;
    width: 236px;
    height: 1024px;
    display: flex;
    position: absolute;
    overflow: hidden;
    align-self: auto;
    box-sizing: border-box;
    align-items: center;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    margin-right: 0;
    border-radius: 0px 0px 0px 0px;
    top: 0; right: 0; bottom: 0; left: 0;
    margin-bottom: 0;
    flex-direction: column;
    justify-content: center;
    background-color: #5E72EB;
    background-size: 100% 50%;
    height: 100%;
  }
  .sidebar-firstproj {
    top: 300px;
    left: 67px;
    width: 89.00000762939453px;
    height: 15px;
    display: flex;
    padding: 0;
    position: absolute;
    align-self: auto;
    box-sizing: border-box;
    align-items: flex-start;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    border-radius: 0px 0px 0px 0px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
  }
  .sidebar-pointer1 {
    top: 2px;
    left: 0px;
    width: 6px;
    height: 10px;
    position: absolute;
  }
  .sidebar-project1 {
    left: 13.000005722045898px;
    color: rgba(255, 255, 255, 1);
    width: 76px;
    height: auto;
    position: absolute;
    font-size: 20px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-secondproj {
    top: 333px;
    left: 67px;
    width: 104.00000762939453px;
    height: 15px;
    display: flex;
    padding: 0;
    position: absolute;
    align-self: auto;
    box-sizing: border-box;
    align-items: flex-start;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    border-radius: 0px 0px 0px 0px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
  }
  .sidebar-pointer2 {
    top: 2px;
    left: 0px;
    width: 6px;
    height: 10px;
    position: absolute;
  }
  .sidebar-project2 {
    left: 13.000005722045898px;
    color: rgba(255, 255, 255, 1);
    width: 91px;
    height: auto;
    position: absolute;
    font-size: 20px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-addproj {
    top: 366px;
    left: 67px;
    width: 134px;
    height: 15px;
    display: flex;
    padding: 0;
    position: absolute;
    align-self: auto;
    box-sizing: border-box;
    align-items: flex-start;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    border-radius: 0px 0px 0px 0px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
  }
  .sidebar-addprojtext {
    left: 16.000003814697266px;
    color: rgba(255, 255, 255, 1);
    width: 118px;
    height: auto;
    position: absolute;
    font-size: 20px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-vector2 {
    top: 1px;
    left: 0px;
    width: 12px;
    height: 12px;
    position: absolute;
  }
  
  .sidebar-projectstext {
    top: 259px;
    left: 3px;
    color: rgba(255, 255, 255, 1);
    width: 191px;
    height: auto;
    position: absolute;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-vector3 {
    top: 86px;
    left: 47px;
    width: 21px;
    height: 25px;
    position: absolute;
  }
  .sidebar-homebutton {
    top: 208px;
    left: 3px;
    color: rgba(255, 255, 255, 1);
    width: 107px;
    height: auto;
    position: absolute;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    background: none;
  }
  .sidebar-usersname {
    top: 88px;
    left: 87px;
    color: rgba(255, 255, 255, 1);
    width: 107px;
    height: auto;
    position: absolute;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-points {
    top: 138px;
    left: 45px;
    width: 137px;
    height: 24px;
    display: flex;
    padding: 0;
    position: absolute;
    align-self: auto;
    box-sizing: border-box;
    align-items: flex-start;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    border-radius: 0px 0px 0px 0px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
  }
  .sidebar-pointstext {
    top: 2px;
    left: 40px;
    color: rgba(255, 255, 255, 1);
    height: auto;
    position: absolute;
    font-size: 20px;
    align-self: auto;
    font-style: Regular;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
  }
  .sidebar-pointsvector {
    top: 0px;
    left: 0px;
    width: 25px;
    height: 24px;
    position: absolute;
  }
  .sidebar-pencil {
    top: 296px;
    left: 171px;
    width: 23px;
    height: 23px;
    position: absolute;
  }
  .sidebar-analyticsbutton{
    top: 410px;
    left: -17px;
    color: rgba(255, 255, 255, 1);
    width: 191px;
    height: auto;
    position: absolute;
    font-size: 25px;
    align-self: auto;
    font-style: Regular;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 400;
    line-height: normal;
    font-stretch: normal;
    text-decoration: none;
    background: none;
  }
  

  .sidebar-signout {
  top: 962px;
  left: 80px;
  width: 75px;
  height: 24px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  border-radius: 0px 0px 0px 0px;
  flex-direction: row;
  justify-content: flex-start;
}
.sidebar-signouttext {
  top: 5px;
  left: 9px;
  color: rgba(94, 114, 235, 1);
  height: auto;
  position: absolute;
  font-size: 15px;
  align-self: auto;
  font-style: Regular;
  text-align: center;
  font-family: Josefin Sans;
  font-weight: 400;
  background: white;
  border-radius: 12px;
}

  .UserIcon {
  top: 74px;
  left: 34px;
  width: 47px;
  height: 47px;
  position: absolute;
}

a { 
  text-decoration: none; 
  color: white 
}

/* Popup container */
.sidebar-addprojtext {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.sidebar-addprojtext .addProjPopupText {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.sidebar-addprojtext .addProjPopupText::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.sidebar-addprojtext .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s
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
  