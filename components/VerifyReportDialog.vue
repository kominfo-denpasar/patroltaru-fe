<template>
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
                Tindak lanjut hasil Pemeriksaan
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
                <v-alert v-if="isSuccess"
                    icon="mdi-check-circle"
                    prominent
                    text
                    type="success"
                    style="margin-bottom: 24px;"
                    >
                        <span style="margin-left: 16px;" class="body-text green--text light-bold-text text-center">{{ successMsg }}</span>
                </v-alert>
                <v-col align="center" style="padding-top: 48px;">
                    <span class="body-text" >Laporan dibuat pada tanggal <b>{{ reportDate.getDate() }} {{ $store.state.listMonth[reportDate.getMonth()] }} {{ reportDate.getFullYear() }} {{reportDate.getHours()}}:{{reportDate.getMinutes()}}:{{reportDate.getSeconds()}}</b> berisi informasi laporan sebagai berikut</span>
                    
                    <v-row style="margin-top: 24px;">
                        <v-col cols="6" align="left">
                            <span class="light-bold-text body-text">Jenis Kegiatan yang diajukan</span>
                        </v-col>
                        <v-col cols="6" class="body-text" align="left">
                            {{ report.activityId ? report.activityId.name : "" }}
                        </v-col>
                    </v-row>
                    <v-divider style="margin-top: 8px; margin-bottom: 8px;"></v-divider>
                    <v-row>
                        <v-col cols="6" align="left">
                            <span class="light-bold-text body-text">Alamat Lokasi</span>
                        </v-col>
                        <v-col cols="6" class="body-text" align="left">
                            {{ report.address ? report.address : "" }}
                        </v-col>
                    </v-row>
                    <v-divider style="margin-top: 8px; margin-bottom: 8px;"></v-divider>
                    <v-row>
                        <v-col cols="6" align="left">
                            <span class="light-bold-text body-text">Isi Laporan</span>
                        </v-col>
                        <v-col cols="6" class="body-text" align="left">
                            {{ report.address ? report.content : "" }}
                        </v-col>
                    </v-row>
                    <v-divider style="margin-top: 8px; margin-bottom: 24px;"></v-divider>
                    <v-radio-group v-if="conditionVerify(report)" v-model="report.userReport[report.userReport.length - 1].action">
                        <v-radio value="rejected" disabled>
                            <template v-slot:label>
                                <div class="body-text">Dengan ini saya <strong class="black--text">TIDAK MENYETUJUI</strong> laporan untuk diproses lebih lanjut. Laporan diarsipkan</div>
                            </template>
                        </v-radio>
                        <v-radio value="approved" disabled>
                            <template v-slot:label>
                                <div class="body-text">Dengan ini saya <strong class="black--text">MENYETUJUI</strong> laporan untuk diproses lebih lanjut.</div>
                            </template>
                        </v-radio>
                    </v-radio-group>
                    <v-radio-group v-model="status" v-else>
                        <v-radio value="rejected">
                            <template v-slot:label>
                                <div class="body-text">Dengan ini saya <strong class="black--text">TIDAK MENYETUJUI</strong> laporan untuk diproses lebih lanjut. Laporan diarsipkan</div>
                            </template>
                        </v-radio>
                        <v-radio value="approved">
                            <template v-slot:label>
                                <div class="body-text">Dengan ini saya <strong class="black--text">MENYETUJUI</strong> laporan untuk diproses lebih lanjut.</div>
                            </template>
                        </v-radio>
                    </v-radio-group>
                    <v-col align="left">
                        <label class="body-text">Keterangan Verifikasi</label>
                    </v-col>   
                    <v-textarea v-if="conditionVerify(report)"
                        v-model="report.userReport[report.userReport.length - 1].information"
                        label=""
                        maxlength="255"
                        counter
                        outlined
                        dense
                        disabled
                    ></v-textarea> 
                    <v-textarea v-else
                        v-model="verifyDesc"
                        label=""
                        maxlength="255"
                        counter
                        outlined
                        dense
                        clearable
                    ></v-textarea>
                    <v-checkbox v-if="verifyFile1(report)" v-model="report.userReport[report.userReport.length - 1].summons1Id" disabled>
                        <template v-slot:label>
                            <div class="body-text">Unggah Surat panggilan pertama pemilik bangunan</div>
                        </template>
                    </v-checkbox>
                    <v-checkbox v-model="cbSummons1" v-show="showCbFile(report)" v-else>
                        <template v-slot:label>
                            <div class="body-text">Unggah Surat panggilan pertama pemilik bangunan</div>
                        </template>
                    </v-checkbox>
                    <v-row style="margin-left: 8px; margin-bottom: 16px;" v-if="verifyFile1(report)">
                        <v-btn
                            depressed
                            color="primary"
                            style="margin-bottom: 8px;"
                        >
                            <v-icon
                                dark
                                left
                            >
                                mdi-file-pdf-box
                            </v-icon>
                            {{ report.userReport[report.userReport.length - 1].summons1Id.originalName }}
                        </v-btn>
                    </v-row>
                    <v-row style="margin-left: 8px; margin-bottom: 16px;" v-else>
                        <v-btn
                            depressed
                            color="primary"
                            style="margin-bottom: 8px;"
                            @click="pickFile(0)"
                            v-show="cbSummons1"
                        >
                            <v-icon
                                dark
                                left
                            >
                                mdi-file-pdf-box
                            </v-icon>
                            {{ summonsFile1Name }}
                        </v-btn>
                        <input 
                            ref="fileSummon1" 
                            class="d-none" 
                            type="file" 
                            @change="onFileSummons1Changed"
                        >
                    </v-row>
                    <v-checkbox v-if="verifyFile2(report)" v-model="report.userReport[report.userReport.length - 1].summons2Id" disabled>
                        <template v-slot:label>
                            <div class="body-text">Unggah Surat panggilan kedua pemilik bangunan</div>
                        </template>
                    </v-checkbox>
                    <v-checkbox v-model="cbSummons2" v-show="showCbFile(report)" v-else>
                        <template v-slot:label>
                            <div class="body-text">Unggah Surat panggilan kedua pemilik bangunan</div>
                        </template>
                    </v-checkbox>
                    <v-row style="margin-left: 8px; margin-bottom: 16px;" v-if="verifyFile2(report)">
                        <v-btn
                            depressed
                            color="primary"
                            style="margin-bottom: 8px;"
                        >
                            <v-icon
                                dark
                                left
                            >
                                mdi-file-pdf-box
                            </v-icon>
                            {{ report.userReport[report.userReport.length - 1].summons2Id.originalName }}
                        </v-btn>
                    </v-row>
                    <v-row style="margin-left: 8px;" v-else>
                        <v-btn
                            depressed
                            color="primary"
                            style="margin-bottom: 8px;"
                            @click="pickFile(1)"
                            v-show="cbSummons2"
                        >
                            <v-icon
                                dark
                                left
                            >
                                mdi-file-pdf-box
                            </v-icon>
                            {{ summonsFile2Name }}
                        </v-btn>
                        <input 
                            ref="fileSummon2" 
                            class="d-none" 
                            type="file" 
                            @change="onFileSummons2Changed"
                        >
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
                    <b>Kembali</b>
                </v-btn>
                <v-btn
                    color="primary"
                    class="body-text"
                    :loading="loading"
                    @click="isUpdate ? updateUserReport(report.userReport[report.userReport.length - 1]) : addUserReport()"
                >
                    <b>{{ isUpdate ? 'Update' : 'Verifikasi' }}</b>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
    name: 'VerifyReportDialog',
    props: {
        dialog: {
            default: false
        },
        
        report: {
            default: {
            }
        },

        reportDate: {
            default: new Date(),
        },

        isUpdate: {
            default: false,
        },

        closeDialog: Boolean
    },
    data() {
        return {
            password: '',
            confirmPass: '',
            showPassword: false,
            loading: false,
            isSuccess: false,
            isError: false,
            errorMsg: "Gagal melakukan verifikasi, silahkan coba lagi",
            successMsg: "Berhasil melakukan verifikasi laporan",
            imgReport: "",
            status: "",
            verifyDesc: "",
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            cbSummons1: false,
            cbSummons2: false,
            summonsFile1: "",
            summonsFile1Name: "Pilih File",
            summonsFile2: "",
            summonsFile2Name: "Pilih File",
            loading: false,
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
                let requestFile1, requestFile2;
                if (this.summonsFile1) {
                    requestFile1 = await this.$files.createFile({
                        file: this.$refs.fileSummon1.files[0]
                    })
                }
                
                if (this.summonsFile2) {
                    requestFile2 = await this.$files.createFile({
                        file: this.$refs.fileSummon2.files[0]
                    })
                }
                const req = await this.$userreports.createUserReport({
                    "userId": this.userMe._id,
                    "reportId": this.report._id,
                    "action": this.status,
                    "information": this.verifyDesc,
                    "summons1Id": requestFile1 ? requestFile1._id : null,
                    "summons2Id": requestFile2 ? requestFile2._id : null,
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

        async updateUserReport(userReport) {
            this.loading = true;
            try {
                console.log(this.summonsFile1Name, this.summonsFile2Name)
                let requestFile1 = { _id: ""}, requestFile2 = { _id: ""};
                if (userReport.summons1Id) {
                    requestFile1._id = userReport.summons1Id;
                } else if (this.summonsFile1Name.toLowerCase() != "pilih file") {
                    requestFile1 = await this.$files.createFile({
                        file: this.$refs.fileSummon1.files[0]
                    })
                }
                
                if (userReport.summons2Id) {
                    requestFile2._id = userReport.summons2Id;
                } else if (this.summonsFile2Name.toLowerCase() != "pilih file") {
                    requestFile2 = await this.$files.createFile({
                        file: this.$refs.fileSummon2.files[0]
                    })
                }
                const req = await this.$userreports.editUserReport(userReport._id, {
                    "summons1Id": requestFile1 ? requestFile1._id : null,
                    "summons2Id": requestFile2 ? requestFile2._id : null,
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

        conditionVerify(report) {
            if (report.userReport) {
                if (report.author.roleId.name === "reporter") {
                    return report.userReport.length > 7 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name;
                } else {
                    return report.userReport.length > 2 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name;
                }
                
            }

            return false;
        },

        verifyFile1(report) {
            if (this.userMe && this.userMe.roleId.name === 'executive') {
                if (report.userReport) {
                    if (report.author.roleId.name === "reporter") {
                        if (report.userReport.length > 7 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name) {
                            return report.userReport[report.userReport.length - 1].summons1Id;
                        }
                    } else {
                        if (report.userReport.length > 2 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name) {
                            return report.userReport[report.userReport.length - 1].summons1Id;
                        }
                    }
                }
            }

            return false;
        },

        showCbFile(report) {
            if (this.userMe && this.userMe.roleId.name === 'executive') {
                if (report.userReport) {
                    if (report.author.roleId.name === "reporter") {
                        return report.userReport.length >= 7 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name;
                    } else {
                        return report.userReport.length >= 2 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name;
                    }
                }
            }

            return false;
        },

        verifyFile2(report) {
            if (this.userMe && this.userMe.roleId.name === 'executive') {
                if (report.userReport) {
                    if (report.author.roleId.name === "reporter") {
                        if (report.userReport.length > 7 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name) {
                            return report.userReport[report.userReport.length - 1].summons2Id;
                        }
                    } else {
                        if (report.userReport.length > 2 && report.userReport[report.userReport.length - 1].roleDetail.name === this.userMe.roleId.name) {
                            return report.userReport[report.userReport.length - 1].summons2Id;
                        }
                    }
                    
                }
            }

            return false;
        },

        pickFile(index) {
            if (index == 0) {
                this.$refs.fileSummon1.click();
            } else {
                this.$refs.fileSummon2.click();
            }
        },

        onFileSummons1Changed(e) {
            this.summonsFile1 = URL.createObjectURL(e.target.files[0]);
            this.summonsFile1Name = e.target.files[0].name;
        },

        onFileSummons2Changed(e) {
            this.summonsFile2 = URL.createObjectURL(e.target.files[0]);
            this.summonsFile2Name = e.target.files[0].name;
        }
    }
}
</script>