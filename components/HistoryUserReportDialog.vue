<template>
    <div>
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            max-width="60%"
        >
            <v-card
                style="padding: 16px;"
            >
                <v-card-title class="subtitle-text primary--text">
                    Riwayat Laporan
                </v-card-title>
                <v-card-text>
                    
                    <v-col align="center" style="padding-top: 32px;">
                        <span class="body-text" >Laporan dibuat pada tanggal <b>{{ reportDate.getDate() }} {{ $store.state.listMonth[reportDate.getMonth()] }} {{ reportDate.getFullYear() }} {{reportDate.getHours()}}:{{reportDate.getMinutes()}}:{{reportDate.getSeconds()}}</b></span>
                        
                        <v-row style="margin-top: 32px;">
                            <v-col cols="3" align="left">
                                <span class="light-bold-text body-text">Tanggal</span>
                            </v-col>
                            <v-col cols="5" class="body-text" align="left">
                                <span class="light-bold-text body-text">Aksi</span>
                            </v-col>
                            <v-col cols="4" class="body-text" align="left">
                                <span class="light-bold-text body-text">Keterangan</span>
                            </v-col>
                        </v-row>
                        <v-divider style="margin-top: 8px; margin-bottom: 8px;"></v-divider>
                        <v-row v-for="(item, index) in userReports" :key="index">
                            <v-col cols="3" align="left" style="padding-top: 18px;">
                                <span class="body-text">{{ item.createdAt ? item.createdAt.toString().substr(0, 10) : ''}} {{ item.createdAt ? item.createdAt.toString().substr(11, 19) : ''}}</span>
                            </v-col>
                            <v-col cols="5" class="body-text" align="left" style="padding-top: 18px;">
                                
                                <span class="body-text">{{ item.action === 'approved' ? 'Laporan telah diverifikasi oleh ' : 'Laporan telah ditolak oleh '}} {{ item.roleDetail ? item.roleDetail.description : '-' }} yang diinput oleh {{item.roleDetail ? item.roleDetail.name : '-'}}</span>
                            </v-col>
                            <v-col cols="4" class="body-text" align="left" justify="center">
                                <v-btn
                                    color="primary"
                                    text
                                    class="body-text"
                                    @click="openDialogDesc(item)"
                                    dense
                                >
                                    <b>Lihat Catatan</b>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        class="body-text"
                        @click="close"
                    >
                        <b>Tutup</b>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDesc"
            hide-overlay
            persistent
            max-width="500px"
        >
            <v-card
                style="padding: 16px;"
            >
                <v-card-title class="subtitle-text black--text">
                    Catatan<br><br>
                    {{ desc }}
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        class="body-text"
                        @click="dialogDesc = !dialogDesc"
                    >
                        <b>Tutup</b>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<style>
    #tableReport {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #tableReport td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    
    #tableReport th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      color: white;
    }
</style>
<script>

export default {
    name: 'HistoryUserReportDialog',
    props: {
        dialog: {
            default: false
        },
        
        userReports: {
            default: () => [
                {"createdAt": new Date()}
            ]
        },

        reportDate: {
            default: new Date(),
        },

        closeDialog: Boolean
    },
    data() {
        return {
            imgReport: "",
            status: "",
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            loading: false,
            desc: "",
            dialogDesc: false,
        }
    },
    mounted() {
    },

    methods: {
        close() {
            this.$emit('update:dialog', false)
        },

        async addUserReport() {
            this.loading = true;
            try {
                const req = await this.$userreports.createUserReport({
                    "userId": this.userMe._id,
                    "reportId": this.report._id,
                    "action": this.status,
                    "information": this.verifyDesc,
                })
                this.isSuccess = true;
                this.isError = false;
                this.loading = false;

                setTimeout(() => {
                    location.reload();
                }, 2000);
            } catch (error) {
                console.log(error);
                this.isSuccess = false;
                this.isError = true;
                this.loading = false;
            }
        },

        openDialogDesc(item) {
            this.desc = item.information;
            this.dialogDesc = true;
        }
    }
}
</script>