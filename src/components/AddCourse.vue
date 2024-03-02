<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        persistent
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-form v-model="isValid" ref="form" @submit.prevent="onSubmit">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        class="bg-btn-blue mr-3"
                        prepend-icon="mdi-content-save"
                        variant="elevated"
                        type="submit"
                        :loading="uploadingFile"
                        >Save</v-btn
                    >
                </v-toolbar>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6"
                            ><v-file-input
                                label="Course Image"
                                variant="outlined"
                                prepend-icon="mdi-image"
                                accept=".jpg,.png,.svg"
                                v-model="image"
                                :rules="validation_rules.required"
                            ></v-file-input
                        ></v-col>
                        <v-col cols="12" sm="6"
                            ><v-file-input
                                label="Course PDF"
                                variant="outlined"
                                prepend-icon="mdi-file-pdf-box"
                                accept=".pdf"
                                v-model="pdf"
                                :rules="validation_rules.required"
                            ></v-file-input
                        ></v-col>
                        <v-col>
                            <v-text-field
                                label="Title"
                                variant="outlined"
                                v-model="title"
                                :rules="validation_rules.required"
                            />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field
                                label="Price"
                                variant="outlined"
                                type="number"
                                v-model="price"
                                :rules="validation_rules.required"
                            />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field
                                label="# Lessons"
                                variant="outlined"
                                type="number"
                                v-model="lessons"
                                :rules="validation_rules.required"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="mb-3">
                        <v-col cols="4">
                            <h2>Modules</h2>
                            <v-divider :thickness="3" color="info"></v-divider>
                        </v-col>
                    </v-row>
                    <v-card
                        v-for="(module, idx) in modules"
                        :key="`m-${idx}`"
                        class="mb-5"
                        variant="outlined"
                    >
                        <v-card-title class="d-flex">
                            <v-spacer />
                            <v-btn
                                color="btn-blue"
                                prepend-icon="mdi-trash-can-outline"
                                @click="
                                    modules = modules.filter(
                                        (x, i) => i !== idx
                                    )
                                "
                                >Delete Module</v-btn
                            >
                        </v-card-title>
                        <v-card-text class="pb-0">
                            <v-text-field
                                label="Title"
                                variant="outlined"
                                v-model="module.title"
                                :rules="validation_rules.required"
                            ></v-text-field>
                            <v-textarea
                                label="Description"
                                variant="outlined"
                                v-model="module.description"
                                :rules="validation_rules.required"
                            ></v-textarea>

                            <v-text-field
                                v-for="(_, idx) in module.contents"
                                :key="`c-${idx}`"
                                prepend-icon="mdi-circle-medium"
                                append-icon="mdi-trash-can-outline"
                                :rules="validation_rules.required"
                                @click:append="
                                    module.contents = module.contents.filter(
                                        (x, i) => i !== idx
                                    )
                                "
                                variant="outlined"
                                v-model="module.contents[idx]"
                                placeholder="Content"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                color="btn-blue"
                                @click="module.contents.push('')"
                                prepend-icon="mdi-plus"
                                >Add Content</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                    <v-btn
                        @click="addModule"
                        prepend-icon="mdi-card-plus"
                        color="primary"
                        >Add Module</v-btn
                    >
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    inject: ['validation_rules'],
    props: ['modelValue'],
    emits: ['update:modelValue'],
    computed: {
        dialog: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            },
        },
    },
    data() {
        return {
            title: '',
            price: '',
            lessons: '',
            modules: [],
            isValid: false,
            image: [],
            pdf: [],
            uploadingFile: false,
        };
    },
    methods: {
        addModule() {
            this.modules = [
                ...this.modules,
                { title: '', description: '', contents: [''] },
            ];
        },
        async onSubmit() {
            if (!this.isValid) return;

            this.uploadingFile = true;
            let { title, price, lessons, modules, image, pdf } = this;

            this.$store
                .dispatch('courseModule/addCourseToDB', {
                    title,
                    price,
                    lessons,
                    modules,
                    image,
                    pdf,
                })
                .finally(() => {
                    this.uploadingFile = false;
                    this.dialog = false;
                    this.$store.commit('notificationModule/setAlert', {
                        alertMessage: 'Course has been added successfully.',
                    });
                });
        },
        onSaveClick() {
            this.$refs.form.submit();
        },
    },
    mounted() {
        this.addModule();
    },
};
</script>
