<template>
    <div id="pdf-container"></div>
</template>

<script>
// import pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import * as pdfjsLib from '@/libs/pdfjs/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = '@/libs/pdfjs/pdf.worker';

// import * as pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";
// import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
// import 'pdfjs-dist/web/pdf_viewer.css';

export default {
    data() {
        return {};
    },

    mounted() {
        return;
        const url =
            'https://firebasestorage.googleapis.com/v0/b/healing-touch-spa.appspot.com/o/pdfs%2FhCOgCNONwUqziJ8mlAyE.pdf?alt=media&token=768b900e-18a5-41e5-8969-2f83ecbe35f2';
        const loadingTask = pdfjsLib.getDocument(url);

        loadingTask.promise.then((pdf) => {
            const pageNum = 1;
            pdf.getPage(pageNum).then((page) => {
                // 1. Get a viewport for the desired scale
                const scale = 1.5; // Adjust as needed
                const viewport = page.getViewport({ scale });

                // 2. Prepare a canvas for rendering
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // 3. Render the page on the canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext).promise.then(() => {
                    // 4. Append the canvas to your container
                    document
                        .getElementById('pdf-container')
                        .appendChild(canvas);
                });
            });
        });
    },
};
</script>
