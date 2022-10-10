const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //reports

    getAllReports() {
        return $axios.$get(process.env.baseURL + "/reports")
    },

    getReportById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/reports/" + id, {
            params: cleaned
        });
    },

    getReport(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/reports/", {
            params: cleaned
        });
    },

    createReport(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/reports", cleaned);
    },

    editReport(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/reports/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('reports', model($axios));
}