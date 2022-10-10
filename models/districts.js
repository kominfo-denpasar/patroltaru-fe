const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //districts

    getAllDistricts() {
        return $axios.$get(process.env.baseURL + "/districts")
    },

    getDistrictById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/districts/" + id, {
            params: cleaned
        });
    },

    getDistrict(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/districts/", {
            params: cleaned
        });
    },

    createDistrict(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/districts", cleaned);
    },

    editDistrict(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/districts/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('districts', model($axios));
}