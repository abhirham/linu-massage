<template>
    <v-container>
        <h1>Admin Panel</h1>
        <v-card flat>
            <v-tabs v-model="tab">
                <v-tab value="course">Courses</v-tab>
                <v-tab value="reports">Resports</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="course">
                        <v-row justify="end">
                            <v-btn
                                color="btn-blue"
                                @click="showAddCourse = true"
                                >Add Course</v-btn
                            >
                        </v-row>
                    </v-window-item>
                    <v-window-item value="reports"></v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
    <AddCourse v-model="showAddCourse" />
</template>

<script>
import AddCourse from '../AddCourse.vue';

export default {
    components: { AddCourse },
    data() {
        return { tab: 'course', showAddCourse: false };
    },
};
</script>
