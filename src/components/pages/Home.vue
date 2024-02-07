<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6" order="2">
                <h1>Healing Touch Spa & Wellness Centre</h1>
                <div>
                    Experience the pinnacle of massage therapy expertise with
                    Healing Touch Spa & Wellness Centre's online courses.
                    Elevate your skills, anywhere, anytime, with our Massage
                    Therapy Mastery Online.
                </div>
            </v-col>
            <v-col cols="12" md="5" order-md="3">
                <v-img
                    src="https://d31ezp3r8jwmks.cloudfront.net/p0jod2nhkm5c7x8mggzuz0b91zb5"
                ></v-img>
            </v-col>
        </v-row>
    </v-container>
    <div class="bg-primary">
        <v-container>
            <h1>all courses</h1>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    v-for="(course, idx) in courses"
                    :key="idx"
                >
                    <v-card variant="outlined" class="border-0">
                        <v-img
                            src="https://d31ezp3r8jwmks.cloudfront.net/p0jod2nhkm5c7x8mggzuz0b91zb5"
                        ></v-img>
                        <v-card-item>
                            <div class="text-overline mb-1 text-secondary">
                                ${{ course.price }} CAD
                            </div>
                            <div class="text-h6 mb-1">{{ course.title }}</div>
                            <div>Course {{ course.lessons }} Lessons</div>
                            <v-card-actions>
                                <v-btn class="bg-btn-blue">view course</v-btn>
                            </v-card-actions>
                        </v-card-item>
                    </v-card>
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
export default {
    data() {
        return {
            courses: [
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
                {
                    title: 'Strive 15: Practice in a Self-Reflective Manner',
                    price: '99.99',
                    lessons: 33,
                },
            ],
        }
    },
}
</script>

<style scoped>
.border-0 {
    border: none;
}
</style>
