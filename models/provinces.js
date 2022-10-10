const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //provinces

    getAllProvinces() {
        return $axios.$get(process.env.baseURL + "/provinces")
    },

    getProvinceById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/provinces/" + id, {
            params: cleaned
        });
    },

    getProvince(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/provinces/", {
            params: cleaned
        });
    },

    createProvince(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/provinces", cleaned);
    },

    editProvince(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/provinces/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('provinces', model($axios));
}