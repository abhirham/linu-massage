import { db, storageRef } from '@/libs/firebase';

export default {
    name: 'courseModule',
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async addCourseToDB({ dispatch }, { image, pdf, ...payload }) {
            let docRef = db.collection('courses').doc();

            let promiseArr = image
                .concat(pdf)
                .map((x) =>
                    dispatch('uploadFile', { file: x, name: docRef.id })
                );

            let [imageUrl, pdfUrl] = await Promise.all(promiseArr);

            return Promise.all([
                docRef.set({ ...payload, imageUrl, id: docRef.id }),
                docRef.collection('resources').add({ pdf: pdfUrl }),
            ]);
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
    },
};
