<template>
    <div id="calendar-display" class="flex-row" v-if="user">

        <div>
            <Sidebar />
        </div>

        <div id="calendar-body" class="flex-column">
            <div class="calendar-header">
                <Header />
            </div>

            <div id="calendar-proper">
                <Calendar 
                    :addItems="false"
                />
            </div>
        </div>

        <div class="users-in-project">
        </div>
    </div>


</template>

<script>  

    import Sidebar from "./SideBar.vue"
    import Calendar from "../components/Calendar.vue"
    import Header from "../components/Header.vue"
    import { getUser } from '../components/SidebarAPI/userinfo.js';
    import { getAuth, onAuthStateChanged } from '@firebase/auth';
    
    export default {
        name: "CalendarPage",
        components: {
            Sidebar,
            Header,
            Calendar
        },
        data() {
            return {
                user: null,
            };
        },
        mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in!")
                this.user = user;
            } else {
                this.$router.push("/login");
            }
            });
        },
        };
</script>

<style scoped>
    .calendar-display {
        display: flex;
        align-items: center;
    }

    .calendar-header {
        padding-left: 13vw;
    }

    #calendar-proper {
        padding-left: 18vw;
    }

    .users-in-project {
        padding-bottom: 62vh;
        padding-right: 5.7vw;
    }
</style>