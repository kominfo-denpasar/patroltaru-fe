const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //sub-districts

    getAllSubDistricts() {
        return $axios.$get(process.env.baseURL + "/sub-districts")
    },

    getSubDistrictById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/sub-districts/" + id, {
            params: cleaned
        });
    },

    getSubDistrict(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/sub-districts/", {
            params: cleaned
        });
    },

    createSubDistrict(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/sub-districts", cleaned);
    },

    editSubDistrict(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/sub-districts/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('subdistricts', model($axios));
}