<template>
    <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        max-width="500"
    >
        <v-card
            style="padding: 16px;"
        >
            <v-card-title class="subtitle-text">
                Add New User
            </v-card-title>
            <v-card-text>
                <v-alert v-if="isError"
                    icon="mdi-alert"
                    prominent
                    text
                    type="error"
                    style="margin-bottom: 24px;"
                    >
                        <span style="margin-left: 16px;" class="body-text red--text light-bold-text text-center">{{ errorMsg }}</span>
                </v-alert>
                <v-form ref="formUser">
                    <label class="body-text">Email</label>
                    <v-text-field
                        ref="email"
                        v-model="email"
                        :rules="[() => !!email || 'This field is required']"
                        outlined
                        dense
                        clearable
                        required
                    ></v-text-field>
                    <label class="body-text">Password</label>
                    <v-text-field
                        ref="password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        outlined
                        dense
                        clearable
                        required
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <label class="body-text">Confirm Password</label>
                    <v-text-field
                        ref="confirmPass"
                        v-model="confirmPass"
                        :type="showPassword ? 'text' : 'password'"
                        outlined
                        dense
                        clearable
                        required
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <label class="body-text">Username</label>
                    <v-text-field
                        ref="username"
                        v-model="username"
                        :rules="[() => !!username || 'This field is required']"
                        outlined
                        dense
                        clearable
                        required
                    ></v-text-field>
                    <label class="body-text">Role</label>
                    <v-autocomplete
                        v-model="role"
                        :items="roles"
                        item-text="description"
                        item-value="_id"
                        outlined
                        dense
                        required
                    ></v-autocomplete>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    class="body-text"
                    @click="close"
                >
                    <b>Kembali</b>
                </v-btn>
                <v-btn
                    color="green"
                    class="body-text white--text"
                    @click="isEdit ? updateUser() : createUser()"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'AddUserDialog',
    props: {
        dialog: {
            default: false
        },
        
        title: {
            default: process.env.title,
        },
        isEdit: {
            default: false
        },
        email: {
            default: '',
        },
        username: {
            default: '',
        },
        role: {
            default: '',
        },
        idUser: {
            default: '',
        },
        closeDialog: Boolean
    },
    data() {
        return {
            password: '',
            confirmPass: '',
            showPassword: false,
            loading: false,
            isError: false,
            errorMsg: "Gagal membuat data user, silahkan coba lagi",
            roles: [],
        }
    },
    mounted() {
        this.getRoles();
    },

    methods: {
        close() {
            this.$emit('update:dialog', false)
        },

        async getRoles() {
            try {
                
                const reqRoles = await this.$roles.getRole({
                    $skip: 0,
                    $limit: 50,
                });

                this.roles = reqRoles.data;
            } catch (error) {
                console.log(error);
            }
        },

        async createUser() {
            this.loading = true;
            try {
                if (!this.$refs.formUser.validate()) {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.errorMsg = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.loading = false;
                    
                    return;
                }

                if (this.password != this.confirmPass) {
                    this.errorMsg = "Password tidak sama"
                    this.isError = true;
                    this.loading = false;
                    
                    return;
                }

                const reqUser = await this.$users.createUser({
                    "username": this.username,
                    "email": this.email,
                    "password": this.password,
                    "roleId": this.role
                });

                this.loading = false;
                this.isError = false;
                window.location.reload();
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        },

        async updateUser() {
            this.loading = true;
            try {
                if (this.email === '' && this.username === '' && this.role === '') {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.errorMsg = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.loading = false;
                    
                    return;
                }

                if (this.password != this.confirmPass) {
                    this.errorMsg = "Password tidak sama"
                    this.isError = true;
                    this.loading = false;
                    
                    return;
                }

                const reqUser = await this.$users.editUser(this.idUser, {
                    "username": this.username,
                    "email": this.email,
                    "password": this.password,
                    "roleId": this.role
                });

                this.loading = false;
                this.isError = false;
                window.location.reload();
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        }
    }
}
</script>