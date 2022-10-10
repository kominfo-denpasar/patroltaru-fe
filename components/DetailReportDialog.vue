<template>
    <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        max-width="70%"
    >
        <v-card
            style="padding: 16px;"
        >
            <v-card-title class="subtitle-text">
                Detail Laporan
                <v-spacer></v-spacer>
                <v-btn-toggle
                    v-model="toggleDetailMenu"
                    borderless
                >
                    <v-btn value="detailReport">
                        <span class="hidden-sm-and-down">Detail Laporan</span>
                    </v-btn>

                    <v-btn value="detailReporter">
                        <span class="hidden-sm-and-down">Detail Pelapor</span>
                    </v-btn>
                </v-btn-toggle>
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
                
                <v-col align="center">
                    <v-img
                        :src="reqImage"
                        aspect-ratio="1.9"
                        contain
                    ></v-img>
                    <span class="body-text">Laporan Masuk pada tanggal <b>{{ reportDate.getDate() }} {{ $store.state.listMonth[reportDate.getMonth()] }} {{ reportDate.getFullYear() }}</b></span>
                    <v-divider style="margin-top: 24px; margin-bottom: 24px;"></v-divider>
                    <v-row v-if="toggleDetailMenu === 'detailReport'">
                        <v-col cols="4">
                            <table id="tableReport">
                                <tr class="side-menu-text white--text primary">
                                    <th>
                                        Wilayah
                                    </th>
                                </tr>
                                <tr>
                                    <td class="side-menu-text">
                                        <span class="light-bold-text">Kelurahan</span><br>
                                        {{ subDistrictId.name }}
                                    </td >
                                </tr>
                                <tr>
                                    <td class="side-menu-text">
                                        <span class="light-bold-text">Kecamatan</span><br>
                                        {{ district.name }}
                                    </td>
                                </tr>
                            </table>
                        </v-col>
                        <v-col cols="8" class="body-text" align="left">
                            <span class="light-bold-text">Koordinat</span><br>
                            {{ report.location ? report.location.coordinates : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Topik</span><br>
                            {{ report.topic ? report.topic : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Jenis Kegiatan yang Diajukan</span><br>
                            {{ report.activityId ? report.activityId.name : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Alamat Lokasi</span><br>
                            {{ report.address ? report.address : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Isi Laporan</span><br>
                            {{ report.content ? report.content : "" }}
                        </v-col>
                    </v-row>

                    <!-- detail reporter -->
                    <v-row v-else>
                        <v-col cols="4">
                            <table id="tableReport">
                                <tr class="side-menu-text white--text primary">
                                    <th>
                                        KTP
                                    </th>
                                </tr>
                                <tr>
                                    <td class="side-menu-text">
                                        <v-img
                                            :src="reqKTP"
                                            aspect-ratio="1.6"
                                            contain
                                        ></v-img>
                                    </td >
                                </tr>
                            </table>
                        </v-col>
                        <v-col cols="8" class="body-text" align="left">
                            <span class="light-bold-text">NIK</span><br>
                            {{ report.profile ? report.profile.NIK : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Nama</span><br>
                            {{ report.profile ? report.profile.fullName : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Alamat</span><br>
                            {{ report.profile ? report.profile.address : "" }}
                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                            <span class="light-bold-text">Kontak</span><br>
                            No Telp : +62{{ report.profile ? report.profile.phone : "" }}<br><br>
                            Email : {{ report.author ? report.author.email : "" }}
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
                    <b>Kembali</b>
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
    name: 'AddUserDialog',
    props: {
        dialog: {
            default: false
        },
        
        report: {
            default: {
            }
        },

        reqImage: {
            default: "",
        },
        reqKTP: {
            default: "",
        },
        reportDate: {
            default: new Date(),
        },

        subDistrictId: {
            default: {}
        },
        district: {
            default: {}
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
            imgReport: "",
            toggleDetailMenu: "detailReport"
        }
    },
    mounted() {
    },

    methods: {
        close() {
            this.$emit('update:dialog', false)
        },

        
    }
}
</script>