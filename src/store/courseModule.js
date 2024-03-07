import { db, storageRef } from '@/libs/firebase';
import moment from 'moment';

export default {
    name: 'courseModule',
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async addCourseToDB(
            { dispatch },
            { image, pdf, id = undefined, ...payload }
        ) {
            let docRef = db.collection('courses').doc(id);

            let promiseArr = image
                .concat(pdf)
                .map((x) =>
                    dispatch('uploadFile', { file: x, name: docRef.id })
                );

            let [imageUrl, pdfUrl] = await Promise.all(promiseArr);

            if (id === undefined) {
                payload.createdAt = moment().format();
            }
            payload.updatedAt = moment().format();

            if (imageUrl) payload.imageUrl = imageUrl;

            promiseArr = [
                docRef.set({ ...payload, id: docRef.id }, { merge: true }),
            ];

            if (pdfUrl)
                promiseArr.push(
                    docRef
                        .collection('resources')
                        .doc('resources')
                        .set({ pdf: pdfUrl }, { merge: true })
                );

            return Promise.all(promiseArr);
        },
        fetchCoursesFromDB() {
            return db
                .collection('courses')
                .get()
                .then((qs) => {
                    let arr = [];

                    qs.forEach((x) => arr.push(x.data()));

                    return arr;
                });
        },
        async uploadFile(_, { file, name }) {
            let folder = file.type.indexOf('pdf') > -1 ? 'pdfs' : 'images';

            let ext = {
                pdfs: '.pdf',
                images: '.jpeg',
            };

            let fileRef = storageRef.child(`${folder}/${name}${ext[folder]}`);
            return fileRef.put(file).then((res) => fileRef.getDownloadURL());
        },
        fetchCourseById(_, { id }) {
            return db
                .collection('courses')
                .doc(id)
                .get()
                .then((res) => ({ data: res.data(), exists: res.exists }));
        },
        async deleteCourseById({}, { id }) {
            let promiseArr = [
                db.collection('courses').doc(id).delete(),

                storageRef.child(`images/${id}.jpeg`).delete(),
                storageRef.child(`pdfs/${id}.pdf`).delete(),
            ];

            db.collection('courses')
                .doc(id)
                .collection('resources')
                .get()
                .then((res) => {
                    res.forEach((x) => promiseArr.push(x.ref.delete()));
                });

            return Promise.all(promiseArr);
        },
        fetchPDFResources({}, { id }) {
            return db
                .collection('courses')
                .doc(id)
                .collection('resources')
                .doc('resources')
                .get()
                .then((res) => {
                    if (!res.exists)
                        throw {
                            message:
                                'The resource you are looking for doesnt exist.',
                        };
                    return res.data();
                });
        },
    },
};
