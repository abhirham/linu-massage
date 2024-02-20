import { createRouter, createWebHistory } from 'vue-router';

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
            component: () => import('@/components/pages/Rewards.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/pages/Login.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/components/pages/SignUp.vue'),
        },

        {
            path: '/forgot-password',
            name: 'forgot-pw',
            component: () => import('@/components/pages/SignUp.vue'),
        },
    ],
});

export default router;
