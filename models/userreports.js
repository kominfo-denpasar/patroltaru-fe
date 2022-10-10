const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //user-reports

    getAllUserReports() {
        return $axios.$get(process.env.baseURL + "/user-reports")
    },

    getUserReportById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/user-reports/" + id, {
            params: cleaned
        });
    },

    getUserReport(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/user-reports/", {
            params: cleaned
        });
    },

    createUserReport(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/user-reports", cleaned);
    },

    editUserReport(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/user-reports/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('userreports', model($axios));
}