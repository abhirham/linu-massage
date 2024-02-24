<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn
                    class="bg-btn-blue mr-3"
                    prepend-icon="mdi-content-save"
                    variant="elevated"
                    >Save</v-btn
                >
                <v-form></v-form>
            </v-toolbar>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Title"
                                variant="outlined"
                                v-model="title"
                            />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field
                                label="Price"
                                variant="outlined"
                                type="number"
                                v-model="price"
                            />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field
                                label="# Lessons"
                                variant="outlined"
                                type="number"
                                v-model="lessons"
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
                            Module {{ idx + 1 }}
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
                            ></v-text-field>
                            <v-textarea
                                label="Description"
                                variant="outlined"
                                v-model="module.description"
                            ></v-textarea>

                            <v-text-field
                                v-for="(_, idx) in module.contents"
                                :key="`c-${idx}`"
                                prepend-icon="mdi-circle-medium"
                                append-icon="mdi-trash-can-outline"
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
        return { title: '', price: '', lessons: '', modules: [] };
    },
    methods: {
        addModule() {
            this.modules = [
                ...this.modules,
                { title: '', description: '', contents: [''] },
            ];
        },
    },
    mounted() {
        this.addModule();
    },
};
</script>
