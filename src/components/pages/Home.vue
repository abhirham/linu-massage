<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6" order="2">
                <h1 class="company-name">
                    Healing Touch Spa & Wellness Centre
                </h1>
                <div>
                    Experience the pinnacle of massage therapy expertise with
                    Healing Touch Spa & Wellness Centre's online courses.
                    Elevate your skills, anywhere, anytime, with our Massage
                    Therapy Mastery Online.
                </div>
            </v-col>
            <v-col cols="12" md="5" order-md="3">
                <v-img src="/home.jpeg"></v-img>
            </v-col>
        </v-row>
    </v-container>
    <div class="bg-primary">
        <v-container>
            <h1 class="mb-5">All Courses</h1>
            <p v-if="courses.length === 0">
                Looks like there are no courses added yet.
            </p>
            <v-row v-else>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    v-for="(course, idx) in courses"
                    :key="idx"
                >
                    <CourseCard v-bind="course">
                        <template #actions>
                            <v-btn
                                @click="
                                    $router.push({
                                        name: 'view-course',
                                        params: { courseId: course.id },
                                    })
                                "
                                class="bg-btn-blue"
                                >view course</v-btn
                            >
                        </template>
                    </CourseCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <v-container>
        <v-card>
            <v-card-text class="text-center text-h6"
                >CONTACT US VIA MAIL: healingrmtmassage@gmail.com</v-card-text
            >
        </v-card>
    </v-container>
</template>

<script>
import CourseCard from '../CourseCard.vue';
export default {
    components: { CourseCard },
    data() {
        return {
            courses: [],
        };
    },
    mounted() {
        this.$store.dispatch('courseModule/fetchCoursesFromDB').then((res) => {
            this.courses = res;
        });
    },
};
</script>

<style scoped>
.border-0 {
    border: none;
}
</style>
