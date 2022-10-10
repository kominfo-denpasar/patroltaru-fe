<template>
    <v-container fluid fill-height :style="isAdmin ? 'width: 100%' : 'width: 80%; background-color: #ffffff; height: 100%;'">
        <v-layout align-center justify-center >
            <v-col>
                <v-card style="padding: 8px; width: 100%; margin-top: 16px; background-color: #e2e2e2;" elevation="0" v-show="isAdmin">
                    <v-card-text style="margin-top: 4px; margin-left: 8px;">
                        <v-row >
                            <span class="body-text" >Dashboard </span>
                            <v-icon>mdi-chevron-right</v-icon>
                            <span class="body-text"><b>Data Laporan</b></span>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-alert
                    icon="mdi-shield-lock-outline"
                    v-show="showInfo && isAdmin"
                    prominent
                    text
                    type="info"
                    style="margin-top: 24px; "
                    >
                    <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>update profile</b> untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                </v-alert>

                <v-row no-gutters align="end" justify="end" style="margin-top: 24px; margin-bottom: 24px;" v-show="isAdmin">
                    <v-spacer></v-spacer>
                    <v-btn depressed tile :outlined="index == 1" @click="index = 0" large :style="index == 0 ? 'background-color: #cccccc;' : 'background-color: white;'" :class="index == 0 ? 'btn-outline-disable' : 'btn-outline-disable'">Laporan Masyarakat</v-btn>
                    <v-btn depressed tile :outlined="index == 0" @click="index = 1" large :style="index == 1 ? 'background-color: #cccccc;' : 'background-color: white;'" :class="index == 1 ? 'btn-outline-disable' : 'btn-outline-disable'">Laporan Reguler</v-btn>
                </v-row>
                <v-row no-gutters align="center" justify="end" style="margin-top: 24px;" v-show="!isAdmin">
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
                    v-show="showInfo && !isAdmin"
                    prominent
                    text
                    type="info"
                    style="margin-top: 48px; "
                    >
                    <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>update profile</b> untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                </v-alert>

                <v-alert
                    icon="mdi-check-circle"
                    v-show="!showInfo && !isAdmin"
                    prominent
                    text
                    type="success"
                    style="margin-top: 48px; "
                    >
                    <span class="green-body-text" style="margin-left: 16px;">Profile anda berhasil diterima oleh DPUPRPKP Kota. Silahkan membuat laporan pengaduan. Terima Kasih! </span>
                </v-alert>

                <v-row v-show="isAdmin">
                    <v-col cols="3" v-for="(item, index) in menuList" :key="index">
                        <v-card class="rounded-xl" style="padding-bottom: 16px;" rounded="20">
                            <v-card-title class="justify-center" style="padding-top: 48px; padding-bottom: 48px;">
                                <span class="header-text primary--text"><b>{{ item.amount }}</b></span>
                            </v-card-title>
                            <v-card-text style="margin-top: 16px;">
                                <v-row class="justify-center">
                                    <v-icon small>{{ item.icon }}</v-icon>
                                    <span class="side-menu-text" style="margin-left: 8px; ">{{ item.title }}</span>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

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
                    <v-col cols="3" v-if="index == 1">
                        <v-btn depressed block color="green" class="white--text" to="/dashboard/report/create-reguler-report/">
                            <v-icon left color="white">
                                mdi-plus
                            </v-icon>
                            Laporan Reguler Baru
                        </v-btn>
                    </v-col>
                    <v-col cols="3" v-else-if="!isAdmin" align="center" justify="center" >
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
                            <span class="side-menu-text">{{reports.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</span>
                        </td>   
                    </template>
                    <template v-slot:[`item.createdAt`]="{ item }">
                        <td>
                            <span class="side-menu-text">{{ item.createdAt.substr(0, 10) }}</span>
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
            <!-- <div id="app">
                <vue-html2pdf
                :show-layout="controlValue.showLayout"
                :float-layout="controlValue.floatLayout"
                :enable-download="controlValue.enableDownload"
                :preview-modal="controlValue.previewModal"
                :filename="controlValue.filename"
                :paginate-elements-by-height="controlValue.paginateElementsByHeight"
                :pdf-quality="controlValue.pdfQuality"
                :pdf-format="controlValue.pdfFormat"
                :pdf-orientation="controlValue.pdfOrientation"
                :pdf-content-width="controlValue.pdfContentWidth"
                :manual-pagination="controlValue.manualPagination"
                :html-to-pdf-options="htmlToPdfOptions"
                @progress="onProgress($event)"
                @startPagination="startPagination()"
                @hasPaginated="hasPaginated()"
                @beforeDownload="beforeDownload($event)"
                @hasDownloaded="hasDownloaded($event)"
                ref="html2Pdf"
                >
                    <section slot="pdf-content">
                        <section class="pdf-item">
                        </section>
                    </section>
                </vue-html2pdf>
            </div> -->
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
            <DetailReportDialog :dialog.sync="detailDialog" :report="report" :reqImage="reqImage" :reqKTP="reqKTP" :district="district" :subDistrictId="subDistrictId" :reportDate="reportDate"/>
            <VerifyReportDialog :dialog.sync="verifyDialog" :report="report" :reportDate="reportDate" :isUpdate="isUpdate"/>
            <HistoryUserReportDialog :dialog.sync="historyDialog" :userReports="report.userReport" :reportDate="reportDate"/>
            <InfoDialog :dialog.sync="infoDialog" :message="infoMsg" />
        </v-layout>
    </v-container>
</template>
<script>
import LogoutDialog from '~/components/LogoutDialog.vue'
import DetailReportDialog from '~/components/DetailReportDialog.vue';
import VerifyReportDialog from '~/components/VerifyReportDialog.vue';
import HistoryUserReportDialog from '~/components/HistoryUserReportDialog.vue';
import InfoDialog from '~/components/InfoDialog.vue';
// import VueHtml2pdf from 'vue-html2pdf';
export default {
    auth: false,
    components: {
        LogoutDialog,
        DetailReportDialog,
        VerifyReportDialog,
        HistoryUserReportDialog,
        InfoDialog,
        // VueHtml2pdf,
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
                { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                { title: "Verifikasi Laporan", icon: "mdi-clipboard-check-outline" }
            ],
            search: "",
            headers: [
                {text: 'No', value: 'number', align: 'left'},
                {text: 'Tanggal Laporan', value: 'createdAt', align: 'left'},
                {text: 'Topik', value: 'topic', align: 'left'},
                {text: 'Alamat', value: 'address', align: 'left'},
                {text: 'Status', value: 'status', align: 'left'},
                {text: 'Aksi', value: 'action', align: 'left'},
            ],
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            showInfo: true,
            logoutDialog: false,
            detailDialog: false,
            verifyDialog: false,
            historyDialog: false,
            infoDialog: false,
            isUpdate: false,
            infoMsg: "Kamu sudah melakukan verifikasi pada laporan ini",
            isAdmin: true,
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
            reqKTP: "",
            loading: false,
            reportDate: new Date(),
            subDistrictId: {},
            district: {},
            roles: [],
            idReporter: '',
        }
    },

    watch: {
        index: {
            handler () {
                this.getReports();
            },
        }
    },

    mounted() {
        this.getProfileByUserId();
        // console.log(this.userMe);
    },

    computed: {
        // ...mapFields(["controlValue"]),
        // htmlToPdfOptions() {
        //     return {
        //         margin: 0,
        //         filename: "hasil_pemeriksaan.pdf",
        //         image: {
        //             type: "jpeg",
        //             quality: 0.98,
        //         },
        //         enableLinks: true,
        //         html2canvas: {
        //             scale: this.controlValue.pdfQuality,
        //             useCORS: true,
        //         },
        //         jsPDF: {
        //             unit: "in",
        //             format: this.controlValue.pdfFormat,
        //             orientation: this.controlValue.pdfOrientation,
        //         },
        //     };
        // },
    },

    methods: {
        
        async getProfileByUserId() {
            this.loading = true;
            try {
                if (this.userMe) {
                    if (this.userMe.roleId.name === "reporter") {
                        this.isAdmin = false;
                        window.location = "/reporter/report"
                    }
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

        async getRoles() {
            try {
                
                const reqRoles = await this.$roles.getRole({
                    $skip: 0,
                    $limit: 50,
                });

                this.idReporter = reqRoles.data.filter(data => data.name === "reporter")[0]._id;

                this.roles = reqRoles.data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },

        async getReports() {
            this.loading = true;
            try {
                const reqReports = await this.$reports.getReport({
                    $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    $limit: this.pagination.rowsPerPage,
                    "$populate[0]": "activityId",
                    "$populate[1]": "author"
                });
                for (const key in reqReports.data) {
                    if (Object.hasOwnProperty.call(reqReports.data, key)) {
                        const data = reqReports.data[key];
                        
                        
                        const reqRole = await this.$roles.getRoleById(data.author.roleId , {})
                        const reqUserReport = await this.$userreports.getUserReport({
                            "reportId": data._id,
                            "paginate": false,
                            "$populate[0]": "createdBy",
                            "$populate[1]": "summons1Id",
                            "$populate[2]": "summons2Id",
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
                        data.author.roleId = reqRole;
                        data["userReport"] = reqUserReport;

                        this.menuItems = [
                            { title: 'Detail', icon: 'mdi-database-eye' },
                            { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                            { title: "Verifikasi Laporan", icon: "mdi-clipboard-check-outline" }
                        ];
                        if (this.userMe.roleId.name === "inspector") {
                            this.menuItems = [
                                { title: 'Detail', icon: 'mdi-database-eye' },
                                { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                { title: "Periksa", icon: "mdi-text-box-search-outline" }
                            ];

                            
                        }
                        
                        if (this.userMe.roleId.name != "reporter") {
                            if (reqUserReport.length > 0) {
                                let filter = reqUserReport.filter(data => data.roleDetail.name === "inspector"); 
                                let filterRejected = reqUserReport.filter(data => data.action === "rejected"); 
                                let filterSummonsFile = reqUserReport.filter(data => data.summons1Id != null || data.summons2Id != null ); 

                                if(filterSummonsFile.length > 0) {
                                    this.menuItems = [
                                        { title: 'Detail', icon: 'mdi-database-eye' },
                                        { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                    ];

                                    if (this.userMe.roleId.name != "inspector") {
                                        this.menuItems = [
                                            { title: 'Detail', icon: 'mdi-database-eye' },
                                            { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                            { title: "Verifikasi Laporan", icon: "mdi-clipboard-check-outline" }
                                        ];
                                    }
                                }

                                if(filter.length > 0) {
                                    this.menuItems = [
                                        { title: 'Detail', icon: 'mdi-database-eye' },
                                        { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                        { title: "Hasil Pemeriksaan", icon: "mdi-table-headers-eye" }
                                    ];
                                    if (this.userMe.roleId.name != "inspector") {
                                        this.menuItems = [
                                            { title: 'Detail', icon: 'mdi-database-eye' },
                                            { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                            { title: "Hasil Pemeriksaan", icon: "mdi-table-headers-eye" },
                                            { title: "Verifikasi Laporan", icon: "mdi-clipboard-check-outline" }
                                        ];
                                    }
                                }

                                if (filterRejected.length > 0) {
                                    this.menuItems = [
                                        { title: 'Detail', icon: 'mdi-database-eye' },
                                        { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                    ];
                                    if (this.userMe.roleId.name != "inspector") {
                                        this.menuItems = [
                                            { title: 'Detail', icon: 'mdi-database-eye' },
                                            { title: 'History', icon: 'mdi-clipboard-text-clock-outline' },
                                            { title: "Verifikasi Laporan", icon: "mdi-clipboard-check-outline" }
                                        ];
                                    }
                                }
                            }
                        }

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

                // console.log(reqReports.data);
                this.pagination.totalItems = reqReports.total;
                
                if (this.index == 0) {
                    this.reports = reqReports.data.filter(data => data.author.roleId._id === this.idReporter);
                } else {
                    this.reports = reqReports.data.filter(data => data.author.roleId._id != this.idReporter);
                }

                this.countMenuList();
                
                
                this.loading = false;
            } catch (error) {
                console.log(error);
                
                this.loading = false;
                this.isError = true;
                this.isSuccess = false;
            }
        },

        async countMenuList() {
            const reqReports = await this.$reports.getReport({
                paginate: false,
                "$populate[0]": "activityId",
                "$populate[1]": "author"
            });
            let reports = []
            if (this.index == 0) {
                reports = reqReports.filter(data => data.author.roleId === this.idReporter);
            } else {
                reports = reqReports.filter(data => data.author.roleId != this.idReporter);
            }
            this.menuList[0].amount = reports.length;
        },

        createNewReport() {
            if (this.profile == null ){
                this.dialogInputProfile = true;
            } else {
                window.location = "/dashboard/report/create-reguler-report"
            }
        },

        async clickItem(item, index) {
            this.report = item;
            this.reportDate = new Date(item.createdAt);
            let filter = item.userReport.filter(data => data.roleDetail.name === "inspector"); 
            let filterRejected = item.userReport.filter(data => data.action === "rejected"); 
            let filterSummonsFile = item.userReport.filter(data => data.summons1Id != null || data.summons2Id != null ); 
            console.log(item);
            if (index === 0) {
                this.editItem(item);
            } else if (index === 1) {
                this.historyDialog = true;
            } else if (index === 2) {
                if (filter.length > 0) {

                } else {
                    if (item.author.roleId.name === "reporter") {
                        switch(this.userMe.roleId.name) {
                            case "administrator":
                                this.adminCondition(item);
                            break;
                            case "executive":
                                this.executiveCondition(item);
                            break;
                            case "head":
                                this.headCondition(item);
                            break;
                            case "task-master":
                                this.taskMasterCondition(item);
                            break;
                            case "inspector":
                                localStorage.setItem("checkReportItem", JSON.stringify(item));
                                window.location = "/dashboard/report/check-report";
                                // this.inspectorCondition(item);
                            break;
                        }
                    } else {
                        switch(this.userMe.roleId.name) {
                            case "administrator":
                                this.infoMsg = "Anda tidak bisa melakukan verifikasi pada laporan ini!";
                                this.infoDialog = true;
                            break;
                            case "executive":
                                this.executiveRegulerCondition(item);
                            break;
                            case "head":
                                this.headRegulerCondition(item);
                            break;
                            case "task-master":
                                this.taskMasterRegulerCondition(item);
                            break;
                            case "inspector":
                                this.infoMsg = "Anda tidak bisa melakukan verifikasi pada laporan ini!";
                                this.infoDialog = true;
                            break;
                        }
                    }
                }
                
                
            } else if (index === 3) {
                if (filter.length > 0) {
                    if (item.author.roleId.name === "reporter") {
                        switch(this.userMe.roleId.name) {
                            case "administrator":
                                this.adminCondition(item);
                            break;
                            case "executive":
                                this.executiveCondition(item);
                            break;
                            case "head":
                                this.headCondition(item);
                            break;
                            case "task-master":
                                this.taskMasterCondition(item);
                            break;
                            case "inspector":
                                localStorage.setItem("checkReportItem", JSON.stringify(item));
                                window.location = "/dashboard/report/check-report";
                                // this.inspectorCondition(item);
                            break;
                        }
                    } else {
                        switch(this.userMe.roleId.name) {
                            case "administrator":
                                this.infoMsg = "Anda tidak bisa melakukan verifikasi pada laporan ini!";
                                this.infoDialog = true;
                            break;
                            case "executive":
                                this.executiveRegulerCondition(item);
                            break;
                            case "head":
                                this.headRegulerCondition(item);
                            break;
                            case "task-master":
                                this.taskMasterRegulerCondition(item);
                            break;
                            case "inspector":
                                this.infoMsg = "Anda tidak bisa melakukan verifikasi pada laporan ini!";
                                this.infoDialog = true;
                            break;
                        }
                    }
                } else {
                    const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons1Id._id);
                    let reader = new FileReader();
                    reader.readAsDataURL(reqFile); 

                    reader.onload = () => {
                        this.downloadPDF(reader.result, item.userReport[item.userReport.length - 1].summons1Id)
                    }
                }
                
            } else if (index === 4) {
                if (filter.length > 0) {
                    const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons1Id._id);
                    let reader = new FileReader();
                    reader.readAsDataURL(reqFile); 

                    reader.onload = () => {
                        this.downloadPDF(reader.result, item.userReport[item.userReport.length - 1].summons1Id)
                    }
                } else {
                    const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons2Id._id);
                    let reader = new FileReader();
                    reader.readAsDataURL(reqFile); 

                    reader.onload = () => {
                        this.downloadPDF(reader.result, item.userReport[item.userReport.length - 1].summons2Id)
                    }
                }
                
            } else if (index === 5) {
                const reqFile = await this.$files.getFile(item.userReport[item.userReport.length - 1].summons2Id._id);
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
            const fileName = name.originalName;
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        },

        adminCondition(item) {
            console.log("userReport", item.userReport.length);
            if (item.userReport.length === 0) {
                this.verifyDialog = true;

                return;
            }
            if (item.userReport[0].roleDetail.name === "administrator") {
                this.infoDialog = true;
            }
        },

        async executiveCondition(item) {
            let role = "executive";
            this.isUpdate = false;
            
            if (item.userReport.length === 0) {
                this.infoMsg = "Admin belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport[item.userReport.length - 1].roleDetail.name === "head") {
                    this.verifyDialog = true;
                    return;
                }

                if (item.userReport.length > 7) {
                    if (item.userReport[7].roleDetail.name === role) {
                        this.verifyDialog = true;
                        this.isUpdate = true;
                    }
                    return;
                }
                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    console.log(index);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 1) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },

        executiveRegulerCondition(item) {
            let role = "executive";
            if (item.userReport.length === 0) {
                this.infoMsg = "Kasie belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 1) {
                this.infoMsg = "Kabid belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport[item.userReport.length - 1].roleDetail.name === "head") {
                    this.verifyDialog = true;
                    return;
                }

                if (item.userReport.length > 2) {
                    if (item.userReport[2].roleDetail.name === role) {
                        this.verifyDialog = true;
                        this.isUpdate = true;
                    }
                    return;
                }

                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    console.log(index);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 1) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },

        headCondition(item) {
            let role = "head";
            if (item.userReport.length === 0) {
                this.infoMsg = "Admin belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 1) {
                this.infoMsg = "Kadis belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport[item.userReport.length - 1].roleDetail.name === "task-master") {
                    this.verifyDialog = true;
                    return;
                }
                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 2) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },

        headRegulerCondition(item) {
            let role = "head";
            if (item.userReport.length === 0) {
                this.infoMsg = "Kasie belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport[item.userReport.length - 1].roleDetail.name === "task-master") {
                    this.verifyDialog = true;
                    return;
                }
                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    console.log(index);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 1) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },

        taskMasterCondition(item) {
            let role = "task-master";
            if (item.userReport.length === 0) {
                this.infoMsg = "Admin belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 1) {
                this.infoMsg = "Kadis belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 2) {
                this.infoMsg = "Kabid belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport[item.userReport.length - 1].roleDetail.name === "inspector") {
                    this.verifyDialog = true;
                    return;
                }
                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 3) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },

        taskMasterRegulerCondition(item) {
            let role = "task-master";
            if (item.userReport.length === 0) {
                this.verifyDialog = true;

                return;
            }
            if (item.userReport[0].roleDetail.name === role) {
                this.infoDialog = true;
            }
        },

        inspectorCondition(item) {
            let role = "inspector";
            if (item.userReport.length === 0) {
                this.infoMsg = "Admin belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 1) {
                this.infoMsg = "Kadis belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 2) {
                this.infoMsg = "Kabid belum melakukan verifikasi!";
                this.infoDialog = true;
            } else if (item.userReport.length === 3) {
                this.infoMsg = "Kasie belum melakukan verifikasi!";
                this.infoDialog = true;
            } else {
                if (item.userReport.filter(data => data.roleDetail.name === role)) {
                    let index = item.userReport.findIndex(data => data.roleDetail.name === role);
                    if (index === -1) {
                        this.verifyDialog = true;
                    } else if (index === 4) {
                        this.infoMsg = "Kamu sudah melakukan verifikasi pada laporan ini";
                        this.infoDialog = true;
                    }
                } else {
                    this.verifyDialog = true;
                }
            }
        },  

        async editItem(item) {
            this.report = item;
            const reqSubDistrict = await this.$subdistricts.getSubDistrictById(item.subDistrictId, {});
            const reqDistrict = await this.$districts.getDistrictById(reqSubDistrict.districtId, {});
            const profile = await this.$profiles.getProfile({
                userId: item.author._id,
            });
            this.subDistrictId = reqSubDistrict;
            this.district = reqDistrict;
            this.report["profile"] = profile.data[0];

            // console.log("report", this.report);
            
            if (profile.data.length > 0 && profile.data[0].KTPId) {
                const reqKtp = await this.$files.getFile(profile.data[0].KTPId)
                let readerKtp = new FileReader();
                readerKtp.readAsDataURL(reqKtp); 
                readerKtp.onload = () => {
                    this.reqKTP = readerKtp.result;
                }
            }
            
            const reqImg = await this.$files.getFile(item.imageId);
            
            let readerImg = new FileReader();
            readerImg.readAsDataURL(reqImg); 
            readerImg.onload = () => {
                this.reqImage = readerImg.result;
                this.detailDialog = true;
            }
            
        },

        clearSearch () {
            this.search = ''
        },

        textStatus(item) {
            let status = "";
            if (item.author.roleId.name === "reporter") {
                status = "Menunggu verifikasi admin";
            } else {
                status = "Menunggu verifikasi Kasie";   
            }
            
            if (item.userReport.length > 0) {
                let userReport = item.userReport[item.userReport.length - 1];
                if (userReport.action === "rejected") {
                    status = "Laporan ditolak oleh " + userReport.roleDetail.description;
                } else {
                    status = "Laporan telah diverifikasi oleh "+ userReport.roleDetail.description +" yang diinput oleh "+ userReport.roleDetail.name;
                    if (item.author.roleId.name === "reporter") {
                        if (item.userReport.length > 7) {
                            status = "Laporan selesai diperiksa";
                            if (item.userReport[item.userReport.length - 1].summons1Id) {
                                status = "Pemanggilan Pertama";
                            } 

                            if (item.userReport[item.userReport.length - 1].summons2Id) {
                                status = "Pemanggilan Kedua";
                            }
                        }
                    } else {
                        if (item.userReport.length > 2) {
                            status = "Laporan selesai diperiksa";
                            if (item.userReport[item.userReport.length - 1].summons1Id) {
                                status = "Pemanggilan Pertama";
                            } 

                            if (item.userReport[item.userReport.length - 1].summons2Id) {
                                status = "Pemanggilan Kedua";
                            }
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
                    if (item.author.roleId.name === "reporter") {
                        if (item.userReport.length > 7) {
                            color = "green";

                            if (item.userReport[item.userReport.length - 1].summons1Id) {
                                color = "red";
                            } 

                            if (item.userReport[item.userReport.length - 1].summons2Id) {
                                color = "red";
                            }
                        }
                    } else {
                        if (item.userReport.length > 2) {
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
                    if (item.author.roleId.name === "reporter") {
                        if (item.userReport.length > 7) {
                            icon = "mdi-check-circle";

                            if (item.userReport[item.userReport.length - 1].summons1Id) {
                                icon = "mdi-numeric-1-circle";
                            } 

                            if (item.userReport[item.userReport.length - 1].summons2Id) {
                                icon = "mdi-numeric-2-circle";
                            }
                        }
                    } else {
                        if (item.userReport.length > 2) {
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
            }
            return icon;
        },

        // onProgress(progress) {
        //     this.loading = true;
        //     console.log(`PDF generation progress: ${progress}%`)
        //     if (progress === 100) {
        //         this.loading = false;
        //     }
        // },

        // validateControlValue() {
        //     if (this.controlValue.pdfQuality > 2) {
        //         alert("pdf-quality value should only be 0 - 2");
        //         this.controlValue.pdfQuality = 2;
        //         return false;
        //     }
        //     if (!this.controlValue.paginateElementsByHeight) {
        //         alert("paginate-elements-by-height value cannot be empty");
        //         this.controlValue.paginateElementsByHeight = 1400;
        //         return false;
        //     }
        //     const paperSizes = [
        //         "a0",
        //         "a1",
        //         "a2",
        //         "a3",
        //         "a4",
        //         "letter",
        //         "legal",
        //         "a5",
        //         "a6",
        //         "a7",
        //         "a8",
        //         "a9",
        //         "a10",
        //     ];
        //     if (!paperSizes.includes(this.controlValue.pdfFormat)) {
        //         alert(`pdf-format value should only be ${paperSizes}`);
        //         this.controlValue.pdfFormat = "a4";
        //         return false;
        //     }
        //     if (!this.controlValue.pdfOrientation) {
        //         alert("pdf-orientation value cannot be empty");
        //         this.controlValue.pdfOrientation = "portrait";
        //         return false;
        //     }
        //     if (!this.controlValue.pdfContentWidth) {
        //         alert("pdf-content-width value cannot be empty");
        //         this.controlValue.pdfContentWidth = "800px";
        //         return false;
        //     }
        //     return true;
        // },

        // startPagination() {
        //     console.log(`PDF has started pagination`)
        // },
        // hasPaginated () {
        //     console.log(`PDF has been paginated`)
        // },

        // async downloadPdf() {
        //     if (!(await this.validateControlValue())) return;
            
        //     this.$refs.html2Pdf.generatePdf();
        // },

        async beforeDownload ({ html2pdf, options, pdfContent }) {
            console.log(`On Before PDF Generation`)
        
        },
        hasDownloaded (blobPdf) {
            console.log(`PDF has downloaded`)
            this.loading = false;
            // this.pdfDownloaded = true
            console.log(blobPdf)
        },
    }
}
</script>