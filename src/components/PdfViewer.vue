<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        persistent
        no-click-animation
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer />
            </v-toolbar>
            <div
                id="pdf-container"
                class="d-flex flex-wrap justify-center"
            ></div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
#pdf-container {
    gap: 20px 2px;
    background: #202124;
    max-width: 100vw;
}
</style>

<script>
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default {
    props: ['url'],
    data() {
        return { dialog: false };
    },
    mounted() {
        this.dialog = true;
        const loadingTask = pdfjsLib.getDocument(this.url);

        loadingTask.promise.then((pdf) => {
            Promise.all(
                new Array(pdf.numPages).fill().map((_, x) => {
                    return pdf.getPage(x + 1).then((page) => {
                        const scale = 1.5; // Adjust as needed
                        const viewport = page.getViewport({
                            scale: calculateScale(),
                        });

                        function calculateScale() {
                            const containerWidth =
                                document.getElementById(
                                    'pdf-container'
                                ).clientWidth;
                            let desiredWidth = containerWidth - 20;

                            const maxScale = 1.5; // Maximum zoom-in
                            const minScale = 0.7; // Maximum zoom-out
                            const originalWidth = page.view[2];

                            // Ensure desiredWidth doesn't lead to a scale beyond our limits
                            if (desiredWidth / originalWidth > maxScale) {
                                desiredWidth = originalWidth * maxScale;
                            } else if (
                                desiredWidth / originalWidth <
                                minScale
                            ) {
                                desiredWidth = originalWidth * minScale;
                            }

                            return desiredWidth / page.view[2];
                        }

                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };

                        return page
                            .render(renderContext)
                            .promise.then(() => canvas);
                    });
                })
            )
                .then((res) => {
                    res.forEach((x) => {
                        document.getElementById('pdf-container').appendChild(x);
                    });
                })
                .finally(() => this.$swal.close());
        });
    },
};
</script>
