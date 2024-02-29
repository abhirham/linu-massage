<template>
    <v-container>
        <h1>Admin Panel</h1>
        <v-tabs v-model="tab" class="mb-3">
            <v-tab value="course">Courses</v-tab>
            <v-tab value="reports">Resports</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="course">
                <v-row class="mb-3">
                    <v-col cols="6">
                        <v-text-field
                            v-model="search"
                            prepend-inner-icon="mdi-magnify"
                            density="compact"
                            label="Search"
                            single-line
                            flat
                            hide-details
                            variant="solo-filled"
                        ></v-text-field>
                    </v-col>
                    <v-spacer />
                    <v-col cols="auto">
                        <v-btn
                            color="btn-blue"
                            @click="showAddCourse = true"
                            prepend-icon="mdi-note-plus"
                            >Add Course</v-btn
                        >
                    </v-col>
                </v-row>

                <v-data-table
                    v-model:search="search"
                    :items="courses"
                    :headers="headers"
                    density="compact"
                >
                    <template #item.imageUrl="{ value }">
                        <v-card class="my-2" elevation="2" rounded>
                            <v-img :src="value" height="64" cover></v-img>
                        </v-card>
                    </template>
                    <template #item.pdf="{ item }">
                        <v-btn color="primary" size="small">View</v-btn>
                    </template>
                    <template #item.actions="{ item }">
                        <v-icon
                            size="small"
                            class="me-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon size="small" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-window-item>
            <v-window-item value="reports"></v-window-item>
        </v-window>
    </v-container>
    <AddCourse v-model="showAddCourse" />
</template>

<script>
import AddCourse from '../AddCourse.vue';
import CourseCard from '../CourseCard.vue';
import Swal from 'sweetalert2';

export default {
    components: { AddCourse, CourseCard },
    data() {
        return {
            tab: 'course',
            showAddCourse: false,
            courses: [],
            search: '',
            headers: [
                { title: 'Image', key: 'imageUrl' },
                { title: 'Name', key: 'title' },
                { title: 'PDF', key: 'pdf' },
                { title: 'Price', key: 'price' },
                { title: 'Actions', key: 'actions' },
            ],
        };
    },
    methods: {
        deleteItem(item) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to delete '${item.title}'?`,
                icon: 'warning',
                confirmButtonText: 'Delete',
            }).then((res) => {
                if (!res.isConfirmed) return;
                Swal.fire({ text: 'Loading...', allowOutsideClick: false });
                Swal.showLoading();

                this.$store
                    .dispatch('courseModule/deleteCourseById', {
                        id: item.id,
                    })
                    .then((res) => {
                        this.courses = this.courses.filter(
                            (x) => x.id !== item.id
                        );
                        this.$store.commit('notificationModule/setAlert', {
                            alertMessage: 'Course has been deleted.',
                        });
                    })
                    .finally(() => Swal.close());
            });
        },
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
