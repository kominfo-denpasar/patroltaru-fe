<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-col>
                <v-card id="card-nav" style="padding: 8px; width: 100%; margin-top: 16px; background-color: #e2e2e2;" elevation="0">
                    <v-card-text style="margin-top: 4px; margin-left: 8px;">
                        <v-row >
                            <span class="body-text" >Dashboard </span>
                            <v-icon>mdi-chevron-right</v-icon>
                            <span class="body-text"><b>Account</b></span>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-row no-gutters align="start" justify="start" style="margin-top: 24px; margin-bottom: 24px;">
                    <v-btn depressed tile :outlined="index == 1" @click="index = 0" large :style="index == 0 ? 'background-color: #cccccc;' : 'background-color: white;'" :class="index == 0 ? 'btn-outline-disable' : 'btn-outline-disable'">
                        <v-icon small>mdi-account-key</v-icon>
                        <span style="margin-left: 8px;">Manage Account</span>
                    </v-btn>
                    <v-btn depressed tile :outlined="index == 0" @click="index = 1" large :style="index == 1 ? 'background-color: #cccccc;' : 'background-color: white;'" :class="index == 1 ? 'btn-outline-disable' : 'btn-outline-disable'">
                        <v-icon small>mdi-briefcase-account</v-icon>
                        <span style="margin-left: 8px;">Update Official Profile</span>
                    </v-btn>
                </v-row>

                <v-alert v-if="isEdit"
                    icon="mdi-shield-lock-outline"
                    prominent
                    text
                    type="info"
                    style="margin-bottom: 24px;"
                >
                    <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>isi profile</b> dibawah ini lalu tambahkan untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                </v-alert>
                <v-alert v-if="isSuccess"
                    icon="mdi-check-circle"
                    prominent
                    text
                    type="success"
                    style="margin-bottom: 24px;"
                    >
                    <span style="margin-left: 16px;" class="body-text green--text light-bold-text">Selamat! Profile berhasil disimpan. Terima Kasih. </span>
                </v-alert>
                <v-alert v-if="isError"
                    icon="mdi-alert"
                    prominent
                    text
                    type="error"
                    style="margin-bottom: 24px;"
                    >
                    <span style="margin-left: 16px;" class="body-text red--text light-bold-text">{{ errorMsg }}</span>
                </v-alert>

                <v-col v-if="index == 0" style="margin-top: 24px;">
                    
                    <v-row align="center" style="padding-top: 24px;">
                        <span class="subtitle-text">Manage Account</span>
                        <v-btn class="body-text white--text" :color="isEdit ? 'red' : 'blue'" small style="margin-left: 16px;" @click="isEdit = !isEdit; isError = false; isSuccess = false;">
                            <v-icon small>{{ isEdit ? 'mdi-close' : 'mdi-account-edit' }}</v-icon>
                            <span style="margin-left: 4px;">{{isEdit ? 'Cancel' : 'Edit'}}</span>
                        </v-btn>
                    </v-row>
                    
                    <v-col cols="6" style="margin-top: 48px; padding: none;">
                        <label class="body-text">Email</label>
                        <div v-if="!isEdit"><label class="body-text" ><b>{{ email }}</b></label></div>
                        <v-text-field v-else
                            v-model="email"
                            label=""
                            outlined
                            dense
                            clearable
                        ></v-text-field>

                        <div :style="isEdit ? 'margin-top: 0px;' : 'margin-top: 16px;'"></div>
                        <label class="body-text" >Username</label>
                        <div v-if="!isEdit"><label class="body-text" ><b>{{ username }}</b></label></div>
                        <v-text-field v-else
                            v-model="username"
                            label=""
                            outlined
                            dense
                            clearable
                        ></v-text-field>

                        <div :style="isEdit ? 'margin-top: 0px;' : 'margin-top: 16px;'"></div>
                        <label class="body-text" v-if="!isEdit">Peran</label>
                        <div v-if="!isEdit"><label class="body-text" ><b>{{ role }}</b></label></div>

                        <div :style="isEdit ? 'margin-top: 0px;' : 'margin-top: 16px;'"></div>
                        <label class="side-menu-text" v-if="isEdit"><em>Isi hanya jika ingin mengganti password</em></label><br>
                        <label class="body-text" v-if="isEdit">Password</label>
                        <v-text-field  v-if="isEdit"
                            v-model="password"
                            label=""
                            outlined
                            dense
                            clearable
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :error-messages="errorPassword"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>

                        <div :style="isEdit ? 'margin-top: 0px;' : 'margin-top: 16px;'"></div>
                        <label class="body-text" v-if="isEdit">Confirm Password</label>
                        <v-text-field  v-if="isEdit"
                            v-model="confirmPass"
                            label=""
                            outlined
                            dense
                            clearable
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :error-messages="errorPassword"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>

                        <v-btn depressed block color="blue" class="white--text" :loading="loading" v-if="isEdit" @click="updateAccount">
                            Ubah Akun
                        </v-btn>
                    </v-col>
                </v-col>

                <v-col v-else style="margin-top: 24px;">
                    <v-alert
                        icon="mdi-shield-lock-outline"
                        prominent
                        text
                        type="info"
                        style="margin-bottom: 24px;"
                        >
                        <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>isi profile</b> dibawah ini lalu tambahkan untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                    </v-alert>
                    <v-layout style="margin-bottom: 16px;"><span class="subtitle-text">Profile</span></v-layout>
                    
                    <v-form v-model="formProfile" ref="formProfile">
                        <v-row>
                            <v-col cols="6">
                                <label class="body-text">Nomor Induk Kependudukan (NIK)</label>
                                <v-text-field
                                    v-model="nik"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Nomor Induk Pegawai (NIP)</label>
                                <v-text-field
                                    v-model="nip"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Nama Lengkap</label>
                                <v-text-field
                                    v-model="name"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <label class="body-text" style="margin-top: 24px;">Pangkat Kepegawaian (Contoh: Pembina Muda)</label>
                                <v-text-field
                                    v-model="rank"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text" style="margin-top: 24px;">Golongan (Contoh: IVA)</label>
                                <v-text-field
                                    v-model="golongan"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text" style="margin-top: 24px;">Posisi (Contoh: Kepala Seksi Pengendalian Pemanfaatan Ruang)</label>
                                <v-text-field
                                    v-model="position"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-row style="margin-top: 16px;">
                        <v-col cols="4" align="start" justify="start">
                            <v-btn depressed block color="blue" class="white--text" :loading="loading" @click="idProfile ? updateOfficialProfile() : createOfficialProfile()">
                                Tambahkan Profile
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-col>
            
        </v-layout>
    </v-container>
</template>
<script>


export default {
    auth: true,
    
    data() {
        return {
            index: 0,
            //manage acc
            email: '',
            username: '',
            role: '',
            id: '',
            idProfile: '',

            // official profile
            name: '',
            nip: '',
            nik: '',
            rank: '',
            position: '',
            golongan: '',
            password: '',
            confirmPass: '',
            formProfile: false,
            isEdit: false,
            userMe: {},
            loading: false,
            isSuccess: false,
            isError: false,
            showPassword: false,
            errorMsg: "Gagal menyimpan data profile, silahkan coba lagi"
        }
    },

    mounted() {
        this.getProfileAndUser();
    },

    methods: {
        async getProfileAndUser() {
            this.userMe = await this.$users.getUserById(this.$auth.$storage.getLocalStorage("userMe")._id, {
                "$populate": "role"
            });
            this.email = this.userMe.email;
            this.username = this.userMe.username;
            this.role = this.userMe.role.name;
            this.id = this.userMe._id;

            this.getProfileByUserId();
        },

        async updateAccount() {
            this.loading = true;
            try {
                if (this.password && this.confirmPass && this.password != this.confirmPass) {
                    this.errorMsg = "Password tidak sama"
                    this.isError = true;
                    this.isSuccess = false;
                    this.loading = false;
                    
                    return;
                }
                const req = await this.$users.editUser(this.userMe._id, {
                    "username": this.username,
                    "email": this.email,
                    "roleId": this.userMe.roleId,
                    "password": this.password && this.confirmPass && this.password === this.confirmPass ? this.password : null
                })

                this.password = "";
                this.confirmPass = "";

                this.loading = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async getProfileByUserId() {
            this.loading = true;
            try {
                const profile = await this.$profiles.getProfile({
                    userId: this.id,
                });

                if (profile.total > 0) {
                    this.idProfile = profile.data[0]._id;
                    this.nik = profile.data[0].NIK;
                    this.nip = profile.data[0].NIP;
                    this.name = profile.data[0].fullName;
                    this.rank = profile.data[0].job_rank;
                    this.golongan = profile.data[0].civil_servant_group;
                    this.position = profile.data[0].position;

                }
                
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async createOfficialProfile() {
            this.loading = true;
            try {
                if (!this.$refs.formProfile.validate()) {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.errorMsg = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.isSuccess = false;
                    this.loading = false;
                    
                    return;
                }
                const req = await this.$profiles.createProfile({
                    "userId": this.id,
                    "fullName": this.name,
                    "NIP": this.nip,
                    "NIK": this.nik,
                    "job_rank": this.rank,
                    "civil_servant_group": this.golongan,
                    "position": this.position,
                })

                this.loading = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async updateOfficialProfile() {
            this.loading = true;
            try {
                if (!this.$refs.formProfile.validate()) {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.errorMsg = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.isSuccess = false;
                    this.loading = false;
                    
                    return;
                }
                const req = await this.$profiles.editProfile(this.idProfile, {
                    "userId": this.id,
                    "fullName": this.name,
                    "NIP": this.nip,
                    "NIK": this.nik,
                    "job_rank": this.rank,
                    "civil_servant_group": this.golongan,
                    "position": this.position,
                })

                this.loading = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        }
    }
}
</script>