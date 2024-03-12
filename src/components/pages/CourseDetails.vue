<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" order-md="2">
                <v-img :src="course.imageUrl"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <div class="text-secondary">${{ course.price }} CAD</div>
                <h1>{{ course.title }}</h1>
                <div>Course . {{ course.lessons }} Lessons</div>
                <v-btn class="mt-7" color="primary">buy now</v-btn>
            </v-col>
        </v-row>
        <h1>Contents</h1>
        <h3 class="mt-10 font-weight-medium">Course Outline</h3>

        <template v-for="(item, idx) in course.modules" :key="item.title">
            <div class="mt-2">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <p
                    class="my-2 d-flex align-items-center"
                    v-for="x in item.contents"
                    :key="x"
                >
                    <v-icon>mdi-circle-medium</v-icon>{{ x }}
                </p>
            </div>
        </template>
    </v-container>
</template>

<script>
export default {
    props: ['courseId'],
    data() {
        return {
            course: {},
        };
    },
    mounted() {
        this.$store
            .dispatch('courseModule/fetchCourseById', { id: this.courseId })
            .then((res) => {
                if (!res.exists) {
                    this.$router.push({ name: 'NotFound' });
                    return;
                }

                this.course = res.data;
            });
    },
};
</script>
