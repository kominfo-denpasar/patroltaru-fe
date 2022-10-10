import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({


    titleKey: 'titleKey',
    primaryKey: 'primaryColorKey',
    secondaryKey: 'secondaryColorKey',
    role: [
        {'name': 'superadmin', 'value': 'administrator', "_id": ""},
        {'name': 'kasubbag', 'value': 'executive', "_id": ""},
        {'name': 'kadis', 'value': 'head', "_id": ""},
        {'name': 'kabid', 'value': 'head', "_id": ""},
        {'name': 'kasie', 'value': 'head', "_id": ""},
        {'name': 'petugas', 'value': 'task-master', "_id": ""},
        {'name': 'pelapor', 'value': 'inspector', "_id": ""},
        {'name': 'satpol pp', 'value': 'task-master', "_id": ""}
    ],
    listMonth: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    controlValue: {
        showLayout: false,
        floatLayout: true,
        enableDownload: true,
        previewModal: true,
        paginateElementsByHeight: 1100,
        manualPagination: false,
        filename: 'hasil_pemeriksaan',
        pdfQuality: 2,
        pdfFormat: 'a4',
        pdfOrientation: 'portrait',
        pdfContentWidth: '800px'
    },
})

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedUser(state) {
        return state.auth.user
    },
}