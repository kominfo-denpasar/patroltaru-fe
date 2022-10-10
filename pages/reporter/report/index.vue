<template>
    <v-app class="primary">
      <v-main>
            <v-container fluid fill-height style="width: 80%; background-color: #ffffff; height: 100%;">
                <v-layout align-center justify-center >
                    <v-col>
                        <v-row no-gutters align="center" justify="end" style="margin-top: 24px;">
                            <span class="subtitle-text">Selamat Datang, <b>{{ profile ? profile.fullName : userMe.username }}</b><br>
                            Dashboard Pengaduan Masyarakat</span>
                            <v-spacer></v-spacer>
                            <v-btn-toggle
                                v-model="toggleStatusReport"
                                borderless
                            >
                                <v-btn value="active">
                                    <span class="hidden-sm-and-down">Daftar Pengaduan Aktif</span>
                                </v-btn>

                                <v-btn value="finish">
                                    <span class="hidden-sm-and-down">Daftar Pengaduan Selesai</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-row>
                        <v-alert
                            icon="mdi-shield-lock-outline"
                            v-show="showInfo"
                            prominent
                            text
                            type="info"
                            style="margin-top: 48px; "
                            >
                            <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>update profile</b> untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                        </v-alert>

                        <v-alert
                            icon="mdi-check-circle"
                            v-show="!showInfo"
                            prominent
                            text
                            type="success"
                            style="margin-top: 48px; "
                            >
                            <span class="green-body-text" style="margin-left: 16px;">Profile anda berhasil diterima oleh {{ nameDinas }}. Silahkan membuat laporan pengaduan. Terima Kasih! </span>
                        </v-alert>

                        <v-row style="margin-top: 48px;">
                            <v-col cols="4">
                                <v-text-field
                                    v-model="search"
                                    outlined
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    label="Search"
                                    type="text"
                                    @click:clear="clearSearch"
                                    prepend-inner-icon="mdi-clipboard-text-search-outline"
                                    rounded
                                ></v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="3" align="center" justify="center" >
                                <v-btn depressed block style="margin-top: 48x;" color="green" class="white--text" @click="createNewReport">
                                    <v-icon left color="white">
                                        mdi-plus
                                    </v-icon>
                                    Buat Laporan Baru
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-data-table
                            :headers="headers"
                            :items="reports"
                            :options.sync="pagination"
                            :items-per-page="pagination.rowsPerPage"
                            :server-items-length="pagination.totalItems"
                            item-key="_id"
                            class="elevation-1"
                            :loading="loading"
                            loading-text="Loading... Please wait"
                            hide-default-header 
                        >
                            <template v-slot:header="{ props: { headers } }">
                                <tr class="side-menu-text bg-color-header-table white--text" style="text-align:left" >
                                    <th v-for="(item, index) in headers" :key="index" style="padding: 10px;">
                                        <span class="">{{item.text}}</span>
                                    </th>
                                </tr>
                            </template>
                            <template v-slot:[`item.number`]="{ item }">
                                <td>
                                    {{reports.map(function(x) {return x._id; }).indexOf(item._id) + 1}}
                                </td>   
                            </template>
                            <template v-slot:[`item.createdAt`]="{ item }">
                                <td>
                                    {{ item.createdAt.substr(0, 10) }}
                                </td>   
                            </template>
                            <template v-slot:[`item.status`]="{ item }">
                                <td>
                                    <v-chip
                                        :color="colorStatus(item)"
                                        text-color="white"
                                    >
                                        <v-icon left>
                                            {{ iconStatus(item) }}
                                        </v-icon>
                                        <span class="side-menu-text light-bold-text white--text" style="font-size: 12px;">{{ textStatus(item) }}</span>
                                    </v-chip>
                                </td>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs"
                                        v-on="on" class="primary" small>
                                        <v-icon>mdi-gesture-double-tap</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-for="(itm, index) in item.menuItems"
                                        @click="clickItem(item, index)"
                                        :key="index"
                                    >
                                        <v-list-item-content class="side-menu-text black--text">
                                            <v-row style="padding-left: 10px; padding-right: 16px;" align="center">
                                                <v-icon color="grey">{{ itm.icon }}</v-icon>
                                                <span style="margin-left:8px;">{{ itm.title }}</span>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                
                            </v-menu>
                        </td>
                            </template>
                        </v-data-table>
                        
                    </v-col>
                    <v-dialog
                        v-model="dialogInputProfile"
                        persistent
                        max-width="300"
                        >
                            <v-card>
                                <v-card-title class="subtitle-text">
                                    Profile belum lengkap
                                </v-card-title>
                                <v-card-text class="side-menu-text black--text text-center">
                                    Mohon lengkapi profile untuk membuat laporan baru. Terima Kasih!
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="side-menu-text"
                                        color="primary"
                                        style="font-size: 12px;"
                                        text
                                        @click="dialogInputProfile = false"
                                    >
                                        Batal
                                    </v-btn>
                                    <v-btn
                                        class="side-menu-text"
                                        color="primary"
                                        style="font-size: 12px;"
                                        to="/reporter/profile"
                                    >
                                        Lengkapi Profile
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    <LogoutDialog :dialog.sync="logoutDialog" />
                    <DetailReportDialog :dialog.sync="detailDialog" :report="report" :reqImage="reqImage" :district="district" :subDistrictId="subDistrictId" :reportDate="reportDate"/>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import LogoutDialog from '~/components/LogoutDialog.vue'
import DetailReportDialog from '~/components/DetailReportDialog.vue';
export default {
    auth: false,
    components: {
        LogoutDialog,
        DetailReportDialog
    },
    data() {
        return {
            index: 0,
            toggleStatusReport: 'active',
            menuList: [
                {
                    amount: 0,
                    icon: "mdi-file-document-multiple",
                    title: "Total Laporan",
                },
                {
                    amount: 0,
                    icon: "mdi-checkbox-multiple-marked",
                    title: "Menunggu Verifikasi",
                },
                {
                    amount: 0,
                    icon: "mdi-clipboard-text-search",
                    title: "Dalam Pemeriksaan",
                },
                {
                    amount: 0,
                    icon: "mdi-clipboard-check",
                    title: "Selesai Diperiksa",
                }
            ],
            menuItems: [
                { title: 'Detail', icon: 'mdi-database-eye' },
            ],
            search: "",
            headers: [
                {text: 'No', value: 'number', align: 'left'},
                {text: 'Tanggal Laporan', value: 'createdAt', align: 'left'},
                {text: 'Topik', value: 'content', align: 'left'},
                {text: 'Alamat', value: 'address', align: 'left'},
                {text: 'Status', value: 'status', align: 'left'},
                {text: 'Aksi', value: 'action', align: 'left'},
            ],
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            showInfo: true,
            logoutDialog: false,
            detailDialog: false,
            dialogInputProfile: false,
            profile: {},
            pagination: {
                page: 1,
                rowsPerPage: 10,
                totalItems: 0,  
            },
            reports: [],
            report: {},
            reqImage: "",
            loading: false,
            reportDate: new Date(),
            subDistrictId: {},
            district: {},
            roles: [],
            nameDinas: process.env.nameDinas,
        }
    },

    mounted() {
        this.getProfileByUserId();
        console.log(this.userMe);
    },

    methods: {
        async getRoles() {
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
        async getProfileByUserId() {
            this.loading = true;
            try {
                if (this.userMe) {
                    const profile = await this.$profiles.getProfile({
                        userId: this.userMe._id,
                    });

                    this.profile = profile.data[0];

                    if (profile.total > 0) {
                        this.showInfo = false;
                    }
                    this.getRoles();
                    this.getReports();
                }
               
                
                this.loading = false;
            } catch (error) {
                console.log(error);
                
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async getReports() {
            this.loading = true;
            try {
                const reqReports = await this.$reports.getReport({
                    $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    $limit: this.pagination.rowsPerPage,
                    "$populate[0]": "activityId",
                    "$populate[1]": "createdBy",
                    "createdBy": this.userMe._id,
                });
                for (const key in reqReports.data) {
                    if (Object.hasOwnProperty.call(reqReports.data, key)) {
                        const data = reqReports.data[key];
                        this.menuItems = [
                            { title: 'Detail', icon: 'mdi-database-eye' },
                        ];
                        const reqUserReport = await this.$userreports.getUserReport({
                            "reportId": data._id,
                            "paginate": false,
                            "$populate": "createdBy",
                        })

                        for (const keyUsrReport in reqUserReport) {
                            if (Object.hasOwnProperty.call(reqUserReport, keyUsrReport)) {
                                const element = reqUserReport[keyUsrReport];
                                if(this.roles.filter(data => data._id === element.createdBy.roleId)) {
                                    let role = this.roles.filter(data => data._id === element.createdBy.roleId);
                                    element["roleDetail"] = role[0];
                                }
                            }
                        }
                        data["userReport"] = reqUserReport;

                        if (reqUserReport.length > 0) {
                            if (reqUserReport[reqUserReport.length - 1].summons1Id) {
                                this.menuItems.push({ title: "Unduh Surat Panggilan Pertama", icon: "mdi-numeric-1-circle-outline" });
                            }

                            if (reqUserReport[reqUserReport.length - 1].summons2Id) {
                                this.menuItems.push({ title: "Unduh Surat Panggilan Kedua", icon: "mdi-numeric-2-circle-outline" });
                            }
                        }
                        data["menuItems"] = this.menuItems;
                    }
                }

                this.pagination.totalItems = reqReports.total;
                this.menuList[0].amount = reqReports.total;
                this.reports = reqReports.data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        createNewReport() {
            if (this.profile == null ){
                this.dialogInputProfile = true;
            } else {
                window.location = "/dashboard/report/create-reguler-report"
            }
        },

        async editItem(item) {
            this.report = item;
            this.reportDate = new Date(item.createdAt);
            const reqSubDistrict = await this.$subdistricts.getSubDistrictById(item.subDistrictId, {});
            const reqDistrict = await this.$districts.getDistrictById(reqSubDistrict.districtId, {});
            this.subDistrictId = reqSubDistrict;
            this.district = reqDistrict;
            
            const reqImg = await this.$files.getFile(item.imageId);
            let readerImg = new FileReader();
            readerImg.readAsDataURL(reqImg); 
            readerImg.onload = () => {
                this.reqImage = readerImg.result;
                this.detailDialog = true;
            }
            
        },

        async clickItem(item, index) {
            this.report = item;
            this.reportDate = new Date(item.createdAt);
            // console.log(item);
            if (index === 0) {
                this.editItem(item);
            } else if (index === 1) {
                const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons1Id);
                let reader = new FileReader();
                reader.readAsDataURL(reqFile); 

                reader.onload = () => {
                    this.downloadPDF(reader.result, item.userReport[item.userReport.length - 1].summons1Id)
                }
            } else if (index === 2) {
                const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons2Id);
                let reader = new FileReader();
                reader.readAsDataURL(reqFile); 

                reader.onload = () => {
                    this.downloadPDF(reader.result, item.userReport[item.userReport.length - 1].summons2Id)
                }
            }
        },

        downloadPDF(pdf, name) {
            const linkSource = pdf;
            const downloadLink = document.createElement("a");
            const fileName = name + ".pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        },

        clearSearch () {
            this.search = ''
        },

        textStatus(item) {
            let status = "Menunggu verifikasi admin";
            if (item.userReport.length > 0) {
                let userReport = item.userReport[item.userReport.length - 1];
                if (userReport.action === "rejected") {
                    status = "Laporan ditolak oleh " + userReport.roleDetail.description;
                } else {
                    status = "Sudah diverifikasi oleh " + userReport.roleDetail.description;
                    if (item.userReport.length > 7) {
                        status = "Tanggapan diteruskan ke Pusat";

                        if (item.userReport[item.userReport.length - 1].summons1Id) {
                            status = "Pemanggilan Pertama";
                        } 

                        if (item.userReport[item.userReport.length - 1].summons2Id) {
                            status = "Pemanggilan Kedua";
                        }
                    }
                    
                }
            }
            
            return status;
        },

        colorStatus(item) {
            let color = "brown";
            if (item.userReport.length > 0) {
                let userReport = item.userReport[item.userReport.length - 1];
                if (userReport.action === "rejected") {
                    color = "red";
                } else {
                    color = "blue-grey";
                    if (item.userReport.length > 7) {
                        color = "green";

                        if (item.userReport[item.userReport.length - 1].summons1Id) {
                            color = "red";
                        } 

                        if (item.userReport[item.userReport.length - 1].summons2Id) {
                            color = "red";
                        }
                    }
                    
                }
            }
            return color;
        },

        iconStatus(item) {
            let icon = "mdi-circle-slice-8";
            if (item.userReport.length > 0) {
                let userReport = item.userReport[item.userReport.length - 1];
                if (userReport.action === "rejected") {
                    icon = "mdi-alert-circle";
                } else {
                    icon = "mdi-alert-circle";
                    if (item.userReport.length > 7) {
                        icon = "mdi-check-circle";

                        if (item.userReport[item.userReport.length - 1].summons1Id) {
                            icon = "mdi-numeric-1-circle";
                        } 

                        if (item.userReport[item.userReport.length - 1].summons2Id) {
                            icon = "mdi-numeric-2-circle";
                        }   
                    }
                    
                }
            }
            return icon;
        },
    }
}
</script>