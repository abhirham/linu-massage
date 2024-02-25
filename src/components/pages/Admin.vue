<template>
    <v-container>
        <h1>Admin Panel</h1>
        <v-tabs v-model="tab" class="mb-3">
            <v-tab value="course">Courses</v-tab>
            <v-tab value="reports">Resports</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="course">
                <v-row justify="end">
                    <v-col cols="auto">
                        <v-btn
                            color="btn-blue"
                            @click="showAddCourse = true"
                            prepend-icon="mdi-note-plus"
                            >Add Course</v-btn
                        >
                    </v-col>
                </v-row>
                <h1>There are no courses added yet.</h1>
            </v-window-item>
            <v-window-item value="reports"></v-window-item>
        </v-window>
    </v-container>
    <AddCourse v-model="showAddCourse" />
</template>

<script>
import AddCourse from '../AddCourse.vue';

export default {
    components: { AddCourse },
    data() {
        return { tab: 'course', showAddCourse: false, courses: [] };
    },
    mounted() {
        this.$store
            .dispatch('courseModule/fetchCoursesFromDB')
            .then((res) => {
                this.courses = res;
            })
            .catch((e) => {
                this.$store.commit('notificationModule/setAlert', {
                    alertMessage: e.message,
                    error: true,
                });
            });
    },
};
</script>
