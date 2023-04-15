<template>
    <div id="calendar-display" class="flex-row">

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

<script setup lang="ts">  

    import Sidebar from "./SideBar.vue"
    import Calendar from "../components/Calendar.vue"
    import Header from "../components/Header.vue"


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