import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/pages/Home.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/components/pages/About.vue'),
        },
        {
            path: '/course/:courseName',
            name: 'view-course',
            props: true,
            component: () => import('@/components/pages/CourseDetails.vue'),
        },
        {
            path: '/referral',
            name: 'referral',
            props: true,
            component: () => import('@/components/pages/Rewards.vue'),
        },
    ],
})

export default router
