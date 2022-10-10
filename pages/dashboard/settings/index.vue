<template>
    <v-container fluid fill-height >
        <v-layout align-center justify-center>
            <v-col>
                
                <v-card style="padding: 8px; width: 100%; margin-top: 16px; background-color: #e2e2e2;" elevation="0">
                    <v-card-text style="margin-top: 4px; margin-left: 8px;">
                        <v-row >
                            <span class="body-text" >Dashboard </span>
                            <v-icon>mdi-chevron-right</v-icon>
                            <span class="body-text"><b>Setting</b></span>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-alert
                    icon="mdi-shield-lock-outline"
                    prominent
                    text
                    :type="isAccess ? 'info' : 'warning'"
                    style="margin-top: 24px; margin-bottom: 32px;"
                    >
                    <span class="blue-body-text" style="margin-left: 16px;" v-show="isAccess">Silahkan untuk melakukan <b>update setting</b> untuk dapat merubah tampilan aplikasi. Terima Kasih. </span>
                    <span class="orange--text body-text" style="margin-left: 16px;" v-show="!isAccess">Akun anda bukan akun <b>Administrator</b>, silahkan menggunakan akun admin untuk merubah setting</span>
                </v-alert>

                <v-form ref="formUser" >
                    <label class="body-text light-bold-text">Nama Aplikasi</label>
                    <v-text-field
                        ref="appName"
                        v-model="appName"
                        :rules="[() => !!appName || 'This field is required']"
                        :disabled="!isAccess"
                        outlined
                        dense
                        clearable
                        required
                    ></v-text-field>
                    <v-divider style="margin-bottom: 24px;"></v-divider>
                    <!-- <label class="body-text light-bold-text">Warna Utama</label>
                    <v-color-picker v-model="primaryColor" style="margin-top: 8px;" v-show="isAccess"></v-color-picker>
                    <v-card :color="primaryColor" max-width="300" min-height="45" style="margin-bottom: 24px;"></v-card>
                    <v-divider style="margin-bottom: 24px;"></v-divider>
                    <label class="body-text light-bold-text" >Warna Sekunder</label>
                    <v-color-picker v-model="secondaryColor" style="margin-top: 8px;" v-show="isAccess"></v-color-picker>
                    <v-card :color="secondaryColor" max-width="300" min-height="45" style="margin-bottom: 48px;"></v-card> -->
                    <v-btn color="blue" class="body-text white--text" @click="updateSetting()" v-show="isAccess">
                        <v-icon>mdi-briefcase-account</v-icon>
                        <span style="margin-left: 8px;">Update Settings</span>
                    </v-btn>
                </v-form>
            </v-col>
        </v-layout>
        
    </v-container>
</template>
<script>
export default {
    auth: true,
    data() {
        return {
            appName: process.env.title,
            primaryColor: '',
            secondaryColor: '',
            bannerUrl: '',
            isLoading: false,
            isError: false,
            isSuccess: false,
            isSetting: false,
            id: '',
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            isAccess: false,
        }
    },
    mounted() {
        if (this.userMe && this.userMe.roleId.name === "administrator") {
            this.isAccess = true;
        }
        this.getSettings();
    },

    methods: {
        async getSettings() {
            this.isLoading = true;
            try {
                const reqSetting = await this.$settings.getSetting();

                if (reqSetting.total > 0) {
                    this.isSetting = true;
                    this.id = reqSetting.data[0]._id;
                    this.appName = reqSetting.data[0].app_name;
                    // this.$vuetify.theme.themes.light.primary = reqSetting.data[0].primary_color;
                    // this.$vuetify.theme.themes.light.secondary = reqSetting.data[0].secondary_color;
                    this.primaryColor = reqSetting.data[0].primary_color;
                    this.secondaryColor = reqSetting.data[0].secondary_color;
                }

                this.isLoading = false;
                this.isSuccess = true;
                this.isError = false;
            } catch (error) {
                console.log(error);
                this.isLoading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async updateSetting() {
            this.isLoading = true;
            try {
                if (this.isSetting) {
                    const updateSet = await this.$settings.editSetting(this.id, {
                        "app_name": this.appName,
                        "primary_color": this.primaryColor,
                        "secondary_color": this.secondaryColor,
                    })
                } else {
                    const createSet = await this.$settings.createSetting({
                        "app_name": this.appName,
                        "primary_color": this.primaryColor,
                        "secondary_color": this.secondaryColor,
                        "banner_url": "-",
                    })
                }
                this.isLoading = false;
                this.isSuccess = true;
                this.isError = false;

                window.location.reload();
            } catch (error) {
                console.log(error);
                this.isLoading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        }
    }
}
</script>