<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-card class="elevation-4 rounded-xl justify-center align-center" style="width: 75%; background-color: #ffffff; height: 100%; padding: 16px; margin-top: 48px;" elevation="1">
                <v-card-title>
                    <v-col>
                        <v-alert
                            icon="mdi-shield-lock-outline"
                            prominent
                            text
                            type="info"
                            style="margin-bottom: 48px;"
                            >
                            <span class="blue-body-text" style="margin-left: 16px;">Silahkan lengkapi profil anda sebagai prasyarat pembuatan laporan pengaduan. </span>
                        </v-alert>
                        <row>
                            <v-btn
                                color="primary"
                                elevation="0"
                                dark
                                text
                            >
                                <v-icon
                                    dark
                                    left
                                >
                                    mdi-arrow-left
                                </v-icon>Back to Dashboard
                            </v-btn>
                        </row>
                    </v-col>
                </v-card-title>
                <v-card-text style="padding-left: 16px; padding-right: 16px;">
                    <v-row>
                        <v-col cols="4" class="text-center">
                            <v-img
                                :src="imgSelfieKtp"
                                aspect-ratio="1.6"
                                contain
                            ></v-img>
                            <v-btn
                                depressed
                                color="primary"
                                style="margin-bottom: 8px;"
                                @click="pickFile('selfie')"
                                block
                            >
                                <v-icon
                                    dark
                                    left
                                >
                                    mdi-file-image-plus-outline
                                </v-icon>
                                Pilih Swafoto
                            </v-btn>
                            <label class="light-bold-text side-menu-text black--text" style="font-size: 12px; letter-spacing: -0.05px;">
                                Silahkan pilih swafoto anda sambil memegang KTP elektronik. anda dapat melihat contoh foto yang tepat disini.
                            </label>
                            <v-img
                                :src="imgKtp"
                                aspect-ratio="1.6"
                                style="margin-top: 48px;"
                                contain
                            ></v-img>
                            <v-btn
                                depressed
                                color="primary"
                                style="margin-bottom: 8px;"
                                @click="pickFile('ktp')"
                                block
                            >
                                <v-icon
                                    dark
                                    left
                                >
                                    mdi-file-image-plus-outline
                                </v-icon>
                                Pilih Foto eKTP
                            </v-btn>
                            <label class="light-bold-text side-menu-text black--text" style="font-size: 12px; letter-spacing: -0.05px;">
                                Lihat contoh foto KTP yang tepat disini.
                            </label>
                            <input 
                                ref="fileKtp" 
                                class="d-none" 
                                type="file" 
                                @change="onFileKtpChanged"
                            >
                            <input 
                                ref="fileSelfie" 
                                class="d-none" 
                                type="file" 
                                @change="onFileSelfieChanged"
                            >
                        </v-col>
                        <v-col cols="8">
                            <v-form ref="formProfile">
                                <label class="body-text">Nomor Induk Kependudukan (NIK)</label>
                                <v-text-field
                                    v-model="nik"
                                    label=""
                                    required
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Email</label>
                                <v-text-field
                                    v-model="email"
                                    label=""
                                    required
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Nama Lengkap</label>
                                <v-text-field
                                    v-model="name"
                                    label=""
                                    required
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Tempat Lahir</label>
                                <v-text-field
                                    v-model="birthPlace"
                                    label=""
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                                <label class="body-text">Tanggal Lahir</label>
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="dateOfBirth"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateOfBirth"
                                        label=""
                                        required
                                        outlined
                                        dense
                                        clearable
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="dateOfBirth"
                                        no-title
                                        scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dateOfBirth)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                
                                <label class="body-text">Jenis Kelamin</label>
                                <v-radio-group
                                    v-model="radioGender"
                                    row
                                >
                                    <v-radio
                                        label="Laki-laki"
                                        value="male"
                                    ></v-radio>
                                    <v-radio
                                        label="Perempuan"
                                        value="female"
                                    ></v-radio>
                                </v-radio-group>
                                <label class="body-text">Alamat Lengkap</label>
                                <v-textarea
                                    v-model="address"
                                    label=""
                                    required
                                    outlined
                                    dense
                                    clearable
                                ></v-textarea>
                                <label class="body-text">No HP</label>
                                <v-text-field
                                    v-model="phone"
                                    type="number"
                                    label=""
                                    prefix="+62"
                                    required
                                    outlined
                                    dense
                                    clearable
                                ></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-checkbox
                        v-model="cbAggree"
                        label="Saya menyatakan bahwa data yang saya isi adalah benar"
                        required 
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-btn
                        depressed
                        color="primary"
                        style="margin-bottom: 8px;"
                        @click="profile ? updateProfile() : createProfile()"
                    >
                        Submit Profile
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <LoadingBar :dialog.sync="loading.status" :message="loading.message" />
        <SuccessDialog :dialog.sync="isSuccess" :message="message" />
        <ErrorDialog :dialog.sync="isError" :message="message" />
    </v-container>
</template>
<script>
import LoadingBar from '~/components/Loading.vue'
import SuccessDialog from '~/components/SuccessDialog.vue'
import ErrorDialog from '~/components/ErrorDialog.vue'
export default {
    auth: true,
    components: {
      LoadingBar,
      SuccessDialog,
      ErrorDialog
    },
    data() {
        return {
            imgKtp: require("@/assets/img/empty-picture.png"),
            imgSelfieKtp: require("@/assets/img/empty-picture.png"),
            nik: "",
            email: "",
            name: "",
            birthPlace: "",
            dateOfBirth: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            address: "",
            phone: "",
            formProfile: "",
            radioGender: "",
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            loading: {
                status: false,
                message: "Memuat Data",
            },
            isError: false,
            isSuccess: false,
            message: "Berhasil Merubah data profile",
            profile: null,
            imgType: "",
            cbAggree: false,
        }
    },
    
    mounted() {
        this.getProfileByUserId();
        console.log(this.userMe);
    },

    methods: {

        async getProfileByUserId() {
            this.loading.status = true;
            try {
                if (this.userMe) {
                    if (this.userMe.roleId.name === "reporter") {
                        this.isAdmin = false;
                    }
                    const profile = await this.$profiles.getProfile({
                        userId: this.userMe._id,
                    });

                    if (profile.total > 0) {
                        this.showInfo = false;
                        this.profile = profile.data[0];
                        this.nik = this.profile.NIK;
                        this.email = this.userMe.email;
                        this.name = this.profile.fullName;
                        this.birthPlace = this.profile.birthPlace;
                        this.dateOfBirth = this.profile.birthDay.substr(0, 10);
                        this.radioGender = this.profile.gender;
                        this.phone = this.profile.phone;
                        const reqKtp = await this.$files.getFile(this.profile.KTPId);
                        const reqSelfie = await this.$files.getFile(this.profile.selfie);
                        
                        let readerKtp = new FileReader();
                        let readerSelfie = new FileReader();
                        readerKtp.readAsDataURL(reqKtp); 
                        readerKtp.onload = () => {
                            this.imgKtp = readerKtp.result;
                        }

                        readerSelfie.readAsDataURL(reqSelfie); 
                        readerSelfie.onload = () => {
                            this.imgSelfieKtp = readerSelfie.result;
                        }
                    }
                }
                
                
                this.loading.status = false;
            } catch (error) {
                console.log(error);
                
                this.loading.status = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async createProfile() {
            this.loading.status = true;
            try {
                if (!this.$refs.formProfile.validate() && this.imgKtp && this.imgSelfieKtp && !this.cbAggree) {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.message = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.isSuccess = false;
                    this.loading.status = false;
                    
                    return;
                }

                const requestSelfie = await this.$files.createFile({
                    file: this.$refs.fileSelfie.files[0]
                })

                const requestKtp = await this.$files.createFile({
                    file: this.$refs.fileKtp.files[0]
                })

                if (requestSelfie && requestKtp) {
                    const req = await this.$profiles.createProfile({
                        "userId": this.userMe._id,
                        "fullName": this.name,
                        "NIK": this.nik,
                        "birthPlace": this.birthPlace,
                        "birthDay": this.dateOfBirth,
                        "gender": this.radioGender,
                        "phone": this.phone,
                        "KTPId": requestKtp._id,
                        "selfie": requestSelfie._id,
                        "address": this.address,
                    })

                    const reqUser = await this.$users.editUser(this.userMe._id, {
                        "email": this.email,
                    });

                }

                this.message = "Berhasil Merubah data profile"
                this.loading.status = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async updateProfile() {
            this.loading.status = true;
            try {
                if (!this.$refs.formProfile.validate() || !this.cbAggree) {
                    window.focus();
                    window.scrollTo(0, 200);
                    this.message = "Isi semua field yang tersedia!"
                    this.isError = true;
                    this.isSuccess = false;
                    this.loading.status = false;
                    
                    return;
                }
                
                // const requestSelfie = await this.$files.editFile(
                //     this.profile.selfie,
                //     this.urltoFile(this.imgSelfieKtp, 'selfiektp.png','image/png')
                // )

                // const requestKtp = await this.$files.editFile(
                //     this.profile.KTPId,
                //     this.urltoFile(this.imgKtp, 'ktp.png','image/png')
                // )

                const req = await this.$profiles.editProfile(this.profile._id, {
                    "userId": this.userMe._id,
                    "fullName": this.name,
                    "NIK": this.nik,
                    "birthPlace": this.birthPlace,
                    "birthDay": this.dateOfBirth,
                    "gender": this.radioGender,
                    "phone": this.phone,
                    "address": this.address,
                })

                const reqUser = await this.$users.editUser(this.userMe._id, {
                    "email": this.email,
                });

                this.message = "Berhasil Merubah data profile"
                this.loading.status = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        pickFile(type) {
            this.imgType = type;
            if (type === "ktp") {
                this.$refs.fileKtp.click();
            } else {
                this.$refs.fileSelfie.click();
            }
           
        },

        onFileSelfieChanged(e) {
            this.imgSelfieKtp = URL.createObjectURL(e.target.files[0]);
        },

        onFileKtpChanged(e) {
            this.imgKtp = URL.createObjectURL(e.target.files[0]);
        },

        urltoFile(url, filename, mimeType){
            return (fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename,{type:mimeType});})
            );
        }
    }
}
</script>
