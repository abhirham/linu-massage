<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-secondary">$99.99 CAD</div>
                <h1>Strive 15: Practice in a Self-Reflective Manner</h1>
                <div>Course . 33 Lessons</div>
                <v-btn class="mt-7" color="primary">buy now</v-btn>
            </v-col>
            <v-col>
                <v-img
                    src="https://d31ezp3r8jwmks.cloudfront.net/p0jod2nhkm5c7x8mggzuz0b91zb5"
                ></v-img>
            </v-col>
        </v-row>
        <h1>Contents</h1>
        <h3 class="mt-10 font-weight-medium">Course Outline</h3>

        <template v-for="(item, idx) in content" :key="item.title">
            <div>
                <h2>Module {{ idx + 1 }}: {{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <p
                    class="my-2 d-flex align-items-center"
                    v-for="x in item.headers"
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
    props: ['courseName'],
    data() {
        return {
            content: [
                {
                    title: 'Introduction to Self-Reflection',
                    description:
                        "Self-reflection is an essential aspect of any professional practice, including massage therapy. It involves the process of examining one's thoughts, actions, and behaviors to gain insight into oneself and one's practice.",
                    headers: [
                        'Definition and importance of self-reflection in massage therapy practice',
                        'Benefits and challenges of self-reflection',
                        'Techniques for self-reflection',
                    ],
                },
                {
                    title: 'Self-Awareness',
                    description:
                        "In massage therapy, self-awareness is a crucial aspect of providing safe and effective treatment to clients. It involves understanding one's own values, biases, and assumptions and recognizing how these factors can impact the therapeutic relationship.",
                    headers: [
                        "Understanding one's own values, biases, and assumptions",
                        'Recognizing how these factors can impact the therapeutic relationship',
                        'Developing self-awareness through introspection and feedback from others',
                    ],
                },
                {
                    title: 'Professional Boundaries',
                    description:
                        'Professional boundaries are essential for maintaining a safe and ethical practice in massage therapy. These boundaries refer to the limits of the therapeutic relationship between the massage therapist and the client.',
                    headers: [
                        'Definition and importance of professional boundaries in massage therapy',
                        'Common boundary violations and their consequences',
                        'Strategies for maintaining appropriate professional boundaries',
                    ],
                },
                {
                    title: 'Managing Countertransference',
                    description:
                        'Countertransference is a term used to describe the emotional response of a therapist to a client, which may interfere with the therapeutic relationship.',
                    headers: [
                        'Definition of countertransference',
                        'Importance of managing countertransference',
                        'Signs of countertransference',
                    ],
                },
                {
                    title: 'Ethical Decision-Making',
                    description:
                        'Massage therapists are required to make ethical decisions on a daily basis when providing care to their clients. It is crucial for them to understand the ethical principles and values that guide massage therapy practice.',
                    headers: [
                        'Understanding the ethical principles and values',
                        'Identifying ethical dilemmas and making ethical decisions',
                        'Applying ethical reasoning to real-life scenarios',
                    ],
                },
                {
                    title: 'Continuous Professional Development',
                    description:
                        'As a massage therapist, it is essential to engage in continuous professional development (CPD) to maintain and improve skills and knowledge.',
                    headers: [
                        'Definition and importance of CPD',
                        'Types of CPD activities and resources',
                        'Developing a personal CPD plan',
                    ],
                },
            ],
        }
    },
}
</script>
