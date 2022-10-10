<template>
    <v-app class="primary">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm12 md4>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-card class="elevation-4 rounded-xl justify-center align-center" style="padding: 24px;">
                    
                            <v-card-title class="justify-center">
                                <center>
                                    Patrol Taru
                                </center>
                            </v-card-title>
                            <v-card-text>
                                <v-alert v-if="isSuccess"
                                    icon="mdi-check-circle"
                                    prominent
                                    text
                                    type="success"
                                    style="margin-bottom: 24px;"
                                    >
                                    <span style="margin-left: 16px;" class="body-text green--text light-bold-text">Registrasi berhasil, silahkan login kembali. </span>
                                </v-alert>
                                <v-text-field
                                    ref="username"
                                    v-model="username"
                                    :rules="[() => !!username || 'This field is required']"
                                    :error-messages="errorUsername"
                                    :disabled="loading"
                                    label="Username"
                                    placeholder="Username"
                                    required
                                    clearable
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    ref="email"
                                    v-model="email"
                                    :rules="[() => !!email || 'This field is required']"
                                    :error-messages="errorEmail"
                                    :disabled="loading"
                                    label="Alamat Email"
                                    placeholder="Email"
                                    required
                                    clearable
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[() => !!password || 'This field is required']"
                                    :error-messages="errorPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    :disabled="loading"
                                    name="input-10-2"
                                    label="Password"
                                    hint="Password"
                                    v-model="password"
                                    required
                                    @click:append="showPassword = !showPassword"
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[() => !!confirmPass || 'This field is required']"
                                    :error-messages="errorConfirmPass"
                                    :type="showPassword ? 'text' : 'password'"
                                    :disabled="loading"
                                    name="input-10-2"
                                    label="Konfirmasi Password"
                                    hint="Konfirmasi Password"
                                    v-model="confirmPass"
                                    required
                                    @click:append="showPassword = !showPassword"
                                    outlined
                                ></v-text-field>
                            
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    block
                                    @click="register"
                                    :loading="loading"
                                    style="margin-bottom: 16px;"
                                >
                                    Register
                                </v-btn>
                                
                            </v-card-actions>
                        </v-card>
                    </v-form>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
    </v-app>
</template>
<script>
export default {
    auth: false,

    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            showPassword: false,
            loading: false,
            isSuccess: false,
            errorUsername: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPass: '',
            valid: false,
            roles: [],
        }
    },

    mounted() {
        // this.getRoles();
    },

    methods: {
        async getRoles() {
            this.loading = true;
            try {
                
                const reqRoles = await this.$roles.getRole({
                    $skip: 0,
                    $limit: 50,
                });

                this.roles = reqRoles.data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },

        async register() {
            this.loading = true;
            
            try {
                if (this.$refs.form.validate() && this.password === this.confirmPass) {

                    const req = await this.$users.createUser({
                        "username": this.username,
                        "email": this.email,
                        "password": this.password,
                        "status": "active"
                    });

                    this.loading = false
                    this.isSuccess = true;
                    setTimeout(() => {
                        window.location = "/login";
                    }, 2000);
                } else {
                    if (this.password != this.confirmPass) {
                        alert("Password harus sama!");
                        this.loading = false
                        this.isSuccess = false;
                        return;
                    }
                    alert("Isi semua field terlebih dahulu")
                    this.loading = false
                    this.isSuccess = false;
                }
            } catch (error) {
                console.log(error);
                this.loading = false
                this.isSuccess = false;
                alert('Gagal melakukan registrasi')
            }
        }
    }
}
</script>