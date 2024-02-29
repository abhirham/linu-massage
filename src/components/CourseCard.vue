<template>
    <v-card variant="outlined" class="border-0">
        <v-img cover :aspect-ratio="16 / 9" :src="imageUrl"></v-img>
        <v-card-item>
            <div class="font-weight-bold course-price mb-1 text-secondary">
                ${{ price }} CAD
            </div>
            <div class="text-h6 mb-1">{{ title }}</div>
            <div>Course {{ lessons }} Lessons</div>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>

<script>
export default {
    props: {
        price: { required: true },
        lessons: { required: true },
        imageUrl: { required: true },
        title: { required: true },
    },
    data() {
        return {};
    },
};
</script>
