import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import ProjectTaskPage from '@/views/ProjectTaskPage.vue';
import HomePage from '@/views/HomePage.vue'
import CalendarPage from '@/views/CalendarPage.vue';
import SignUpDetails from '@/views/SignUpDetails.vue';
import Chat from '@/views/Chat.vue';
import AllProjectsPage from '@/views/AllProjectsPage.vue'

const routes = [
    {
        path: '/',
        name: 'Landing Page',
        component: LandingPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    }, 
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignupPage
    },
    {
        path: '/signupdetails',
        name: 'Sign Up Details',
        component: SignUpDetails
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/tasks/:projID/:projName',
        name: 'Project Task Page',
        component: ProjectTaskPage,
    },
    {
        path: '/calendar/:projID/:projName',
        name: 'Calendar Page',
        component: CalendarPage,
    },
    {
        path: '/chat',
        name: 'Chat Box',
        component: Chat,
    },
    {
        path: '/projects',
        name: 'All Projects Page',
        component: AllProjectsPage,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router