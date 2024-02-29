import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

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
            path: '/course/:courseId',
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
            path: '/admin',
            name: 'admin',
            component: () => import('@/components/pages/Admin.vue'),
            beforeEnter(to, from, next) {
                if (store.state.userModule.user.isAdmin) {
                    return next();
                }

                return next({ name: 'NotFound' });
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/components/pages/NotFound.vue'),
        },
    ],
});

export default router;
