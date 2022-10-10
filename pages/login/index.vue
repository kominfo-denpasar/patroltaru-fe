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
                                    <v-img :src="imgAppbar" max-height="40" max-width="170" contain style="margin-bottom: 24px;"></v-img>
                                </center>
                            </v-card-title>
                            <v-card-text>
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
                            
                            </v-card-text>
                            <v-card-actions>
                                <v-col align="center">
                                    <v-btn
                                        color="primary"
                                        block
                                        @click="login"
                                        :loading="loading"
                                        style="margin-bottom: 16px;"
                                    >
                                        Login
                                    </v-btn>
                                    <span>Belum punya akun ?</span>
                                    <span class="text--primary"><b><a href="/register">Registrasi disini</a></b></span>
                                </v-col>
                                
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
            password: '',
            showPassword: false,
            loading: false,
            errorUsername: '',
            errorPassword: '',
            valid: false,
            imgAppbar: require('@/assets/img/logo-appbar.png'),
        }
    },

    methods: {
        async login() {
            this.loading = true;
            
            try {
                if (this.$refs.form.validate()) {

                    const req = await this.$auth.loginWith('local', {
                        data:  {
                            "username": this.username,
                            "password": this.password,
                            "strategy": "local"
                        }
                    })

                    const reqUser = await this.$users.getUserById(req.data.user._id, {
                        '$populate[0]': 'roleId',
                    });
                    this.$auth.setUser(reqUser)
                    this.$auth.$storage.setLocalStorage("userMe", reqUser)

                    this.loading = false;
                    window.location = "/dashboard/report";
                }
            } catch (error) {
                console.log(error);
                this.loading = false
                alert('Username / Password Salah !')
            }
        }
    }
}
</script>